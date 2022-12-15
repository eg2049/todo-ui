// состояние - object (чаще всего), array, или примитивный тип, который хранит какие-то данные
const defaultState = {
    isAuth: false
};

// названия (type) action-ов лучше выносить в отдельные константы
const SET_AUTH = "SET_AUTH";

// reducer - js функция
// 
// первый параметр - состояние
// defaultState установлено состоянием по умолчанию, 
// оно будет присваиваться в тот момент, когда пользователь открыл приложение, 
// и каждый раз, когда через store.dispatch() будет прокидываться какой-то action, состояние будет изменяться, 
// и храниться в store до тех пор пока не будет обновлена страница, или не будет закрыто приложение
// 
// второй параметр - action
/**
 * Reducer для работы с состоянием аутентификации пользователя
 * 
 * @param {object} state состояние 
 * @param {object} action action для изменения состояния
 * 
 * @returns {object}
 */
export const authReducer = (state = defaultState, action) => {

    // определение какой action был проброшен в reducer
    switch (action.type) {

        // изменение состояния в соответсвии с полученным типом action-а
        case SET_AUTH:

            // состояние в redux является неизменяемым, поэтому каждый раз необходимо возвращать новый object
            // старое состояние деструктурируется, изменяется конкретное поле
            return { ...state, isAuth: action.payload };

        // по дефолту конструкция switch-case обязательно должна возвращать состояние
        // т.е. если если был проброшен action с type, который не обрабатывается ни в каком case, state возвращается неизменённым 
        default:
            return state;
    };
};

// удобно создавать функции actionCreator(), 
// чтобы просто вызвать её передав необходимый payload, не думая о том какой у action-а type
/**
 * Action для измененения состояния аутентификации пользователя
 * 
 * @param {bool} payload аутентифицирован пользователь или нет
 * 
 * @returns {object} action с type=SET_AUTH для изменения состояния аутентификации в redux
 */
export const setAuthAction = (payload) => {

    return {
        type: SET_AUTH,
        payload: payload
    };

};