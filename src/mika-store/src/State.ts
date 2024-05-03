import React from "react";

class State {
    private value: React.MutableRefObject<unknown>;

    constructor(value: React.MutableRefObject<unknown>) {
        this.value = value;
    }

    public getValue<T>() {
        return this.value.current as T;
    }

    public setValue<T>(newValue: T | ((prev: T) => T)) {
        if (typeof newValue === "function") {
            this.value.current = (newValue as ((prev: T) => T))(this.value.current as T);
        } else {
            this.value.current = newValue;
        }
    }
}

export default State;
