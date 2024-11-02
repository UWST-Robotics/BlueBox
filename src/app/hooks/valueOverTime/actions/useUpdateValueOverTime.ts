import {atom} from "jotai";
import {valuesOverTimeAtom} from "../useValuesOverTime.ts";
import NTValue from "../../../types/nt/NTValue.ts";
import TimestampedValue from "../../../types/TimestampedValue.ts";

export interface UpdateValueOverTimeProps {
    path: string;
    value: NTValue;
}

export const MAX_TIME_WINDOW = 20000; // ms

// Atoms
export const updateValueOverTimeAtom = atom(null, (get, set, props: UpdateValueOverTimeProps) => {

    // Check the selected path
    // const selectedPath = get(selectedPathAtom);
    // if (selectedPath != props.path)
    //     return;

    // Cast to number
    const numericValue = Number(props.value);
    if (isNaN(numericValue))
        return;

    // Append the new value to the values over time
    const valueOverTimeAtom = valuesOverTimeAtom(props.path);
    const valuesOverTime = get(valueOverTimeAtom);
    const newValue: TimestampedValue = {
        time: Date.now(),
        value: numericValue
    };
    const newValuesOverTime = [...valuesOverTime, newValue];

    // Remove values that are too old
    const currentTime = Date.now();
    while (newValuesOverTime.length > 0 && newValuesOverTime[0].time < currentTime - MAX_TIME_WINDOW)
        newValuesOverTime.shift();

    // Set the new values over time
    set(valueOverTimeAtom, newValuesOverTime);
});