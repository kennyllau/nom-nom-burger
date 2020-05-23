import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData  from "./ContactData/ContactData";
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // // componentWillMount should be here to initialize the component
    // componentDidMount() {
    //
    //     const ingredients = {};
    //     const query = new URLSearchParams(this.props.location.search);
    //
    //     var price = 0;
    //
    //     for (let param of query.entries()) {
    //
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]; // the plus in front converts to number
    //         }
    //     }
    //
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ?  <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutContinue={this.checkoutContinuedHandler}
                        checkoutCancel={this.checkoutCancelHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                </div>
            );
        }
        return (
            <div>
                {summary}
                {/*<Route path={this.props.match.path + '/contact-data'} component={ContactData}*/}
                {/*    render={(props) =>*/}
                {/*        <ContactData ingredients={this.state.ingredients} price={this.props.price} {...props}/>}*/}
                {/*/>*/}
            </div>
        );
    }
}

const mapStateToProps =  state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchase
    };
};

export default connect(mapStateToProps)(Checkout);