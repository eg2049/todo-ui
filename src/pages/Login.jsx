import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authTokenGet } from "../handlers/authHandlers";

const Login = () => {

    const defaultState = {
        username: "",
        password: ""
    };

    const [credentials, setCredetials] = useState(defaultState);

    const navigate = useNavigate();

    const authStart = (event) => {
        authTokenGet(event, credentials, navigate);
    };

    return (
        <div>
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
        </div>
    );
};

export default Login;
