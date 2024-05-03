export declare const useStore: <T>(initialState: T) => [T, (newState: T) => void];
export declare const useLazyStore: <T>(initialState: T) => [T, (newState: T) => void];
export declare const useForceUpdate: () => () => void;
