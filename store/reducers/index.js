import { 
    SET_LOGIN,
    SET_LOADING,
    SET_GETUSER,
    SET_ALLPRODUCT,
    SET_SUCCESSPOST,
    SET_DELETERESELLER
 } from '../actions';

const initialStore = {
    dataLogin: {},
    loading: false,
    allUsers: [],
    allProducts: [],
    successPost: {},
    successDeleteReseller: {}
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
        case SET_SUCCESSPOST :
            return { ...state, successPost : payload }
        case SET_DELETERESELLER :
            return { ...state, successDeleteReseller : payload }
        default:
            break;
    }
    return state
}