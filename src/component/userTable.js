import React from "react"
import { Button, Table} from 'react-bootstrap';

export const UserTable=({allUserData,allData,handleSearch,search,edit,deleteUser})=>{
return(
    <>
    {allData.length ? <input type="text" onChange={handleSearch} name="search" value={search} placeholder="Search with name/mobile"  />:""}
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
                <td><Button size="sm" variant="info" onClick={()=>edit(x)}>Edit</Button> <Button size="sm" variant="danger" onClick={()=>deleteUser(x)}>Delete</Button></td>
                </tr>
            ): <h4 className="text-center no-data-found">No data found</h4>}
            </tbody>
            </Table>
    </>
)
}