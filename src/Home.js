import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Button from './styled-components/Button';
import FlexContainer from 'react-styled-flexbox';
import Nav from './styled-components/NavBar';
import Wrapper from './styled-components/Wrapper';
import Li from './styled-components/Li';
import './styles/sass/styles.scss';

class Home extends Component {
    constructor() {
    super();
}

    render() {
        return (
        <div>
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
            <Link to="/shop"><Button>Shop all products</Button></Link>
            </section>
            <section id="about">
                <h2>About</h2>
            </section>
            <section id="contact">
                <h2>Contact</h2>
            </section>
        </Wrapper>
        </div>
        );
    }
    }

    export default Home;
