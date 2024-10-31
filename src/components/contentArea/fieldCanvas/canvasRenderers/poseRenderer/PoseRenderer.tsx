import {Group, Line, Rect, Text} from 'react-konva';
import React from "react";
import Konva from "konva";
import lerp from "../../../../../utils/lerp.ts";
import lerpDegrees from "../../../../../utils/lerpDegrees.ts";

export interface PoseRendererProps {
    x: number;
    y: number;
    angle?: number;
    length?: number;
    width?: number;
    strokeColor?: string;
    label?: string;
    opacity?: number;
    disableLerp?: boolean;
}

const STROKE_COLOR = "#315495";
const WIDTH = 4;
const HEIGHT = 4;
const STEP_SIZE = 0.2;

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
        if (props.disableLerp) {
            groupRef.current.x(x);
            groupRef.current.y(y);
            groupRef.current.rotation(actualAngle);
            return () => {
            };
        }

        const targetX = x;
        const targetY = y;
        const targetAngle = actualAngle % 360;

        const animation = new Konva.Animation(() => {
            const currentX = groupRef.current?.x() ?? 0;
            const currentY = groupRef.current?.y() ?? 0;
            const currentAngle = groupRef.current?.rotation() ?? 0;

            const newX = lerp(STEP_SIZE, currentX, targetX);
            const newY = lerp(STEP_SIZE, currentY, targetY);
            const newAngle = lerpDegrees(STEP_SIZE, currentAngle, targetAngle);

            groupRef.current?.x(newX);
            groupRef.current?.y(newY);
            groupRef.current?.rotation(newAngle);
        });

        animation.start();
        return () => animation.stop();
    }, [x, y, actualAngle, props.disableLerp]);

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
                opacity={props.opacity ?? 1}
            />

            {/* Angle */}
            {angle !== undefined && (
                <Line
                    points={[0, 0, actualLength * 0.8, 0]}
                    stroke={strokeColor ?? STROKE_COLOR}
                    strokeWidth={1}
                    opacity={props.opacity ?? 1}
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
                opacity={props.opacity ?? 1}
            />
        </Group>
    )
}

