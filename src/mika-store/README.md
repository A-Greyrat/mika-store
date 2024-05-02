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

```javascript
import { useStore } from 'mika-store';

const Component = () => {
    const [state, setState] = useStore('count', 0);

    return (
        <div>
            <p>{state}</p>
            <button onClick={() => setState(count => count + 1)}>+</button>
            <button onClick={() => setState(state - 1)}>-</button>
        </div>
    );
};

const App = () => {
    const [state, setState] = useStore('count', 0);

    return (
        <div>
            <Component/>
            {/* 
                The state of the Component and the App is the same, 
                so the count of the App will be updated when the count of the Component is updated.
            */}
            <p>{state}</p>
        </div>
    );
};
```

### 2. useLazyStore
`useLazyStore` is similar to `useStore`, but it will not trigger the re-render of the component when the state is updated.  
`useLazyStore` is like a global `useRef` in React.

```javascript

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
