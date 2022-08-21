import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "../config";

export default class TodoService {

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
}
