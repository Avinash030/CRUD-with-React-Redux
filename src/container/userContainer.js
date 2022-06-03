import {connect} from "react-redux"
import {
    getUser as getUserAction,
    saveUser as saveUserAction,
    deleteUser as deleteUserAction
} from "../action/userAction"
import User from "../component/user"

const mapStateToProps=({userReducer})=>({
...userReducer
})

const mapDispatchToProps=(dispatch)=>({
    getUserData: (data) => dispatch(getUserAction(data)),
    saveUserData: (data) => dispatch(saveUserAction(data)),
    deleteUserData: (data) => dispatch(deleteUserAction(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(User)