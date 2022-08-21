import React, { useState } from "react";
import TodoService from "../API/TodoBackend";

const TodoForm = () => {
    const [todo, setTodo] = useState(
        {
            title: "",
            description: ""
        }
    );

    const addTodo = () => {
        TodoService.addTodo(todo);

        setTodo(
            {
                title: "",
                description: ""
            }
        );
    };

    return (
        <div className="card card-body mt-4 mb-4">
            <h2>Add Todo</h2>
            <form onSubmit={() => addTodo()}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={todo.title}
                        onChange={event => setTodo({ ...todo, title: event.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={todo.description}
                        onChange={event => setTodo({ ...todo, description: event.target.value })}
                    />
                </div>

                <div className="form-group mt-2">
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => addTodo}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
