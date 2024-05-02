import './App.css';
import {useStore} from "./mika-store";

const Component = () => {
    const [action, setAction] = useStore<() => unknown>('action', () => {
        return () => {
            console.log('action');
        }
    });
    const [count, setCount] = useStore<number>('count', () => 0);

    return (
        <div>
            <button onClick={action}>action</button>
            <button onClick={() => {
                setAction(() => {
                    return () => console.log('Component action');
                });
            }}>
                set action
            </button>
            {count}
            <button onClick={() => {
                setCount(count + 1);
            }}>
                add count
            </button>
        </div>
    );
};

const App = () => {
    const [action, setAction] = useStore<() => unknown>('action');
    const [count, setCount] = useStore<number>('count');

    return (
        <div>
            <Component/>
            <button onClick={action}>action</button>
            <button onClick={() => {
                setAction(() => {
                    return () => console.log('App action');
                });
            }}>
                set action
            </button>
            {count}

            <button onClick={() => {
                setCount(0);
            }}>
                reset count
            </button>
        </div>
    );
};
export default App;
