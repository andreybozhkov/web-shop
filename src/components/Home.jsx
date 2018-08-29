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
                {this.state.products.map((product) => (
                        <div key={product._id} className="card mb-3">
                            <h3 className="card-header">{product.name}</h3>
                            <div className="card-body">
                                <h5 className="card-title">{product.price} BGN</h5>
                                <h6 className="card-subtitle text-muted">{product.category}</h6>
                            </div>
                            <img style={{height: '200px', width: '100%', display: 'block'}} src="https://upload.wikimedia.org/wikipedia/commons/8/85/Smiley.svg" alt="product" />
                            <div className="card-body">
                                <p className="card-text">{product.description}</p>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
}