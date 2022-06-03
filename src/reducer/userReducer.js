import {
    GET_USER_REQUESTED,
    GET_USER_SUCCESSED,
    GET_USER_FAILED,
    SAVE_USER_REQUESTED,
    SAVE_USER_SUCCESSED,
    SAVE_USER_FAILED,
    DELETE_USER_REQUESTED,
    DELETE_USER_SUCCESSED,
    DELETE_USER_FAILED
} from "../action/userAction"

const initialState = {
    showLoader: false,
    userData: ""
  };

const userReducer=(state=initialState,{
    type, payload
}) =>{
    switch(type){
        case GET_USER_REQUESTED :
            return{
                ...state,
                type,
                data:""
            }
        case GET_USER_SUCCESSED :
            return{
                ...state,
                type,
                data:payload
            }
        case GET_USER_FAILED :
                return{
                    ...state,
                    type,
                    data:payload
                }
        case SAVE_USER_REQUESTED :
            return{
                ...state,
                type,
                data:""
            }
        case SAVE_USER_SUCCESSED :
            return{
                ...state,
                type,
                data:payload
            }
        case SAVE_USER_FAILED :
                return{
                    ...state,
                    type,
                    data:payload
                }
        case DELETE_USER_REQUESTED :
            return{
                ...state,
                type,
                data:""
            }
        case DELETE_USER_SUCCESSED :
            return{
                ...state,
                type,
                data:payload
            }
        case DELETE_USER_FAILED :
                return{
                    ...state,
                    type,
                    data:payload
                }
        default:
                return state;
    }
}

export default userReducer