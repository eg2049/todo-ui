import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "@src/App";
import { store } from "@src/store";

// блок внутри index.html, в который будет монтироваться компонент React
const root = ReactDOM.createRoot(document.getElementById("root"));

// функция для отрисовки
root.render(

    // компонент который необходимо отрисовать
    // App оборачивается компонентом Provider из react-redux 
    // для того чтобы связать react компоненты с redux, параметром Provider принимает store
    <Provider store={store}>
        <App />
    </Provider>
);
