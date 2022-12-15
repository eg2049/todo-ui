import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "@reducers/authReducer";

/**
 * добавление нескольких reducer-ов в один объединяющий (rootReducer) при помощи combineReducers()
 * reducer-ы передаются в object, если передать ключ, reducer будет называться как ключ
 * затем этот объединяющий rootReducer передаётся в store
 */
export const rootReducer = combineReducers(
    {
        isAuth: authReducer
    }
);
