import React, {Component} from 'react';
import '../style/home.css';

import requester from '../services/requester';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }
    componentDidMount() {
        if (!sessionStorage.authtoken) {
            requester.post('user', '', 'basic')
                .then(res => {
                    sessionStorage.setItem('authtoken', res._kmd.authtoken);
                    sessionStorage.setItem('userId', res._id);
                    sessionStorage.setItem('userPass', res.password);
                    sessionStorage.setItem('username', res.username);

                    requester.get('appdata', 'products', 'kinvey')
                        .then(res1 => {
                            requester.userDelete(sessionStorage.userId, sessionStorage.userPass, sessionStorage.username);
                            sessionStorage.removeItem('authtoken');
                            sessionStorage.removeItem('userId');
                            sessionStorage.removeItem('userPass');
                            sessionStorage.removeItem('username');

                            this.setState({ products: res1 });
                        });
                });
        }
    }
    
    render() {
        return (
            <div className='home-grid-container'>
                {this.state.products.map(product => 
                    <div key={product._id} className='home-product-container'>
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                    </div>
                )}
            </div>
        )
    }
}