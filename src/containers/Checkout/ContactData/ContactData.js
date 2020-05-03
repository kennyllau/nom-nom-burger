import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: this.getFormTemplate('input', 'text', 'Your Name'),
            email: this.getFormTemplate('input', 'email', 'Your Email'),
            street: this.getFormTemplate('input', 'text', 'Street'),
            postalCode: this.getFormTemplate('input', 'text', 'ZIP Code'),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                }
            }
        },
        loading: false
    };

    getFormTemplate(eleType, configType, placeholder) {
        return {
            elementType: eleType,
            elementConfig: {
                type: configType,
                placeholder: placeholder
            },
            value: ''
        }
    };

    orderHandler = (event) => {

        event.preventDefault();

        // this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };

        // send to backend
        // axios.post();
        console.log(this.props, "dasdsad");
        this.props.history.push('/');
    };

    render() {

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        // if (this.state.loading) {
        //     form = <Spinner />;
        // }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;