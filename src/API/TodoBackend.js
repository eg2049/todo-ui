import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "@config/config";

/**
 * Вызов API-методов бэка todo-backend
 */
export default class TodoBackend {

    /**
     * Аутентификация, получение токена аутентификации
     * 
     * @param {object} credentials креды для аутентификации 
     * 
     * @returns {object} ответ от бэка
     */
    static async authTokenGet(credentials) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.authTokenGet}`,
            credentials
        );
        return response;
    }

    /**
     * Логаут, деактивация токена аутентификации
     *  
     * @param {object} headers headers с которыми будет выполняться запрос
     * 
     * @returns {object} ответ от бэка 
     */
    static async authTokenRemove(headers = {}) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.authTokenRemove}`,
            {},
            { headers: headers }
        );
        return response;
    }

    /**
     * Регистрация нового пользователя
     * 
     * @param {object} credentials данные регистрируемого пользователя 
     * 
     * @returns {object} ответ от бэка 
     */
    static async registration(credentials) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.registration}`,
            credentials
        );
        return response;
    }

    /**
     * Подтверэдение профиля пользователя
     * 
     * @param {object} body тело запроса
     *  
     * @returns {object} ответ от бэка 
     */
    static async profileConfirmation(body) {
        const response = await axios.put(
            `${todoBackendHost}${todoBackendEndpoints.profileConfirmation}`,
            body
        );
        return response;
    }

    /**
     * Получение данных профиля пользователя
     * 
     * @param {object} headers headers с которыми будет выполняться запрос 
     * 
     * @returns {object} ответ от бэка 
     */
    static async getProfile(headers = {}) {
        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.profile}`,
            { headers: headers }
        );
        return response;
    }

    /**
     * Создание todo
     * 
     * @param {object} headers headers с которыми будет выполняться запрос
     * @param {object} todo данные создаваемого todo
     * 
     * @returns {object} ответ от бэка 
     */
    static async addTodo(headers = {}, todo) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.addTodo}`,
            todo,
            { headers: headers }
        );
        return response;
    }

    /**
     * Удаление todo
     * 
     * @param {object} headers headers с которыми будет выполняться запрос 
     * @param {string} pk pk удаляемого todo 
     * 
     * @returns {object} ответ от бэка 
     */
    static async deleteTodo(headers = {}, pk) {
        const response = await axios.delete(
            `${todoBackendHost}${todoBackendEndpoints.deleteTodo}${pk}/`,
            { headers: headers }
        );
        return response;
    }

    /**
     * Получение списка todo
     * 
     * @param {object} headers headers с которыми будет выполняться запрос 
     * 
     * @returns {object} ответ от бэка 
     */
    static async getTodoList(headers = {}) {
        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.getTodoList}`,
            { headers: headers }
        );
        return response;
    }

    /**
     * Переключение флага готовности todo
     * 
     * @param {object} headers headers с которыми будет выполняться запрос 
     * @param {object} todo данные переключаемого todo 
     * 
     * @returns {object} ответ от бэка 
     */
    static async toggleTodo(headers = {}, todo) {
        todo.done = !todo.done;

        const response = await axios.put(
            `${todoBackendHost}${todoBackendEndpoints.toggleTodo}${todo.pk}/`,
            todo,
            { headers: headers }
        );
        return response;
    }
}
