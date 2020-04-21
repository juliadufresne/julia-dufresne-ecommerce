import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Button from './Button'
import './styles/sass/styles.scss';

class Products extends Component {
    constructor() {
        super();
}

    render() {
        return (
        <div className="App">
            <Link to="/">Rebecca Heasman Ceramics </Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart" onClick={this.props.priceOfCart}>Cart</Link>
            <div class="added" id="added"></div>
            <h1>Shop</h1>
            {this.props.products.map((prod, key) => {
            return (
                <div>
                    <p>{prod.name}</p>
                    <p>${prod.price}.00</p>
                    <img src={require(`./assets/${prod.image}.png`)} alt="" srcset=""/>
                    <Button id={key} onClick={this.props.productInCart}>Add to cart</Button>
                </div>
            )
            })}
        </div>
    );
    }
}

export default Products;
