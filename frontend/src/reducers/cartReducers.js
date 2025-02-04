import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENY_METHOD } from '../constants/cartConstants'


export const cartReducer = (state={cartItems:[], shippingAdress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? { ...x, qty: item.qty } : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
            case CART_REMOVE_ITEM:
                return {
                    ...state,
                    cartItems: state.cartItems.filter(x => x.product !== action.payload)
                }   
            
            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload
                
                }
            case CART_SAVE_PAYMENY_METHOD:
                return {
                    
                }
        default:
            return state

    }   
}