export default class Heartbeat {
    maxInterval: number;
    lastHeartbeat: number;
    timeoutHandle: NodeJS.Timeout | null = null;
    onDeath?: () => void;

    constructor(maxInterval: number, onDeath?: () => void) {
        this.maxInterval = maxInterval;
        this.lastHeartbeat = -1;
        this.onDeath = onDeath;
    }

    beat() {
        this.lastHeartbeat = Date.now();

        if (this.timeoutHandle !== null) {
            clearTimeout(this.timeoutHandle);
        }

        this.timeoutHandle = setTimeout(() => {
            if (this.isDead() && this.onDeath)
                this.onDeath();
        }, this.maxInterval);
    }

    isDead() {
        return Date.now() - this.lastHeartbeat > this.maxInterval;
    }
}