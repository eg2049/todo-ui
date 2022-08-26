import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "../config";

export default class TodoBackend {

    // auth
    static async authToken(credentials) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.authToken}`,
            credentials
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
