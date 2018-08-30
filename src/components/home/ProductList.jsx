import React, {Component} from 'react';
import '../../style/home.css';
import Product from './Product';

import requester from '../../services/requester';

export default class ProductList extends Component {
    constructor(props){
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
                            let promisedMap = res1.map((prod) => {
                                return requester.get('appdata', 'categories', 'kinvey', { '_id': prod.category} )
                                    .then((cat) => {
                                        prod.categoryName = cat[0].name;
                                        return prod;
                                    });
                                })
                            Promise.all(promisedMap)
                                .then((values) => {
                                    requester.userDelete(sessionStorage.userId, sessionStorage.userPass, sessionStorage.username);
                                    sessionStorage.removeItem('authtoken');
                                    sessionStorage.removeItem('userId');
                                    sessionStorage.removeItem('userPass');
                                    sessionStorage.removeItem('username');

                                    this.setState({products: values});
                                });
                    });
                });
        } else if (sessionStorage.authtoken) {
            requester.get('appdata', 'products', 'kinvey')
                .then(res1 => {
                    let promisedMap = res1.map((prod) => {
                        return requester.get('appdata', 'categories', 'kinvey', { '_id': prod.category} )
                            .then((cat) => {
                                prod.categoryName = cat[0].name;
                                return prod;
                            });
                        })
                    Promise.all(promisedMap)
                        .then((values) => {
                            this.setState({products: values});
                        });
            });
        }
    }

    render() {
        return(
            <div className='home-grid-container'>
                {this.state.products.map((product) => (
                    <Product key={product._id} productInfo={product}/>
                ))}
            </div>
        );
    }
}