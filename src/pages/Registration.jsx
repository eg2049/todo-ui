import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registration } from "../handlers/authHandlers";

const Registration = () => {

    const defaultState = {
        email: "",
        username: "",
        password: "",
        passwordConfirm: ""
    };

    const [credentials, setCredetials] = useState(defaultState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(state => state.isAuth.isAuth);

    const passwordCheck = () => {
        return (credentials.password === credentials.passwordConfirm) ? true : false;
    };

    const registrationStart = (event) => {
        event.preventDefault();

        const passwordMatch = passwordCheck();

        passwordMatch
            ?
            registration(event, credentials, dispatch, navigate)
            :
            console.log("Passwords do not match!");
    };

    return (
        <div>
            {isAuth
                ?
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    You need to log out before start registration
                </h3>
                :
                <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={registrationStart}>
                    <div className="mb-3">
                        <label className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={credentials.email}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, email: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            aria-describedby="emailHelp"
                            value={credentials.username}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, username: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={credentials.password}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, password: event.target.value }
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1Confirm"
                            value={credentials.passwordConfirm}
                            onChange={event =>
                                setCredetials(
                                    { ...credentials, passwordConfirm: event.target.value }
                                )
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-success">
                        Registration
                    </button>
                </form>
            }
        </div>
    );
};

export default Registration;
