import React from "react";

/**
 * Компонент модальное окно в котором можно показать какое-то сообщение
 * 
 * @param {object} param0 object сразу деструктурируется
 * @param {bool} active активно ли модальное окно
 * @param {function} setActive управление состоянием активности модального окна
 * @param {string} message сообщение которое нужно отобразить в модальном окне
 * 
 * @returns {object} компонент модальное окно с нужным сообщением
 */
const ModalWindow = ({ active, setActive, message }) => {

    return (

        // окно показывается при active = true
        <div className={active ? "modal active" : "modal"} tabIndex="-1" onClick={

            // изменение состония окна при нажатии на область где его нет
            () => setActive(false)
        }>

            {/* stopPropagation() чтобы окно НЕ закрывалось при нажатии на область где оно есть */}
            <div className="modal__content" onClick={
                e => e.stopPropagation()
            }>
                <div className="modal-header">
                    <h5 className="modal-title">Some error</h5>

                    {/* изменение состония окна при нажатии на крестик */}
                    <button type="button" className="btn-close" aria-label="Close" onClick={
                        () => setActive(false)
                    }></button>
                </div>
                <div className="modal-body">

                    {/* показываемое сообщение */}
                    <p>{message}</p>
                </div>
                <div className="modal-footer">


                    {/* изменение состония окна при нажатии на копку Закрыть */}
                    <button type="button" className="btn btn-secondary" onClick={
                        () => setActive(false)
                    }>
                        Close
                    </button>


                    {/* изменение состония окна при нажатии на копку OK */}
                    <button type="button" className="btn btn-success" onClick={
                        () => setActive(false)
                    }>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
