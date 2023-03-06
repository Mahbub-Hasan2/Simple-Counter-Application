//select dom elements
const counterDIV = document.getElementById("main-counter");
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

const addCounterEl = document.getElementById("addCounter");
const risetCounterEl = document.getElementById("risetCounter");

// action identifiers
const INCREMENT = 'increment';
const DECREMENNT = 'decrement';
const ADDCOUNTER = 'addCounter';
const RISETCOUNTER = 'risetCounter';


// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value,
    }
}
const decrement = (value) => {
    return {
        type: DECREMENNT,
        payload: value,
    }
}
const risetCounter = (value) => {
    return {
        type: RISETCOUNTER,
        payload: value
    }
}
const addCounter = (idAndValoue) => {
    return {
        type: ADDCOUNTER,
        payload: idAndValoue,
    }
}

// initial state 
const initialState = {
    counters: [{
        id: 1,
        value: 0,
    }],
};

function nextCounterId(counters) {
    const maxId = counters.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

// create reducer function
function cunterReducer(state = initialState, action) {
    if (action.type === ADDCOUNTER) {
        const updatedState = {
            ...state,
            counters: [
                ...state.counters,
                {
                    id: nextCounterId(state.counters),
                    value: 0,
                }
            ]
        }
        return updatedState;
    }
    else if (action.type === INCREMENT) {
        return {
            ...state,
            counters: state.counters.map(
                (content, i) => content.id === action.payload.ID ?
                    { ...content, value: content.value + action.payload.VALUE }
                    : content)
        }
    }
    else if (action.type === DECREMENNT) {
        return {
            ...state,
            counters: state.counters.map(
                (content, i) => content.id === action.payload.ID ?
                    { ...content, value: content.value - action.payload.VALUE }
                    : content)
        }
    }
    else if (action.type === RISETCOUNTER) {
        return {
            ...state,
            counters: state.counters.map(
                (content, i) => ({ ...content, value: 0 }
                ))
        }
    }
    else {
        return state;
    }
}

// create store
const store = Redux.createStore(cunterReducer);

const render = () => {
    const state = store.getState();

    counterDIV.innerHTML = `${state.counters.map(count => (`<div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
                <div id="counter" class="text-2xl font-semibold">${count.value}</div>
                <div class="flex space-x-3">
                    <button onClick="sendEncrementEv(${count.id})" class="bg-indigo-400 text-white px-3 py-2 rounded shadow">
                        Increment
                    </button>
                    <button onClick="sendDecrementEv(${count.id})" class="bg-red-400 text-white px-3 py-2 rounded shadow">
                        Decrement
                    </button>
                </div>
            </div>`))}`

}

render();

store.subscribe(render);

// button click listeners
addCounterEl.addEventListener("click", () => {
    store.dispatch(addCounter({
        id: 2,
        value: 0,
    }));
});
risetCounterEl.addEventListener("click", () => {
    store.dispatch(risetCounter());
});
const sendEncrementEv = id => {
    const value = Math.floor(Math.random() * (10 - 2) + 2);
    const idAndValoue = {
        ID: id,
        VALUE: value,
    };
    store.dispatch(increment(idAndValoue));
}
const sendDecrementEv = id => {
    const value = Math.floor(Math.random() * (6 - 1) + 1);
    const idAndValoue = {
        ID: id,
        VALUE: value,
    };
    store.dispatch(decrement(idAndValoue));
}
