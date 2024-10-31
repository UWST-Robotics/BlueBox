import {atom} from "jotai";
import {valuesOverTimeAtom} from "../useValuesOverTime.ts";
import NetworkTableValue from "../../../types/NetworkTableValue.ts";
import {selectedPathAtom} from "../../selectedPath/useSelectedPath.ts";

export interface UpdateValueOverTimeProps {
    path: string;
    value: NetworkTableValue;
}

export const MAX_VALUES_OVER_TIME = 1000;

// Atoms
export const updateValueOverTimeAtom = atom(null, (get, set, props: UpdateValueOverTimeProps) => {

    // Check the selected path
    const selectedPath = get(selectedPathAtom);
    if (selectedPath != props.path)
        return;

    // Update the value
    const numericValue = Number(props.value);
    const valuesOverTime = get(valuesOverTimeAtom);
    const newValue = {
        time: Date.now(),
        value: numericValue
    };

    set(valuesOverTimeAtom, [...valuesOverTime, newValue].splice(-MAX_VALUES_OVER_TIME));
});