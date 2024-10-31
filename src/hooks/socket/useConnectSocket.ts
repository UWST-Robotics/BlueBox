import {socketStatusAtom} from "./useSocketStatus.ts";
import primaryStore from "../primaryStore.ts";
import useSocket from "./useSocket.ts";
import React from "react";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";
import {logAtom} from "../log/useLog.ts";
import {serialPortsAtom} from "../serialPorts/useSerialPorts.ts";
import SerialPortInfo from "../../types/SerialPortInfo.ts";
import {networkTableValueAtomFamily} from "../networkTable/useNetworkTableValue.ts";
import {resetNetworkTableAtom} from "../networkTable/actions/useResetNetworkTable.ts";

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
                const valueAtom = networkTableValueAtomFamily(record.key);
                primaryStore.set(valueAtom, record.value);
            });
        });

        socket.on("updateRecord", (record: NetworkTableRecord) => {
            const valueAtom = networkTableValueAtomFamily(record.key);
            primaryStore.set(valueAtom, record.value);
        });

        socket.on("deleteRecord", (key: string) => {
            const valueAtom = networkTableValueAtomFamily(key);
            primaryStore.set(valueAtom, undefined);
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

        socket.on("resetTable", () => {
            console.log("Server requested table reset");
            primaryStore.set(resetNetworkTableAtom);
        });

        socket.on("serialPorts", (ports: SerialPortInfo[]) => {
            console.log("Received serial ports from server");
            primaryStore.set(serialPortsAtom, ports);
        });

        socket.connect();

        return () => {
            socket.removeAllListeners();
            socket.disconnect();
        }
    }, [socket]);
}