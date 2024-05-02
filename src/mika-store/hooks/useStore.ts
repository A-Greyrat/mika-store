import {useCallback, useEffect, useRef, useState} from "react";
import Store from "../Store";
import useForceUpdate from "./useForceUpdate";
import State from "../State.ts";

/**
 * A React hook that provides a way to interact with a global state.
 *
 * @template T The type of the state.
 * @param {string} name The name of the state.
 * @param {T} [value] The initial value of the state.
 * @returns {[T | undefined, (newValue: T) => void]} A tuple where the first item is the current state and the second item is a function to update the state.
 */
const useStore = <T, >(name: string, value?: T): readonly [T | undefined, (newValue: (((prev: T) => T) | T)) => void] => {
    const forceUpdate = useForceUpdate();

    const state = useRef<T | null | undefined>(null);
    const unsubscribe = useRef<() => void | undefined>();
    const storedState = useRef<State | undefined>(Store.getState(name));
    // if using ref to save the value, in strict mode, the value will not be updated
    const [realValue, setRealValue] = useState<T | undefined>(storedState.current?.getValue<T>())

    // If the state does not exist, create a new state and subscribe to it.
    // Otherwise, just subscribe to the existing state.
    if (state.current === null) {
        state.current = value;

        !storedState.current && (storedState.current = Store.addState(name, state));
        unsubscribe.current = Store.subscribe(storedState.current!, forceUpdate);
    }

    if (realValue !== storedState.current?.getValue<T>()) {
        setRealValue(storedState.current?.getValue<T>());
    }

    // Unsubscribe from the state when the component unmounts.
    useEffect(() => {
        return () => {
            unsubscribe.current?.();
        };
    }, []);

    const setState = useCallback((newValue: T | ((prev: T) => T)) => {
        Store.updateState<T>(name, newValue);
    }, [name]);

    return [realValue, setState] as const;
}

export default useStore;
