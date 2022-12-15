/**
 * Подсчёт общего кол-ва страниц для пагинации
 * 
 * @param {number} totalCount общее количество todo 
 * @param {number} limit лимит todo на одной странице
 * 
 * @returns {number} общее кол-во страниц для пагинации
 */
export const getPageCount = (totalCount, limit) => {

    return Math.ceil(totalCount / limit);
};

/**
 * Создание массива с номерами страниц для пагинации
 * 
 * @param {number} totalPages общее количество страниц для пагинации
 * 
 * @returns {object} массив с номерами страниц
 */
export const getPagesArray = (totalPages) => {

    let result = [];

    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1);
    };

    return result;
};

/**
 * Получение диапазона отображаемых для пагинации номеров страниц
 * 
 * @param {number} currentPage текущая страница 
 * @param {number} pagesCount  общее количество страниц для пагинации
 * @param {number} paginationPagesLimit сколько всего страниц можно отображать для пагинации 
 * @param {number} leftPagintionLimit сколько страниц можно отображать слева от текущей
 * @param {number} rightPaginationLimit сколько страниц можно отображать справа от текущей
 * 
 * @returns {object} массив [x, y], где x, y - диапазон страниц для отображения в элементе пагинации
 */
export const getPaginationCurrentBorders = (currentPage, pagesCount, paginationPagesLimit, leftPagintionLimit, rightPaginationLimit) => {

    // максимальная левая граница при текущем currentPage
    let leftCurrentBorder = currentPage - leftPagintionLimit;

    // максимальная правая граница при текущем currentPage
    let rightCurrentBorder = currentPage + rightPaginationLimit;

    // если крайний отображаемый номер страницы слева меньше 0 
    if (leftCurrentBorder <= 0) {

        // значит его можно сделать 1
        leftCurrentBorder = 1;

        // а правым сделать лимит общего кол-ва отображаемых страниц 
        rightCurrentBorder = paginationPagesLimit;
    };

    // если крайний отображаемый номер страницы справа больше общего кол-ва страниц (возможно намного)
    if (rightCurrentBorder > pagesCount) {

        // то он становится больше только на 1
        rightCurrentBorder = pagesCount + 1;

        // а левый становится разницей между правым числом и общим кол-вом отображаемых страниц
        leftCurrentBorder = rightCurrentBorder - paginationPagesLimit;
    };

    return [leftCurrentBorder, rightCurrentBorder];
};
