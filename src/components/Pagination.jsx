import React from "react";
import { getPagesArray, getPaginationCurrentBorders } from "../utils/pages";
import { paginationPagesLimit, leftPagintionLimit, rightPaginationLimit } from "../config";

const Pagination = ({ totalPages, page, changePage }) => {

    const pagesArray = getPagesArray(totalPages);

    const [leftCurrentBorder, rightCurrentBorder] = getPaginationCurrentBorders(
        page, pagesArray.length, paginationPagesLimit, leftPagintionLimit, rightPaginationLimit
    );

    return (
        <div>
            {totalPages
                ?
                <div className="pagination justify-content-center mb-4">
                    <span
                        className={pagesArray[0] === page ? "page-link page-item border btn disabled" : "page-link page-item border btn"}
                        onClick={() => changePage(page - 1)}
                    >
                        Prev
                    </span>

                    {
                        pagesArray.map(p =>
                            leftCurrentBorder <= p && p <= rightCurrentBorder
                                ?
                                <span
                                    key={p}
                                    className={page === p ? "page-item page-link border btn active" : "page-item page-link border btn"}
                                    onClick={() => changePage(p)}
                                >
                                    {p}
                                </span>
                                :
                                <span key={p}></span>
                        )
                    }

                    <span
                        className={pagesArray.length === page ? "page-link page-item border btn disabled" : "page-link page-item border btn"}
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
