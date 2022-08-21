import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "../config";

export default class TodoBackend {

    static async addTodo(todo) {
        const response = await axios.post(
            `${todoBackendHost}${todoBackendEndpoints.addTodo}`,
            todo
        );
        return response;
    }

    static async deleteTodo(pk) {
        const response = await axios.delete(
            `${todoBackendHost}${todoBackendEndpoints.deleteTodo}/${pk}`
        );
        return response;
    }

    static async getTodoList() {

        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.getTodoList}`
        );
        return response;
    }

    static async toggleTodo(todo) {
        todo.done = !todo.done;

        const response = await axios.put(
            `${todoBackendHost}${todoBackendEndpoints.toggleTodo}${todo.pk}/`,
            todo
        );
        return response;
    }
}
