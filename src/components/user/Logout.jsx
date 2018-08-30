import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import requester from '../../services/requester';

export default class Logout extends Component {
    logout = () => {
        requester.post('user', '_logout', 'kinvey')
            .then(res => sessionStorage.removeItem('authtoken'))
            .then(res1 => {
                this.props.handleLogoutProp();
                this.props.history.push('/');
            });
    }

    render = () => {
        this.logout();
        return <Link to='/' />
    }
}