import React, {Component} from 'react';
import '../../style/forms.css';

import requester from '../../services/requester';

export default class CreateProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newProduct:{
                name: '',
                description: '',
                price: 0,
                category: ''
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

    handleChange(newValue) {
        this.setState((state) => ({
            ...state,
            newProduct: {
                ...state.newProduct,
                ...newValue
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault();
        let productData = this.state.newProduct;

        requester.post('appdata', 'products', 'kinvey', productData)
            .then(res => {
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
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter product name" value={this.state.newProduct['name']} onChange={e => this.handleChange({name: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Product description:</label>
                        <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" value={this.state.newProduct['description']} onChange={e => this.handleChange({description: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Product price:</label>
                        <input type="number" className="form-control" id="price" name="price" placeholder="00.00" value={this.state.newProduct['price']} onChange={e => this.handleChange({price: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Product category:</label>
                        <select className="form-control" id="category" name="category" value={this.state.newProduct['category']} onChange={e => this.handleChange({category: e.target.value})}>
                            {this.state.categories.map(c => {
                                return <option key={c._id} value={c._id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        );
    }
}