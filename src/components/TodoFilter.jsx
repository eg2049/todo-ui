import React from "react";

/**
 * Компонент строка поискового запроса
 * 
 * @param {object} param0 object сразу деструктурируется
 * @param {string} filter поисковый запрос
 * @param {function} setFilter управление состоянием запроса в поисковой строке 
 * 
 * @returns {object} компонент строка поискового запроса
 */
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
