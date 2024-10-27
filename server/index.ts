import SocketCommunication from "./io/SocketCommunication";
import NetworkTable from "./NetworkTable";
import SerialCommunication from "./io/SerialCommunication";

NetworkTable.addOrUpdate({key: "_hardware/Port 1/name", value: "Test Motor"});
NetworkTable.addOrUpdate({key: "_hardware/Port 1/temperature", value: 0});
NetworkTable.addOrUpdate({key: "_hardware/Port 1/position", value: 0});
NetworkTable.addOrUpdate({key: "_hardware/Port 1/velocity", value: 7200});

SocketCommunication.listen();
SerialCommunication.connect();

// setInterval(() => {
//     const record = {
//         key: "_hardware/Port 1/temperature",
//         value: Math.round(Math.random() * 100)
//     }
//     NetworkTable.addOrUpdate(record);
//     SocketCommunication.emitUpdateRecord(record);
//     SocketCommunication.emitLog("Temperature updated");
// }, 500);