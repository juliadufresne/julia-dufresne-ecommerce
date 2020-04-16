import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import firebase from './firebase';
import Products from './Products';
import Cart from './Cart';
import Home from './Home';
import './styles/sass/styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      whatsNewProducts: [],
      productsInCart: [],
      allPrices: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("/data");
    const dbRefC = firebase.database().ref("/cart");
    const randomNum1 = Math.floor(Math.random() * 20);
    const randomNum2 = Math.floor(Math.random() * 20);
    const randomNum3 = Math.floor(Math.random() * 20);

    dbRef.on('value', (response) => {
      const data = response.val();
      const whatsNewArr = []

      whatsNewArr.push((data[randomNum1]), (data[randomNum2]), (data[randomNum3]))

      this.setState({
        products: data,
        whatsNewProducts: whatsNewArr
      })
    })


    dbRefC.on('value', (response) => {
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

  addedNotification = () => {
    document.getElementById('added').innerHTML = `1`;
    setTimeout(function(){ 
        document.getElementById("added").innerHTML = "";
    }, 2000);
  }

  addToCart = (e) => {
    e.preventDefault()
    const id = e.target.id
    const product = this.state.products[id]
    const dbRef = firebase.database().ref("/cart");

    const productInfo = {
        name: product.name,
        image: product.image,
        price: product.price
    }
    dbRef.push(productInfo);

    this.addedNotification()
}

  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route 
          exact
            path="/"
            render={() => 
            <Home 
              products={this.state.products}
              whatsNewProducts={this.state.whatsNewProducts}
              priceOfCart={this.priceOfCart}
            />}
          />
          <Route 
          exact
            path="/shop"
            render={() => 
            <Products 
              products={this.state.products}
              productInCart={this.addToCart}
              priceOfCart={this.priceOfCart}
            />}
          />
          <Route 
          exact
            path="/cart"
            render={() => 
              <Cart 
                items={this.state.productsInCart}
                subtotal={this.state.subtotal}
                tax={this.state.tax}
                total={this.state.total}
                priceOfCart={this.priceOfCart}
              />}
          />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
