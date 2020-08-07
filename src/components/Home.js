import React,{useState,useEffect} from 'react';
import axios from'axios';
import {Link} from 'react-router-dom';

function Home() {
const [lists,setLists] = useState([])
const [active, setActive] =  useState({id:null,name:''})
const [editing, setEditing] = useState(false)

useEffect(()=>{
  fetchLists()
},[]) //[] means every time the page loads fetchLists() is run

//function to fetch the Employee List
const fetchLists = async() => {
  const response = await axios.get('https://kishmat-api.herokuapp.com/api/employee-list/') //aysnc is used to wait untill the data is fetched from api
  console.log(response.data)
  setLists(response.data)
}

//function to handle change in input field value
const handleChange = (e) =>{
  const title = e.target.value
  setActive({...active,name:title})
}

//function to handle the process after submiting the employee detail
const handleSubmit = async(e) =>{
  e.preventDefault() // to prevent the value of field when page refreshes
  var url = 'https://kishmat-api.herokuapp.com/api/employee-create/'
  if(editing === true){
    url = `https://kishmat-api.herokuapp.com/api/employee-update/${active.id}/`
    setEditing(false)
  }
  fetch(url, {
    method:'POST',
    headers:{
      'Content-type':'application/json',
    },
    body: JSON.stringify(active) //stringify to add the data in JSON format
  }).then((response)  => {
      fetchLists()
      setActive({id:null,name:''})
})}

//function to edit the employee detail
const startEdit = (list) => {
  console.log(list)
  setActive(list)
  setEditing(true)
}

//function to delete particular employee
const deleteEmp = (list) => {
  fetch(`https://kishmat-api.herokuapp.com/api/employee-delete/${list.id}/`, {
    method:'DELETE',
    headers:{
      'Content-type':'application/json',
    },
  }).then((response) =>{
  fetchLists()
  })
}

  return (
    <div className="container">
      
      <div id="employee-container">
      <h1 className="head text-center text-primary"><b>XYZ Company</b></h1>

        <div id="form-wrapper">
        <form onSubmit={(e) => handleSubmit(e)} id="form">
            <div className="flex-wrapper">

              {/* Input field to provide employee name */}
              <div style={{flex: 6}}>
                <input onChange={(e)=>handleChange(e)} className="form-control" value={active.name} 
                id="title" type="text" name="title" placeholder="Add employee.." />
              </div>

              {/* Button to submit the data */}
              <div style={{flex: 1}}>
                <input id="submit" className="btn btn-warning" type="submit" value="Submit" name="Add" />
              </div>

            </div>
        </form>
        </div>

        <div  id="list-wrapper">        
        {/* mapping of the particular employee in the database and displaying the data and options to read, update and delete the
        particular employee  */}

          {lists.map(function(list){
            return(
              <div key={list.id} className="employee-wrapper flex-wrapper">

              <div style={{flex:7}}>
                <p>{list.name}</p>
              </div>

              {/* Read Button */}
              <div style={{flex:1}}>
              <Link className="btn btn-sm btn-outline-info" to={`/employee-app/read/${list.id}`}>
                    View
                  </Link>
              </div>

              {/* Update Button */}
              <div style={{flex:1}}>
                <button onClick={()=>startEdit(list)} className="btn btn-sm btn-outline-info">Edit</button> 
              </div>

              {/* Delete Buttton */}
              <div style={{flex:1}}>
                <button onClick={()=>deleteEmp(list)} className="btn btn-sm btn-outline-dark delete">-</button>
              </div>

            </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
