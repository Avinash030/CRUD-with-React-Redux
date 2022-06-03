import {createStore,applyMiddleware,combineReducers} from "redux"
import createSagaMiddleware from "redux-saga";
import rootSaga from "../rootSaga" 
import userReducer from "../reducer/userReducer"

const rootReducer = combineReducers({
    userReducer
})
let initialState = {};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
export default store