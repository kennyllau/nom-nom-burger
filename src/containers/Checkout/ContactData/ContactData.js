import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                value: 'fastest',
                valid: true,
                validation: {}
            },
        },
        formIsValid: false,
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
                required: true,
                minLength: 3
            },
            valid: false,
            touched: false
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
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        // send to backend
        // axios.post();
        // console.log(order, "dasdsad");
        this.props.history.push('/');
    };

    checkValidity(value, rules) {

        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
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
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

export default connect(mapStateToProps)(ContactData);