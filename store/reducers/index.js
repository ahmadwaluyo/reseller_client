import { 
    SET_LOGIN,
    SET_LOADING,
    SET_GETUSER,
    SET_ALLPRODUCT
 } from '../actions';

const initialStore = {
    dataLogin: {},
    loading: false,
    allUsers: [],
    allProducts: []
}

export default function reducers (state=initialStore, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_LOGIN :
            return { ...state, dataLogin : { ...payload } }
        case SET_LOADING :
            return { ...state, loading : payload }
        case SET_GETUSER :
            return { ...state, allUsers : payload }
        case SET_ALLPRODUCT :
            return { ...state, allProducts : payload }
        default:
            break;
    }
    return state
}