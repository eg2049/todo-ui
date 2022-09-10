export const getPageCount = (totalCount, limit) => {

    return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages) => {

    let result = [];

    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    };

    return result;
};

export const getPaginationCurrentBorders = (currentPage, pagesCount, paginationPagesLimit, leftPagintionLimit, rightPaginationLimit) => {

    let leftCurrentBorder = currentPage - leftPagintionLimit;
    let rightCurrentBorder = currentPage + rightPaginationLimit;

    if (leftCurrentBorder <= 0) {
        leftCurrentBorder = 1;
        rightCurrentBorder = paginationPagesLimit;
    };

    if (rightCurrentBorder > pagesCount) {
        rightCurrentBorder = pagesCount + 1;
        leftCurrentBorder = rightCurrentBorder - paginationPagesLimit;
    };

    return [leftCurrentBorder, rightCurrentBorder];
};
