import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Correct import
import { productListReducers, productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'

// Add reducers here
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

// Define the initial state if needed
const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage, },
  userLogin: {userInfo: userInfoFromStorage}
};


// Configure the store with middleware and DevTools
const store = configureStore({
  reducer, // Root reducer
  preloadedState: initialState, // Initial state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk
});

export default store;
