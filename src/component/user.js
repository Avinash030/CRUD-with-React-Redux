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
            allUserData:[]
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
        if(name && mobile)
        this.props.saveUserData(userData)
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
       this.props.saveUserData(userData)
    }
    handleInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSearch=(e)=>{
        this.setState({search:e.target.value})
        let allUser = this.state.allData
      let filteredData  = allUser.filter(x=>x.name.includes(e.target.value) || x.mobile.includes(e.target.value))
        console.log(filteredData,"???")
        this.setState({allUserData:filteredData})
    }
    handleClose = () => {
        this.setState({showModel:false})
    };
    handleShow = () => {
        this.setState({showModel:true})
    };

    render(){
        const {allUserData,isUpdate,showModel} = this.state
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

            <Form.Group className="mb-3">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control type="number" maxLength={10} onChange={this.handleInput} name="mobile" value={this.state.mobile} placeholder="Enter mobile no." />
            </Form.Group>
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
            <input type="text" onChange={this.handleSearch} name="search" value={this.state.search} placeholder="Search with name/mobile"  />
            <Table className="mrg-top-10" striped bordered size="sm">
            <thead>
                <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Mobile No.</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {allUserData && allUserData.length ? allUserData.map((x,index)=>
                <tr key={x.userId}>
                <td>{index+1}</td>
                <td>{x.name}</td>
                <td>{x.mobile}</td>
                <td><Button size="sm" variant="info" onClick={()=>this.edit(x)}>Edit</Button> <Button size="sm" variant="danger" onClick={()=>this.delete(x)}>Delete</Button></td>
                </tr>
            ): <h4 className="text-center no-data-found">No data found</h4>}
            </tbody>
            </Table>
          </Container>
        )
    }
}