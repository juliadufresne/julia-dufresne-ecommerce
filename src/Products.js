import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Button from './styled-components/Button';
import FlexContainer from 'react-styled-flexbox';
import Nav from './styled-components/NavBar';
import Wrapper from './styled-components/Wrapper';
import Li from './styled-components/Li';
import './styles/sass/styles.scss';

class Products extends Component {
    constructor() {
        super();
}

    render() {
        return (
        <Wrapper>
            <FlexContainer justifySpaceBetween={true}>
                <Nav className="home">
                    <Link to="/">Rebecca Heasman Ceramics</Link>
                </Nav>
                <Nav className="links">
                    <Li>
                        <Link to="/shop">Shop</Link>
                    </Li>
                        <Link to="/cart" onClick={this.props.priceOfCart}>Cart</Link>
                </Nav>
            </FlexContainer>
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
        </Wrapper>
    );
    }
}

export default Products;
