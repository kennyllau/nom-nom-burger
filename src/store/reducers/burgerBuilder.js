import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const setIngredients = state => {
    let updatedProperties = {
        ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
        },
        totalPrice: 4,
        error: false
    };
    return updateObject(state, updatedProperties);
};

const fetchIngredientsFail = state => {
    return {
        ...state,
        error: true
    };
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:           return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:        return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:          return setIngredients(state);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFail(state);
        default: return state;
    }
};

export default burgerBuilder;