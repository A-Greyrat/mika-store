import {useCallback, useEffect, useRef, useState} from "react";
import Store from "../Store";
import State from "../State.ts";

/**
 * A React hook that provides a way to interact with a global state.
 *
 * @template T The type of the state.
 * @param {string} name The name of the state.
 * @param {T | () => T} [initValue] The initial value of the state.
 * @returns {[T, (newValue: T) => void]} A tuple where the first item is the current state and the second item is a function to update the state.
 */
const useStore = <T, >(name: string, initValue?: T | (() => T)): readonly [T, (newValue: (((prev: T) => T) | T)) => void] => {
    const state = useRef<T | null | undefined>(null);
    const unsubscribe = useRef<() => void | undefined>();
    const storedState = useRef<State | undefined>(Store.getState(name));
    // if using ref to save the value, in strict mode, the value will not be updated
    const [realValue, setRealValue] = useState<T>(() => storedState.current?.getValue<T>() as T);

    // If the state does not exist, create a new state and subscribe to it.
    // Otherwise, just subscribe to the existing state.
    if (state.current === null) {
        state.current = initValue instanceof Function ? initValue() : initValue;

        !storedState.current && (storedState.current = Store.addState(name, state));
        unsubscribe.current = Store.subscribe(storedState.current!, (value) => setRealValue(value as T));
    }

    if (realValue !== storedState.current?.getValue<T>()) {
        setRealValue(() => {
            return storedState.current?.getValue<T>() as T;
        });
    }

    // Unsubscribe from the state when the component unmounts.
    useEffect(() => {
        return () => {
            unsubscribe.current?.();
        };
    }, []);

    useEffect(() => {
        if (typeof storedState.current?.getValue<T>() === 'undefined' && typeof state.current !== 'undefined') {
            Store.updateState<T>(name, initValue!);
        }
    }, [name, initValue]);

    const setState = useCallback((newValue: T | ((prev: T) => T)) => {
        Store.updateState<T>(name, newValue);
    }, [name]);

    return [realValue, setState] as const;
}

export default useStore;
