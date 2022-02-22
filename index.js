const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers


//Apply middleware from redux
const applyMiddleware = redux.applyMiddleware

//Logger Middleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//-Middleware: it basically stands between action dispatch and the reducer function to do something like logging in this scenario

//-------------------Action----------------------//
const Buy_Cake = 'Buy_Cake'
const Buy_IceCream = 'Buy_IceCream'

//Action creator --> a function that returns an action
const buyCake = () => {
    return {
        type:Buy_Cake, //type is important
        info:"First Redux Action" //this part can be anything, an object or a single field like this
    }
}
const buyIceCream = () => {
    return {
        type:Buy_IceCream, //type is important
        info:"Second Redux Action" //this part can be anything, an object or a single field like this
    }
}
//-------------------Reducer Function----------------------//

const initialCakeState  = {
    noOfCakes : 10
}

const initialIceCreamState  = {
    noOfIceCream : 10
}

const cakeReducer = (state = initialCakeState,action) => {
    switch(action.type){
        case Buy_Cake:
            return{
                ...state,
                noOfCakes: state.noOfCakes-1
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState,action) => {
    switch(action.type){
        case Buy_IceCream:
            return{
                ...state,
                noOfIceCream: state.noOfIceCream-1
            }
        default:
            return state
    }
}

//-------------------Store----------------------//

//We combine multiple reducers
const rootReducer = combineReducer({
    cake: cakeReducer,
    iceCream : iceCreamReducer
})


const store = createStore(rootReducer,applyMiddleware(logger)) //Applying middleware in the second parameter

//getState is a store function that returns all its current states in the application
console.log('Initial State:',store.getState());

//Subscribing to the store state --> Any time the store updates we log the state to the console
// const unsubscribe = store.subscribe(() => console.log('Updated State:',store.getState())) //.cake

//This time its empty because we applied a logger middleware
const unsubscribe = store.subscribe(() => {})

//Dispatching action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

//Unsubscribing from the store
unsubscribe()