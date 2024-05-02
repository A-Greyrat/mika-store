import useForceUpdate from "./useForceUpdate.ts";
import {useCallback, useRef, useState} from "react";
import Store from "../Store.ts";

/**
 * useLazyStore is a custom React hook that creates a state in the Store and returns a tuple of the current state value and a function to update it.
 * The state is lazily updated, meaning that it is do not update UI just only update the state.
 *
 * @template T The type of the state value.
 * @param {string} name The name of the state. This is used as a key to retrieve the state from the Store.
 * @param {T} [value] The initial value of the state. This is used only when the state is created for the first time.
 * @returns {[T | undefined, (newValue: T) => void]} A tuple where the first item is the current state and the second item is a function to update the state.
 * */
const useLazyStore = <T, >(name: string, value?: T): readonly [T | undefined, (newValue: (((prev: T) => T) | T)) => void] => {
    const forceUpdate = useForceUpdate();

    const state = useRef<T | null | undefined>(null);
    const unsubscribe = useRef<() => void>();
    const storedState = useRef(Store.getState(name));
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

    const setState = useCallback((newValue: T | ((prev: T) => T)) => {
        storedState.current!.setValue(newValue)
    }, []);

    return [realValue, setState] as const;
}

export default useLazyStore;
