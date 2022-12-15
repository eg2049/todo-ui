import React from "react";
import { getPagesArray, getPaginationCurrentBorders } from "@utils/pages";
import { paginationPagesLimit, leftPagintionLimit, rightPaginationLimit } from "@config/config";

/**
 * Компонент для пагинации
 * 
 * @param {object} param0 object сразу деструктурируется
 * @param {number} totalPages общее количество страниц для пагинации
 * @param {number} page текущая страница
 * @param {function} changePage обработчик события смены страницы для пагинации
 * 
 * @returns {object} компонент для пагинации
 */
const Pagination = ({ totalPages, page, changePage }) => {

    // получение массива с номерами страниц
    const pagesArray = getPagesArray(totalPages);

    // получение диапазона номеров страниц для отображения для пагинации
    const [leftCurrentBorder, rightCurrentBorder] = getPaginationCurrentBorders(
        page, pagesArray.length, paginationPagesLimit, leftPagintionLimit, rightPaginationLimit
    );

    return (
        <div>

            {/* если есть хотя бы одна страница для отображения (хотя бы одно todo) */}
            {totalPages
                ?
                <div className="pagination justify-content-center mb-4">

                    <span

                        // кнопка отключается если текущая страница первая в массиве страниц
                        className={pagesArray[0] === page ? "page-link page-item border btn disabled" : "page-link page-item border btn"}

                        // на одну страницу назад при нажатии
                        onClick={() => changePage(page - 1)}
                    >
                        Prev
                    </span>

                    {
                        // итерация по массиву с номерами страниц
                        pagesArray.map(p =>

                            // страница будет отображаться только если входит в текущий диапазон страниц к отображению
                            leftCurrentBorder <= p && p <= rightCurrentBorder
                                ?
                                <span
                                    key={p}

                                    // кнопка отключается для текущей страницы
                                    className={page === p ? "page-item page-link border btn active" : "page-item page-link border btn"}

                                    // смена страницы на соответствующий номер при нажатии
                                    onClick={() => changePage(p)}
                                >
                                    {p}
                                </span>
                                :
                                <span key={p}></span>
                        )
                    }

                    <span
                        // кнопка отключается если текущая страница последняя в массиве страниц
                        className={pagesArray.length === page ? "page-link page-item border btn disabled" : "page-link page-item border btn"}

                        // на одну страницу вперёд при нажатии
                        onClick={() => changePage(page + 1)}
                    >
                        Next
                    </span>
                </div>

                :
                <div></div>
            }
        </div >
    );
};

export default Pagination;
