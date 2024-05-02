import {useState} from "react";

const useForceUpdate = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, forceUpdate] = useState(0);

    return () => forceUpdate(value => value + 1);
}

export default useForceUpdate;
