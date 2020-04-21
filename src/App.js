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
      whatsNewProducts: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("/data");
    let randomNum1 = Math.floor(Math.random() * 20);
    let randomNum2 = Math.floor(Math.random() * 20);
    let randomNum3 = Math.floor(Math.random() * 20);

    dbRef.on('value', (response) => {
      const data = response.val();
      const whatsNewArr = []

      if (randomNum1 === randomNum2) {
        if (randomNum1 <= 18) {
          randomNum1 = randomNum1 + 1
        } else if (randomNum1 === 19) {
          randomNum1 = randomNum1 - 1
        }
      } else if (randomNum1 === randomNum3) {
        if (randomNum1 <= 18) {
          randomNum1 = randomNum1 + 1
        } else if (randomNum1 === 19) {
          randomNum1 = randomNum1 - 1
        }
      } else if (randomNum2 === randomNum3) {
        if (randomNum2 <= 18) {
          randomNum2 = randomNum2 + 1
        } else if (randomNum2 === 19) {
          randomNum2 = randomNum2 - 1
        }
      } 

      whatsNewArr.push((data[randomNum1]), (data[randomNum2]), (data[randomNum3]))

      this.setState({
        products: data,
        whatsNewProducts: whatsNewArr
      })
    })
  }


  // addedNotification = () => {
  //   document.getElementById('added').innerHTML = `1`;
  //   setTimeout(function(){ 
  //       document.getElementById("added").innerHTML = "";
  //   }, 2000);
  // }

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

    // this.addedNotification()
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
            />}
          />
          <Route 
          exact
            path="/shop"
            render={() => 
            <Products 
              products={this.state.products}
              productInCart={this.addToCart}
            />}
          />
          <Route 
          exact
            path="/cart"
            render={() => 
              <Cart/>
            }
          />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
