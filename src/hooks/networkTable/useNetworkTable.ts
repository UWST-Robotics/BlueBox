import {atom, useAtom} from "jotai";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";

// Atoms
export const networkTableAtom = atom<NetworkTableRecord[]>([
    {key: "group1/group2/test", value: "Hello, World!"},
    {key: "group1/group3/number3", value: 45},
    {key: "group1/number1", value: 42},
    {key: "group1/number2", value: 43},
    {key: "bool", value: true},

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

    // Pose
    {key: "_poses/SillyRobot/x", value: 53},
    {key: "_poses/SillyRobot/y", value: -35},
    {key: "_poses/SillyRobot/angle", value: -60},
    {key: "_poses/SillyRobot/length", value: 18},
    {key: "_poses/SillyRobot/width", value: 18},
    {key: "_poses/SillyRobot/color", value: "#aa2222"},

    // Field
    {key: "_lines/ladder/color", value: "#a0a109"},
    {key: "_lines/ladder/1/x", value: 24},
    {key: "_lines/ladder/1/y", value: 0},
    {key: "_lines/ladder/2/x", value: 0},
    {key: "_lines/ladder/2/y", value: -24},
    {key: "_lines/ladder/3/x", value: -24},
    {key: "_lines/ladder/3/y", value: 0},
    {key: "_lines/ladder/4/x", value: 0},
    {key: "_lines/ladder/4/y", value: 24},
    {key: "_lines/ladder/5/x", value: 24},
    {key: "_lines/ladder/5/y", value: 0},


    // Robot
    // {key: "_robot/batteryVoltage", value: 12.5},
    // {key: "_robot/batteryCurrent", value: 0},
    // {key: "_robot/batteryTemperature", value: 69},

]);

// Hooks
export default function useNetworkTable() {
    return useAtom(networkTableAtom);
}