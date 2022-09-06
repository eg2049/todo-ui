import React from "react";

const TodoFilter = ({ filter, setFilter }) => {

    return (
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
    );
};

export default TodoFilter;
