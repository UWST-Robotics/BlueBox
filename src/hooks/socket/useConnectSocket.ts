import {socketStatusAtom} from "./useSocketStatus.ts";
import primaryStore from "../primaryStore.ts";
import useSocket from "./useSocket.ts";
import React from "react";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";
import {logAtom} from "../log/useLog.ts";
import {updateNTValueAtomFamily} from "../networkTable/actions/useUpdateNTValue.ts";
import SerialPortInfo from "../../types/SerialPortInfo.ts";
import {serialPortsAtom} from "../serialPorts/useSerialPorts.ts";

export default function useSocketConnection() {
    const socket = useSocket();

    React.useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
            primaryStore.set(socketStatusAtom, "connected");

            // Request all records from the server
            socket.emit("getAllRecords");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
            primaryStore.set(socketStatusAtom, "disconnected");
        });

        socket.on("setAllRecords", (records: NetworkTableRecord[]) => {
            console.log("Received all records from server");
            records.forEach((record) => {
                primaryStore.set(updateNTValueAtomFamily(record.key), record.value);
            });
        });

        socket.on("updateRecord", (record: NetworkTableRecord) => {
            primaryStore.set(updateNTValueAtomFamily(record.key), record.value);
        });

        socket.on("log", (message: string) => {
            console.log(message);
            primaryStore.set(logAtom, (prev) => {
                return [...prev, {
                    timestamp: new Date(),
                    message: message
                }];
            });
        });

        socket.on("serialPorts", (ports: SerialPortInfo[]) => {
            console.log("Received serial ports from server");
            // TODO: Fix Serial Port Selection
            primaryStore.set(serialPortsAtom, ports);
        });

        socket.connect();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }, [socket]);
}