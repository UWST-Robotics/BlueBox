import {atom, useAtom} from "jotai";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";

// Atoms
export const networkTableAtom = atom<NetworkTableRecord[]>([
    {key: "group1/group2/test", value: "Hello, World!"},
    {key: "group1/group3/number3", value: 45},
    {key: "group1/number1", value: 42},
    {key: "group1/number2", value: 43},
    {key: "bool", value: true},

    // Log
    {key: "_log/1", value: "Hello, World!"},
    {key: "_log/2", value: "Hello, World!"},
    {key: "_log/3", value: "Hello, World!"},
    {key: "_log/4", value: "Hello, World!"},

    // Hardware
    {key: "_hardware/Port 1/port", value: 1},
    {key: "_hardware/Port 1/name", value: "Flywheel Motor"},
    {key: "_hardware/Port 1/type", value: "SmartMotor"},
    {key: "_hardware/Port 1/velocity", value: 0.5},
    {key: "_hardware/Port 1/position", value: 2},
    {key: "_hardware/Port 1/voltage", value: 69},
    {key: "_hardware/Port 1/current", value: 69},
    {key: "_hardware/Port 1/temperature", value: 45.2},
    {key: "_hardware/Port 1/isOverTemp", value: true},
    {key: "_hardware/Port 1/isOverCurrent", value: true},
    {key: "_hardware/Port 1/isDriverFault", value: true},
    {key: "_hardware/Port 1/isDriverOverCurrent", value: true},
    {key: "_hardware/eee/test", value: true},
]);

// Hooks
export default function useNetworkTable() {
    return useAtom(networkTableAtom);
}