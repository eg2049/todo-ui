import React, { useEffect, useState } from "react";
import { authTokenHeadersGet } from "@handlers/authHandlers";
import TodoBackend from "@API/TodoBackend";
import TodoMessage from "@components/TodoMessage";

/**
 * Компонент-страница для управления профилем пользователя
 * 
 * @returns {object} компонент-страница профиля пользователя
 */
const Profile = () => {

    // формирование headers для отправки запроса на получение данных профиля
    const headers = authTokenHeadersGet();

    const [modalActive, setModalActive] = useState(false);
    const [message, setMessage] = useState("");

    // управление состоянием с данными профиля
    const [profile, setProfile] = useState({});

    /**
     * Запрос к API на получение данных профиля 
     */
    const fetchProfile = () => {
        TodoBackend.getProfile(
            headers
        ).then(
            response => {
                if (response.status === 200) {

                    // измененение состояния объекта с данными профиля
                    setProfile(response.data);
                };
            }
        ).catch(
            error => {
                setMessage(error.response.data.message);
                setModalActive(true);
            }
        );
    };

    // при помощи хука useEffect() данные профиля запрашиваются при каждой загрузке страницы
    useEffect(
        () => {
            fetchProfile();
        }, []
    );

    return (
        <div className="mt-4">
            {headers.Authorization

                // если пользователь аутентифицирован
                ?
                <div>
                    <h2>Profile</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        {/* таблица заполняется данными полученными по API */}
                        <tbody>
                            <tr>
                                <td>username</td>
                                <td>{profile.username}</td>
                            </tr>
                            <tr>
                                <td>email</td>
                                <td>{profile.email}</td>
                            </tr>
                            <tr>
                                <td>last name</td>
                                <td>{profile.last_name}</td>
                            </tr>
                            <tr>
                                <td>first name</td>
                                <td>{profile.first_name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                // если пользователь не аутентифицирован
                :
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    Please log in to manage your profile
                </h3>
            }

            <div><TodoMessage active={modalActive} setActive={setModalActive} message={message} /></div>
        </div>
    );
};

export default Profile;
