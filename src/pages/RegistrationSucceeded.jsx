import React from "react";
import { useSelector } from "react-redux";

/**
 * Компонент-страница для сообщения об успешной регистрации
 * 
 * @returns {object} компонент-страница с сообщением об успешной регистрации
 */
const RegistrationSucceeded = () => {
    const isAuth = useSelector(state => state.isAuth.isAuth);

    return (
        <div>
            {isAuth
                ?
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    Your account has already been verified
                </h3>

                :
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    To verify your account, follow the link sent to the email address you provided during registration
                </h3>
            }
        </div>
    );
};

export default RegistrationSucceeded;
