import React from "react";
import { Link } from "react-router-dom";
import { todoUIEndpoints } from "../../../config";
import { authTokenHeadersGet } from "../../../handlers/authHandlers";

const Navbar = () => {
    const isAuth = authTokenHeadersGet();

    return (
        <nav className="navbar navbar-expand-lg bg-light">
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
                                {isAuth.Authorization
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
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
