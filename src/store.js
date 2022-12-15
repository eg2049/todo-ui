import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@reducers";

// store - объект с несколькими методами
// getState() - получить состояние
// dispatch() - изменить состояние
// ... - подписаться на изменение сотояний
// первый аргумент - reducer, здесь передаётся rootReducer, в котором находятся все остальные reducer-ы
// второй аргумент - middleware thunk, который позволяет внутри каких-то сторонних функций использовать dispatch()
export const store = configureStore({ reducer: rootReducer });
