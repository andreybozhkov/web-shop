import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import '../../style/header.css';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">Web Shop</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {this.props.isLoggedIn === true && <li className="nav-item">
                            <NavLink className="nav-link" to="/createProduct">Create Product</NavLink>
                        </li>}
                    </ul>
                </div>

                <ul className="navbar-nav mr-auto authentication">
                    {this.props.isLoggedIn === false && <li className="nav-item">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>}
                    {this.props.isLoggedIn === false && <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>}
                    {this.props.isLoggedIn === true && <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>}
                </ul>
            </nav>
        )
    }
}