import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import useValuesOverTime from "../../../hooks/valueOverTime/useValuesOverTime.ts";
import useSelectedPathStats from "../../../hooks/valueOverTime/useSelectedPathStats.ts";
import useCurrentTime from "../../../hooks/common/useCurrentTime.ts";
import useSelectedPath from "../../../hooks/selectedPath/useSelectedPath.ts";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import parseNetworkValueToNumber from "../../../utils/parseNetworkValueToNumber.ts";

const TIME_WINDOW = 10000;

export default function SelectedValueChart() {
    const selectedPath = useSelectedPath();
    const _currentValue = useNTValue(selectedPath || "");
    const currentValue = parseNetworkValueToNumber(_currentValue);
    const [valuesOverTime] = useValuesOverTime(selectedPath || "");
    const [min, max, average] = useSelectedPathStats();
    const currentTime = useCurrentTime(1000);


    // Time Functions
    const formatTime = (time: number) => {
        const diff = currentTime - time;
        const seconds = diff / 1000;
        return `-${seconds.toFixed(1)}s`
    }

    return (
        <ResponsiveContainer
            width={"100%"}
            height={400}
        >
            <LineChart
                data={valuesOverTime}
            >
                {/* Grid */}
                <CartesianGrid strokeDasharray="3 3" stroke={"#222"}/>
                <YAxis
                    dataKey="value"
                    allowDecimals={false}
                    tickCount={10}
                />
                <XAxis
                    dataKey={"time"}
                    type={"number"}
                    allowDataOverflow={true}
                    domain={[currentTime - TIME_WINDOW, currentTime]}
                    tickFormatter={formatTime}
                />

                {/* Values over Time */}
                <Line
                    type={"step"}
                    dataKey={"value"}
                    isAnimationActive={false}
                    stroke={"#59c"}
                    strokeWidth={3}
                    dot={false}
                />
                <Tooltip
                    labelFormatter={formatTime}
                    formatter={(value: number) => value.toFixed(2)}
                    contentStyle={{
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                    }}
                />

                {/* Stats */}
                <ReferenceLine
                    y={min}
                    stroke={"#f00"}
                    strokeDasharray={"3 3"}
                    label={{
                        value: `Min: ${min.toFixed(2)}`,
                        position: "insideTopRight"
                    }}
                />
                <ReferenceLine
                    y={max}
                    stroke={"#0f0"}
                    strokeDasharray={"3 3"}
                    label={{
                        value: `Max: ${max.toFixed(2)}`,
                        position: "insideBottomRight"
                    }}
                />
                <ReferenceLine
                    y={average}
                    stroke={"#ff0"}
                    strokeDasharray={"3 3"}
                    label={{
                        value: `Avg: ${average.toFixed(2)}`,
                        position: "insideBottomRight"
                    }}
                />
                <ReferenceLine
                    y={currentValue}
                    stroke={"#fff"}
                    strokeDasharray={"3 3"}
                    label={{
                        value: `Current: ${currentValue?.toFixed(2)}`,
                        position: "insideBottomRight"
                    }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}