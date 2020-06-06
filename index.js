
//state mangement library
function createStore(reducer) {
  //The store should have 4 parts
  //The state
  //Get the state
  //Listen to changes on state
  //update the state

  let state;
  let listeners = [];
  const getState = () => state;
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners.filter((l) => l != listener);
    };
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL="REMOVE_GOAL";

function addTodoAction(todo){
  return{
    type:ADD_TODO,
    todo
  }
}

function removeTodoAction(id){
  return {
    type:REMOVE_TODO,
    id
  }
}

function toggleTodoAction(id){
  return {
    type:TOGGLE_TODO,
    id
  }
}

function addGoalAction(goal){
  return{
    type:ADD_GOAL,
    goal
  }
}

function removeGoalAction(id){
  return {
    type:REMOVE_GOAL,
    id
  }
}
//application usage
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((s) => s.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((s) => s.id !== action.id);
    default:
      return state;
  }
}
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

let store = createStore(app);
store.subscribe(() =>
  console.log("new state is " + JSON.stringify(store.getState()))
);

store.dispatch(addTodoAction({
    id: 0,
    title: "hiking",
    complete: false,
}));

store.dispatch(addTodoAction({
  id: 1,
  title: "hiking1",
  complete: false,
}));

store.dispatch(addTodoAction({
  id: 2,
  title: "hiking2",
  complete: false,
}));

store.dispatch(removeTodoAction(1))
store.dispatch(toggleTodoAction(2))

store.dispatch(addGoalAction({
  id:0,
  title:'test',
}));
store.dispatch(addGoalAction({
  id:1,
  title:'test1',
}));
store.dispatch(addGoalAction({
  id:2,
  title:'test2',
}));

store.dispatch(removeGoalAction(1))

