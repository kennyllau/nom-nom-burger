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
                },
                value: 'Fastest'
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
            value: '',
            validation: {
                required: true
            },
            valid: false,
            minLength: 3
        }
    };

    orderHandler = (event) => {

        event.preventDefault();
        // this.setState({loading: true});

        const formData = {};

        for (let eleId in this.state.orderForm) {
            formData[eleId] = this.state.orderForm[eleId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };

        // send to backend
        // axios.post();
        console.log(order, "dasdsad");
        // this.props.history.push('/');
    };

    checkValidity(value, rules) {

        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            console.log("asdasd");
            isValid = value.length >= rules.minLength;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm // the nested obj is not deeped clone (still referenced)
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier] // this will be deep cloned (no nested obj)
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm: updatedOrderForm});
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
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