export default function lerp(t: number, a: number, b: number) {
    return a + (b - a) * t;
}