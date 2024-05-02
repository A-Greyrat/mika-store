# mika-store

a simple hook-based state management library.

## Installation

```bash
npm install mika-store
```

## Usage

### 1. useStore
`useStore` just like `useState` in React, but it's a global state.  
`useStore` accepts two parameters, the first is the key of the state, the second is the initial value of the state.

```tsx
import { useStore } from 'mika-store';

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
```

### 2. useLazyStore
`useLazyStore` is similar to `useStore`, but it will not trigger the re-render of the component when the state is updated.  
`useLazyStore` is like a global `useRef` in React.

```jsx

import { useLazyStore } from 'mika-store';

const Component = () => {
    const [state, setState] = useLazyStore('count', 0);

    return (
        <div>
            <p>{state.current}</p>
            <button onClick={() => setState(count => count + 1)}>+</button>
            <button onClick={() => setState(state - 1)}>-</button>
        </div>
    );
};

const App = () => {
    const [state, setState] = useLazyStore('count', 0);
    const forceUpdate = useForceUpdate();

    return (
        <div>
            <Component/>
            <p>{state}</p>
            <button onClick={() => {
                forceUpdate();
            }}>
                update
            </button>
        </div>
    );
};
```
