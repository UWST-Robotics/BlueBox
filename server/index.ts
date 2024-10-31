import SocketCommunication from "./io/SocketCommunication";
import NetworkTable from "./NetworkTable";


SocketCommunication.listen();

const INTERVAL = 50;

function makeRobot(name: string) {
    SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
        key: `_poses/${name}/name`,
        value: name
    }));
    SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
        key: `_poses/${name}/width`,
        value: 18
    }));
    SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
        key: `_poses/${name}/length`,
        value: 18
    }));

    let t = Math.random() * 100000;
    setInterval(() => {
        t += INTERVAL * 0.001;
        const cos = Math.cos(t);
        const sin = Math.sin(t);

        SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
            key: `_poses/${name}/x`,
            value: 50 * cos
        }));

        SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
            key: `_poses/${name}/y`,
            value: 50 * sin
        }));

        SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
            key: `_poses/${name}/rotation`,
            value: Math.atan2(sin, cos) * 180 / Math.PI + 90
        }));

    }, INTERVAL);
}

for (let i = 0; i < 10; i++)
    makeRobot("robot" + i);

// let t = 0;
// setInterval(() => {
//     t += 1;
//
//     SocketCommunication.emitUpdateRecord(NetworkTable.addOrUpdate({
//         key: "_hardware/vex1/temperature",
//         value: Math.sin(t * 0.1) * Math.pow(t, 1.1) + 20
//     }));
// }, 50);