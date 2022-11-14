import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "@config/config";

export default class TodoBackend {

    // auth
    static async authTokenGet(credentials) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.authTokenGet}`,
            credentials
        );
        return response;
    }

    static async authTokenRemove(headers = {}) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.authTokenRemove}`,
            {},
            { headers: headers }
        );
        return response;
    }

    static async registration(credentials) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.registration}`,
            credentials
        );
        return response;
    }

    // user
    static async getProfile(headers = {}) {
        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.profile}`,
            { headers: headers }
        );
        return response;
    }

    // todo
    static async addTodo(headers = {}, todo) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.addTodo}`,
            todo,
            { headers: headers }
        );
        return response;
    }

    static async deleteTodo(headers = {}, pk) {
        const response = await axios.delete(
            `${todoBackendHost}${todoBackendEndpoints.deleteTodo}/${pk}`,
            { headers: headers }
        );
        return response;
    }

    static async getTodoList(headers = {}) {
        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.getTodoList}`,
            { headers: headers }
        );
        return response;
    }

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
