import axios from 'axios';
import { AsyncStorage } from 'react-native';
const url = "https://resellerver.herokuapp.com";
// const url = "http://be3cd5afdae7.ngrok.io";

export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOADING = 'SET_LOADING';
export const SET_GETUSER = 'SET_GETUSER';
export const SET_ALLPRODUCT = 'SET_ALLPRODUCT';
export const SET_SUCCESSPOST = 'SET_SUCCESSPOST';
export const SET_DELETERESELLER = 'SET_DELETERESELLER';

export const setLogin = (data) => {
    return { type: "SET_LOGIN", payload : data }
}

export const setGetUser = (data) => {
    return { type: SET_GETUSER, payload : data }
}

export const setLoading = (status) => {
    return { type: SET_LOADING, payload: status }
}

export const setAllProduct = (data) => {
    return { type: SET_ALLPRODUCT, payload: data }
}

export const setSuccessPostProduct = (data) => {
    return { type: SET_SUCCESSPOST, payload: data }
}

export const setSuccessDeleteReseller = (data) => {
    return { type: SET_DELETERESELLER, payload: data }
}

export const login = (dataLogin) => {
    console.log('masuk login store', dataLogin);
    return (dispatch) => {
        dispatch(setLoading(true))
        axios.post(url, dataLogin)
            .then( async ({ data }) => {
                await AsyncStorage.setItem("token", JSON.stringify(data));
                await dispatch(setLoading(false));
                dispatch(setLogin(data));
            })
            .catch(err => {
              console.log(err);
            })
    }
}

export const getAllUser = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(`${url}/users`, {
            headers: {
                'token' : `${data}`
            }
        })
            .then(({ data }) => {
                dispatch(setLoading(false));
                dispatch(setGetUser(data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const createReseller = (data) => {
    return (dispatch) => {
        axios.post(`${url}/users/register`, data.data, {
            headers: {
                'token': `${data.token}`
            }
        })
            .then(({ data }) => {
                console.log('success', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const editReseller = (data) => {
    return (dispatch) => {
        axios.patch(`${url}/users/edit/${data.id}`, {
            headers: {
                'token' : `${data.token}`
            }
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteReseller = (data) => {
    return (dispatch) => {
        axios.delete(`${url}/users/delete/${data.id}`, {
            headers: {
                'token' : `${data.token}`
            }
        })
            .then(({ data }) => {
                console.log(data);
                dispatch(setSuccessDeleteReseller(data));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getAllProducts = (data) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        axios.get(`${url}/products`)
        .then(({ data }) => {
            console.log(data, 'dataProduct');
            dispatch(setAllProduct(data))
            dispatch(setLoading(false))
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const postProduct = (data) => {
    return (dispatch) => {
        axios.post(`${url}/products`, data.data, {
            headers: {
                'token' : `${data.token}`
            }
        })
        .then(({ data }) => {
            console.log('success create product');
            console.log(data);
            dispatch(setSuccessPostProduct(data))
        })
        .catch(err => {
            console.log(err);
        })
    }
}