import {atom} from "jotai";
import {valuesOverTimeAtom} from "../useValuesOverTime.ts";
import NetworkTableValue from "../../../types/NetworkTableValue.ts";

export interface UpdateValueOverTimeProps {
    path: string;
    value: NetworkTableValue;
}

export const MAX_VALUES_OVER_TIME = 1000;

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

    // Update the values over time
    const valueOverTimeAtom = valuesOverTimeAtom(props.path);
    const valuesOverTime = get(valueOverTimeAtom);
    const newValue = {
        time: Date.now(),
        value: numericValue
    };

    set(valueOverTimeAtom, [...valuesOverTime, newValue].splice(-MAX_VALUES_OVER_TIME));
});