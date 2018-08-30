import React, {Component} from 'react';
import '../../style/forms.css';

import requester from '../../services/requester';

export default class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newProduct = {
                productName: '',
                productDescription: '',
                productPrice: 0,
                productCategory: ''
            },
            categories: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        requester.get('appdata', 'categories', 'kinvey')
            .then(reqCategories => {
                this.setState({ categories: reqCategories });
            })
    }

    handleChange(event) {
        this.setState({ newProduct: {
            [event.target.name]: event.target.value
        }});
    }

    handleSubmit(event) {
        event.preventDefault();
        let productData = {
            'name': this.state.newProduct['productName'],
            'description': this.state.newProduct['productDescription'],
            'price': this.state.newProduct['productPrice'],
            'category': this.state.newProduct['productCategory'],
        }
        console.log(productData);

        requester.post('appdata', 'products', 'kinvey', productData)
            .then(res => {
                console.log(res);
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <form className="form-marginator" onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Create Product</legend>
                    <div className="form-group">
                        <label>Product name:</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter product name" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Product description:</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Product price:</label>
                        <input type="number" className="form-control" id="price" name="price" placeholder="00.00" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Product price:</label>
                        <input type="number" className="form-control" id="price" name="price" placeholder="00.00" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        );
    }
}