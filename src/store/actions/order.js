import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// synchro
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

// synchro
export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

// synchro
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

// asyncho
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        dispatch(purchaseBurgerSuccess("id", orderData))
        // axios.post('/', orderData)
        //     .then(response => {
        //         dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        //     })
        //     .catch(error => {
        //         dispatch(purchaseBurgerFail(error))
        //     });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};