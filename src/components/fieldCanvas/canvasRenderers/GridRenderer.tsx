import {Group, Line} from "react-konva";


export interface GridRendererProps {
    canvasSize: number;
    gridSize: number;
    strokeWidth?: number;
    strokeColor?: string;
}

const STROKE_WIDTH = 2;
const STROKE_COLOR = "#555";

export default function GridRenderer(props: GridRendererProps) {
    const {
        canvasSize,
        gridSize,
        strokeWidth,
        strokeColor
    } = props;

    const gapSize = canvasSize / gridSize;

    return (
        <Group
            listening={false}
        >
            {/* Horizontal lines */}
            {[...Array(gridSize)].map((_, i) => (
                <Line
                    key={`h${i}`}
                    points={[0, i * gapSize, canvasSize, i * gapSize]}
                    stroke={strokeColor ?? STROKE_COLOR}
                    strokeWidth={strokeWidth ?? STROKE_WIDTH}
                />
            ))}
            {/* Vertical lines */}
            {[...Array(gridSize)].map((_, i) => (
                <Line
                    key={`v${i}`}
                    points={[i * gapSize, 0, i * gapSize, canvasSize]}
                    stroke={strokeColor ?? STROKE_COLOR}
                    strokeWidth={strokeWidth ?? STROKE_WIDTH}
                />
            ))}
        </Group>
    )
}