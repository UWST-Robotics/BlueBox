import {Group, Line, Rect, Text} from 'react-konva';
import React from "react";
import Konva from "konva";

export interface PoseRendererProps {
    x: number;
    y: number;
    angle?: number;
    length?: number;
    width?: number;
    strokeColor?: string;
    label?: string;
}

const STROKE_COLOR = "#315495";
const WIDTH = 4;
const HEIGHT = 4;

export default function PoseRenderer(props: PoseRendererProps) {
    const {
        x,
        y,
        angle,
        length,
        width,
        strokeColor,
        label
    } = props;

    const groupRef = React.useRef<Konva.Group>(null);
    const actualLength = length ?? WIDTH;
    const actualWidth = width ?? HEIGHT;
    const actualAngle = angle ?? 0;

    // Interpolate the position and angle
    React.useEffect(() => {
        if (!groupRef.current)
            return () => {
            };

        const targetX = x;
        const targetY = y;
        const targetAngle = actualAngle;

        const animation = new Konva.Animation(() => {
            const currentX = groupRef.current?.x() ?? 0;
            const currentY = groupRef.current?.y() ?? 0;
            const currentAngle = groupRef.current?.rotation() ?? 0;

            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const dAngle = (targetAngle - currentAngle + 180) % 360 - 180;

            const STEP_SIZE = 0.1;
            const newX = currentX + dx * STEP_SIZE;
            const newY = currentY + dy * STEP_SIZE;
            const newAngle = currentAngle + dAngle * STEP_SIZE;

            groupRef.current?.x(newX);
            groupRef.current?.y(newY);
            groupRef.current?.rotation(newAngle);
        });

        animation.start();
        return () => animation.stop();
    }, [x, y, actualAngle]);

    return (
        <Group
            ref={groupRef}
        >
            {/* Body */}
            <Rect
                x={-actualLength / 2}
                y={-actualWidth / 2}
                width={actualLength}
                height={actualWidth}
                stroke={strokeColor ?? STROKE_COLOR}
                strokeWidth={1}
            />

            {/* Angle */}
            {angle !== undefined && (
                <Line
                    points={[0, 0, actualLength * 0.8, 0]}
                    stroke={strokeColor ?? STROKE_COLOR}
                    strokeWidth={1}
                />
            )}

            {/* Label */}
            <Text
                x={-actualLength}
                y={-actualWidth / 2 - 4}
                text={label}
                fontSize={3}
                width={actualLength * 2}
                align="center"
                fill="#aaa"
            />
        </Group>
    )
}

