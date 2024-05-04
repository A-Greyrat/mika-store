export declare function useStore<T>(name: string, initValue?: T | (() => T)): readonly [T, (newValue: (((prev: T) => T) | T)) => void];

export declare function useLazyStore<T>(name: string, initValue?: T | (() => T)): readonly [T, (newValue: (((prev: T) => T) | T)) => void];

export declare function useForceUpdate(): () => void;
