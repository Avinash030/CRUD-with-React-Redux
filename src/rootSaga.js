import {all} from "redux-saga/effects"
import userSaga from "./saga/userSaga"

export default function* rootSaga(){
   yield all([
        userSaga()
    ])
}