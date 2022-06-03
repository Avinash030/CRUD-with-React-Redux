export const GET_USER_REQUESTED = "GET_USER_REQUESTED"
export const GET_USER_SUCCESSED = "GET_USER_SUCCESSED"
export const GET_USER_FAILED = "GET_USER_FAILED"

export const getUser = (data) =>(
    {
        type:GET_USER_REQUESTED,
        payload:data
    }
)
export const SAVE_USER_REQUESTED = "SAVE_USER_REQUESTED"
export const SAVE_USER_SUCCESSED = "SAVE_USER_SUCCESSED"
export const SAVE_USER_FAILED = "SAVE_USER_FAILED"

export const saveUser = (data) =>(
    {
        type:SAVE_USER_REQUESTED,
        payload:data
    }
)
export const DELETE_USER_REQUESTED = "DELETE_USER_REQUESTED"
export const DELETE_USER_SUCCESSED = "DELETE_USER_SUCCESSED"
export const DELETE_USER_FAILED = "DELETE_USER_FAILED"

export const deleteUser = (data) =>(
    {
        type:DELETE_USER_REQUESTED,
        payload:data
    }
)
