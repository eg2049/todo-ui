import React from "react";

const TodoList = ({ todos, toggle, remove }) => {

    return (
        <div className="min-vh-100 mb-4">
            <h2>Todo List</h2>

            {todos.paginated.length
                ?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>description</th>
                            <th>done</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.paginated.map(
                                todo =>
                                    <tr key={todo.pk}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                defaultChecked={todo.done}
                                                onChange={() => toggle(todo)}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => remove(todo.pk)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

                :
                todos.full.length
                    ?
                    <div className="text-center mt-5">
                        <h3>No todos found for your query</h3>
                    </div>
                    :
                    <div className="text-center mt-5">
                        <h3>You don't have any todo right now</h3>
                    </div>
            }

        </div>
    );
};

export default TodoList;
