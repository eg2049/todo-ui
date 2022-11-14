import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authTokenGet } from "@handlers/authHandlers";

const Login = () => {

    const defaultState = {
        username: "",
        password: ""
    };

    const [credentials, setCredetials] = useState(defaultState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuth = useSelector(state => state.isAuth.isAuth);

    const authStart = (event) => {
        authTokenGet(event, credentials, dispatch, navigate);
    };

    return (
        <div>
            {isAuth
                ?
                <h3 className="position-absolute top-50 start-50 translate-middle">
                    You are already loged in
                </h3>
                :
                <form className="col-3 position-absolute top-50 start-50 translate-middle" onSubmit={authStart}>
                    <div className="mb-3">
                        <label className="form-label">
                            Login
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={credentials.login}
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

                    <button type="submit" className="btn btn-success">
                        Login
                    </button>
                </form>
            }
        </div>
    );
};

export default Login;
