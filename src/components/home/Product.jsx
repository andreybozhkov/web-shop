import React, {Component} from 'react';


export default class Product extends Component {
    render() {
        return(
            <div className="card mb-3">
                <h3 className="card-header">{this.props.productInfo.name}</h3>
                <div className="card-body">
                    <h5 className="card-title">Price: {this.props.productInfo.price} BGN</h5>
                    <h6 className="card-subtitle text-muted">Category: {this.props.productInfo.categoryName}</h6>
                </div>
                <img style={{height: '200px', width: '100%', display: 'block'}} src="https://upload.wikimedia.org/wikipedia/commons/8/85/Smiley.svg" alt="product" />
                <div className="card-body">
                    <p className="card-text">Description: {this.props.productInfo.description}</p>
                </div>
            </div>
        );
    }
}