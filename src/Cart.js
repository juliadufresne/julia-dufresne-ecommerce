import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import firebase from './firebase';
import './styles/sass/styles.scss';

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            allPrices: [],
            subtotal: 0,
            tax: 0,
            total: 0,
            productsInCart: []
        }
}

componentDidMount() {
    const dbRefC = firebase.database().ref("/cart");

    dbRefC.once('value').then((response) => {
        const data = response.val();
        const stateToBeSet = []
        
        for (let key in data) {
        const items = {
            key: key,
            name: data[key].name,
            image: data[key].image,
            price: data[key].price
        }
            stateToBeSet.push(items)
        }
        this.setState({
            productsInCart: stateToBeSet
        })
        this.priceOfCart()
    })
}

priceOfCart = () => {
    const priceArr = []
    
    this.state.productsInCart.map((prod)=>{
        const individualPrice = prod.price
        priceArr.push(individualPrice)
    })
    
    this.setState({
        allPrices: priceArr,
    })


    const sumOfProducts = priceArr.reduce(function(a, b){
        return a + b;
    }, 0);

    this.setState({
        subtotal: sumOfProducts
    })


    const tax = (sumOfProducts * 1.13) - sumOfProducts
    const taxRounded = tax.toFixed(2)
    const stringNum = taxRounded.toString().split('.')[1]
    const len = stringNum && stringNum.length > 2 ? stringNum.length : 2
    const finalTax = Number(taxRounded).toFixed(len)

    this.setState({
        tax: finalTax
    })


    const totalUnrounded = Number(sumOfProducts) + Number(taxRounded)
    const total = Number(totalUnrounded).toFixed(len)

    this.setState({
        total: total
    })
}

removeFromCart = (prod) => {
    const dbRef = firebase.database().ref("/cart");
    dbRef.child(prod).remove();

    dbRef.on('value', (response) => {
        const data = response.val();
        const stateToBeSet = []
        
        for (let key in data) {
            const items = {
                key: key,
                name: data[key].name,
                image: data[key].image,
                price: data[key].price
            }
            stateToBeSet.push(items)
        }
        this.setState({
            productsInCart: stateToBeSet
        }, () => {
            this.priceOfCart()
        })
        
    })
}

    render() {
        return (
        <div className="App">
            <Link to="/">Rebecca Heasman Ceramics</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart</Link>
            <h1>Cart</h1>
            {this.state.productsInCart.map((prod, key) => {
            return (
                <div>
                    <p>{prod.name}</p>
                    <p>${prod.price}.00</p>
                    <img src={require(`./assets/${prod.image}.png`)} alt="" srcset=""/>
                    <button className="remove" onClick={() => { this.removeFromCart(prod.key) }}>Remove Entry</button>
                </div>
            )
            })}
            <p>Subtotal - ${this.state.subtotal}.00</p>
            <p>Tax - ${this.state.tax}</p>
            <p>Total - ${this.state.total}</p>
        </div>
    );
    }
}

export default Cart;
