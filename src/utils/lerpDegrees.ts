function strictMod(a: number, b: number) {
    return ((a % b) + b) % b;
}

export default function lerpDegrees(t: number, a: number, b: number) {
    const diff = b - a;
    const shortestAngle = strictMod(diff + 180, 360) - 180;
    return a + shortestAngle * t;
}