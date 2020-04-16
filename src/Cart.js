import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './styles/sass/styles.scss';

class Cart extends Component {
    constructor() {
        super();
}

    render() {
        return (
        <div className="App">
            <Link to="/">Rebecca Heasman Ceramics </Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart" onClick={this.props.priceOfCart}>Cart</Link>
            <h1>Cart</h1>
            {this.props.items.map((prod, key) => {
            return (
                <div>
                    <p>{prod.name}</p>
                    <p>${prod.price}.00</p>
                    <img src={require(`./assets/${prod.image}.png`)} alt="" srcset=""/>
                </div>
            )
            })}
            <p>Subtotal - ${this.props.subtotal}.00</p>
            <p>Tax - ${this.props.tax}</p>
            <p>Total - ${this.props.total}</p>
        </div>
    );
    }
}

export default Cart;
