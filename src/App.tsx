import './App.css';
import {useStore} from "./mika-store";

const Component = () => {
    const [state, setState] = useStore('count', 0);

    return (
        <div>
            <p>{state}</p>
            <button onClick={() => setState(count => count + 1)}>+</button>
            <button onClick={() => setState(state! - 1)}>-</button>
        </div>
    );
};

const App = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, _setState] = useStore('count', 0);

    return (
        <div>
            <Component/>
            <p>{state}</p>
        </div>
    );
};
export default App;
