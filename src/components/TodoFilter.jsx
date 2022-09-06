import React from "react";

const TodoFilter = ({ filter, setFilter }) => {

    return (
        <div className="mb-4">
            <h2>Search Todo</h2>
            <div className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={filter}
                    onChange={event =>
                        setFilter(event.target.value)
                    }
                />
            </div>
        </div>
    );
};

export default TodoFilter;
