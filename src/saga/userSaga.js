import {takeEvery,call,put} from "redux-saga/effects"
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

const getUserApi=(data)=>{
 let users = JSON.parse(localStorage.getItem("userInfo"))
return users
}

function* getUserSaga({payload}){
try{
const res = yield call(getUserApi,payload)
yield put({
    type:GET_USER_SUCCESSED,
    payload:res
})
}catch(err){
yield put({
    type:GET_USER_FAILED,
    payload:err
})
}
}
const saveUserApi=(data)=>{
    let userData = "" 
    let user = []
    let new_data=""
    userData = JSON.parse(localStorage.getItem("userInfo"))
    if(userData && userData.length && !data.userId){
        let userId = Math.floor(Math.random() * 100)
        new_data = {...data,userId:userId}
        userData = [...userData,new_data]
        localStorage.setItem("userInfo",JSON.stringify(userData))

    } else if(!userData || userData.length==0 ){
        let userId = Math.floor(Math.random() * 100)
        data = {...data,userId:userId}
        user.push(data)
        localStorage.setItem("userInfo",JSON.stringify(user))

    } else if(data.userId){
        let updatedUser = userData.map(x=>x.userId == data.userId ? {...x,name:data.name,mobile:data.mobile}:x)
        localStorage.setItem("userInfo",JSON.stringify(updatedUser))
    }
    return data
    }
    
    function* saveUserSaga({payload}){
    try{
    const res = yield call(saveUserApi,payload)
    yield put({
        type:SAVE_USER_SUCCESSED,
        payload:res
    })
    }catch(err){
    yield put({
        type:SAVE_USER_FAILED,
        payload:err
    })
    }
    }

    const deleteUserApi=(userId)=>{
        let userData = JSON.parse(localStorage.getItem("userInfo"))
        if(userData && userData.length){
         let UpdUser =  userData.filter(x=>x.userId !== userId)
         localStorage.setItem("userInfo",JSON.stringify(UpdUser))
        }
        }
        
        function* deleteUserSaga({payload}){
        try{
        const res = yield call(deleteUserApi,payload)
        yield put({
            type:DELETE_USER_SUCCESSED,
            payload:res
        })
        }catch(err){
        yield put({
            type:DELETE_USER_FAILED,
            payload:err
        })
        }
        }

function* userSaga(){
   yield takeEvery(GET_USER_REQUESTED,getUserSaga)
   yield takeEvery(SAVE_USER_REQUESTED,saveUserSaga)
   yield takeEvery(DELETE_USER_REQUESTED,deleteUserSaga)
}

export default userSaga