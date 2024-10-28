import {socketStatusAtom} from "./useSocketStatus.ts";
import primaryStore from "../primaryStore.ts";
import useSocket from "./useSocket.ts";
import React from "react";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";
import {networkTableAtom} from "../networkTable/useNetworkTable.ts";
import {logAtom} from "../log/useLog.ts";
import {serialPortsAtom} from "../serialPorts/useSerialPorts.ts";
import SerialPortInfo from "../../types/SerialPortInfo.ts";

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
            primaryStore.set(networkTableAtom, records);
        });

        socket.on("updateRecord", (record: NetworkTableRecord) => {
            primaryStore.set(networkTableAtom, (prev) => {
                const index = prev.findIndex((r) => r.key === record.key);
                if (index !== -1) {
                    prev[index] = record;
                } else {
                    prev.push(record);
                }
                return [...prev];
            });
        });

        socket.on("deleteRecord", (key: string) => {
            primaryStore.set(networkTableAtom, (prev) => {
                return prev.filter((r) => r.key !== key);
            });
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
            primaryStore.set(networkTableAtom, []);
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