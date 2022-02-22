const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers

//Axios
const axios = require('axios')

//Apply middleware from redux
const applyMiddleware = redux.applyMiddleware

//Thunk Middleware
const thunkMiddleware = require('redux-thunk').default


//-------------------Actions----------------------//
const Fetch_User_Request = 'Fetch_User_Request'
const Fetch_User_Success = 'Fetch_User_Success'
const Fetch_User_Error = 'Fetch_User_Error'

//Action Creator
const fetchUserRequest = () => {
    return {
        type:Fetch_User_Request
    }
}
const fetchUserSuccess = (users) => {
    return {
        type:Fetch_User_Success,
        payload: users
    }

}
const fetchUserError = (error) => {
    return {
        type: Fetch_User_Error,
        error: error
    }
}

//-------------------Reducers----------------------//
const initialState = {
    isLoading : false,
    data : [],
    error : ""
}

const FetchUserReducer = (state = initialState,action) => {
    switch (action.type) {
        case Fetch_User_Request:
            return {
                ...state,
                isLoading: true,
            }
        case Fetch_User_Success:
            return {
                ...state,
                isLoading: false,
                data : [...action.payload]
            }
        case Fetch_User_Error:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}

//-------------------Store----------------------//

//We combine multiple reducers
const rootReducer = combineReducer({
    fetchUser: FetchUserReducer,
})


//Middleware function that handles the async api
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios
            .get(`https://jsonplaceholder.typicode.com/users`)
            .then((response)=>{
                //response.data
                dispatch(fetchUserSuccess(response.data && response.data.map(user=>user.id))) //only returns user id
            })
            .catch((error)=>{
                //error.message
                dispatch(fetchUserError(error.message))
            })
    }
}

//-- thunk allows the action creator to return a function instead of an action (like action.type e.t.c) so
//-- that we can further work on that action like calling an api or logging something
const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))

const unsubscribe = store.subscribe(()=>{console.log(store.getState())})

store.dispatch(fetchUsers())

unsubscribe()

