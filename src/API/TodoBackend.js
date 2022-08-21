import axios from "axios";
import { todoBackendEndpoints, todoBackendHost } from "../config";

export default class TodoService {

    static async getTodoList() {

        const response = await axios.get(
            `${todoBackendHost}${todoBackendEndpoints.getTodoList}`
        );
        return response;
    }
}
