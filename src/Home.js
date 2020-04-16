import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import './styles/sass/styles.scss';

class Home extends Component {
    constructor() {
    super();
}

    render() {
        return (
        <div>
            <Link to="/">Rebecca Heasman Ceramics</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart" onClick={this.props.priceOfCart}>Cart</Link>
            <header>
                <div className="headerImage"></div>
                <p>Header image</p>
            </header>
            <section className="whatsNew">
                {this.props.whatsNewProducts.map((prod) => {
                    return (
                        <div>
                            <p>{prod.name}</p>
                            <p>${prod.price}.00</p>
                            <img src={require(`./assets/${prod.image}.png`)} alt="" srcset=""/>
                        </div>
                    )
                    })}
            <Link to="/shop">Shop all products</Link>
            </section>
            <section id="about">
                <h2>About</h2>
            </section>
            <section id="contact">
                <h2>Contact</h2>
            </section>
        </div>
        );
    }
    }

    export default Home;
