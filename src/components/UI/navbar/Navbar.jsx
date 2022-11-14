import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { todoUIEndpoints } from "@config/config";
import { authDispatch } from "@handlers/authHandlers";

const Navbar = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.isAuth.isAuth);

    useEffect(
        () => {
            authDispatch(dispatch);
        }, []
    );

    return (
        <nav className="navbar navbar-expand-lg bg-light mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to={todoUIEndpoints.main}>Todo App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu">
                                {isAuth
                                    ?
                                    <div>
                                        <li><Link className="dropdown-item" to={todoUIEndpoints.profile}>Profile</Link></li>
                                        <li><Link className="dropdown-item" to={todoUIEndpoints.logout}>Logout</Link></li>
                                    </div>
                                    :
                                    <div>
                                        <li><Link className="dropdown-item" to={todoUIEndpoints.login}>Login</Link></li>
                                        <li><Link className="dropdown-item" to={todoUIEndpoints.registration}>Registration</Link></li>
                                    </div>
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
