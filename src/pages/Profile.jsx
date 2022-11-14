import React, { useEffect, useState } from "react";
import TodoBackend from "@API/TodoBackend";
import { authTokenHeadersGet } from "@handlers/authHandlers";

const Profile = () => {
    const headers = authTokenHeadersGet();

    const [profile, setProfile] = useState({});

    const fetchProfile = () => {
        TodoBackend.getProfile(
            headers
        ).then(
            response => {
                if (response.status === 200) {
                    setProfile(response.data);
                }
                else {
                    console.log(response);
                };
            }
        ).catch(
            error => {
                console.error(error);
            }
        );
    };

    useEffect(
        () => {
            fetchProfile();
        }, []
    );

    return (
        <div className="mt-4">
            {headers.Authorization
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
                :
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    Please log in to manage your profile
                </h3>
            }
        </div>
    );
};

export default Profile;
