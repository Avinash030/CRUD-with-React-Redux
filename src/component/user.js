import React from "react"
import { Button, Container, Form, Table, Modal } from 'react-bootstrap';
import {
    GET_USER_SUCCESSED,
    GET_USER_FAILED,
    SAVE_USER_SUCCESSED,
    SAVE_USER_FAILED,
    DELETE_USER_SUCCESSED,
    DELETE_USER_FAILED
} from "../action/userAction"
import './css/user.css';
import { UserTable } from "./userTable";

export default class User extends React.Component{
    constructor(){
        super()
        this.state={
            name:"",
            mobile:"",
            id:"",
            allData:[],
            isUpdate:false,
            showModel:false,
            search:"",
            allUserData:[],
            mobileErrMsg:"",
            nameErrMsg:""
        }
    }
    componentDidMount(){
        this.props.getUserData()
    }
    componentWillReceiveProps(nextProps){
        const {type,data} = nextProps
        switch(type){
            case GET_USER_SUCCESSED :
                this.setState({allData:data,allUserData:data})
                break
            case GET_USER_FAILED :
                alert("Server error")
                break
            case SAVE_USER_SUCCESSED :
                this.setState({isUpdate:false,name:"",mobile:"",id:"",showModel:false})
                this.props.getUserData()
               // alert("Save Success")
                break
            case SAVE_USER_FAILED :
                alert("Server error")
                break
            case DELETE_USER_SUCCESSED :
                this.props.getUserData()
               // alert("Delete Success")
                break
            case DELETE_USER_FAILED :
                alert("Server error")
                break
        }
    }
    save=()=>{
        const {name,mobile} = this.state
        let userData={
            name:name,
            mobile:mobile
        }
        if(this.validation()){
        this.props.saveUserData(userData)
        }
    }
    delete=(user)=>{
        let cnfm = window.confirm("Are You Sure !")
        if(cnfm){
       this.props.deleteUserData(user.userId)
        }
    }
    edit=(user)=>{
        this.setState({
            name:user.name,
            mobile:user.mobile,
            id:user.userId,
            isUpdate:true,
            showModel:true
        })
    }
    update=()=>{
        let userData={
            name:this.state.name,
            mobile:this.state.mobile,
            userId:this.state.id
        }
        if(this.validation()){
            this.props.saveUserData(userData)
        }
    }
    handleInput=(e)=>{
        this.validation()
        this.setState({[e.target.name]:e.target.value})
    }
    handleSearch=(e)=>{
        let inptData = e.target.value
        let inptType = typeof inptData
        let inptValue
          if(inptType === "string"){
            inptValue = inptData.toLowerCase()
          }else{
              inptValue = inptData
          }
        this.setState({search:e.target.value})
        let allUser = this.state.allData
      let filteredData  = allUser.filter(x=>x.name.toLowerCase().includes(inptValue) || x.mobile.includes(inptValue))
        this.setState({allUserData:filteredData})
    }
    handleClose = () => {
        this.setState({isUpdate:false,name:"",mobile:"",id:"",showModel:false,nameErrMsg:"",mobileErrMsg:""})
    }
    handleShow = () => {
        this.setState({showModel:true})
    }
    validation=()=>{
        const {name,mobile} = this.state
        let isNameActive=false,isMobileActive=false
        this.setState({nameErrMsg:"",mobileErrMsg:""})
        if(!name){
            this.setState({nameErrMsg:"Please Enter Name"})
            isNameActive=false
        } else if(name.length < 3){
            this.setState({nameErrMsg:"Name Should be minimum 3 Charactor"})
            isNameActive=false
        } else{
            this.setState({nameErrMsg:""})
            isNameActive = true
        }
        if(!mobile){
            this.setState({mobileErrMsg:"Please Enter Mobile No."})
            isMobileActive = false
        } else if(mobile.toString().length < 10 || mobile.toString().length > 10){
            this.setState({mobileErrMsg:"Mobile No. Should be 10 digits"})
            isMobileActive = false
        } else{
            this.setState({mobileErrMsg:""})
            isMobileActive = true
        }
        if(isNameActive && isMobileActive)
        return true
    }

    render(){
        const {allUserData,allData,isUpdate,showModel,mobileErrMsg,nameErrMsg} = this.state
        return(
           <Container>
            <h2 className="text-center welcome-color">Welcome User</h2>
            <Button className="float-right margin-btm-10" variant="success" onClick={this.handleShow}>
                Create User
            </Button>
            <Modal show={showModel} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={this.handleInput} name="name" value={this.state.name} placeholder="Enter name"  />
            </Form.Group>
            <Form.Text className="text-error">
               {nameErrMsg}
            </Form.Text>

            <Form.Group className="mb-3">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="number" maxLength={10} onChange={this.handleInput} name="mobile" value={this.state.mobile} placeholder="Enter mobile no." />
            </Form.Group>
            <Form.Text className="text-error">
                {mobileErrMsg}
            </Form.Text>
            <div className="col-md-12 text-center">
            {!isUpdate ?
                <Button variant="primary" onClick={this.save}>Save user</Button>
                :
                <Button variant="primary" onClick={this.update}>Update user</Button>
                }
            </div>
            </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <UserTable 
            allUserData={allUserData}
            allData={allData}
            handleSearch={this.handleSearch}
            search={this.state.search}
            edit={this.edit}
            deleteUser={this.delete}
            />
          </Container>
        )
    }
}