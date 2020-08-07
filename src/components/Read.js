import React,{useState,useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Read = () => {
  //required state for this component
    const [emp, setEmp] = useState(
        {
            id:null,
            name:'',
        }
    )
    
    //get the param from url
    const { id } = useParams();

    useEffect(() => {
      loadUser();
    }, []);

    //function to get particular employee detail to read.
    const loadUser = async () => {
      const res = await axios.get(`https://kishmat-api.herokuapp.com/api/employee-read/${id}/`);
      console.log(res.data)
      setEmp(res.data);
    };

    return (
        <div className='container'>
          <div id="employee-container">
            <div id="form-wrapper pb-0">
              <Link className="btn btn-primary mb-3" to="/employee-app">
              back to Home
              </Link>
              <h2 className="ml-3">Detail of Employee : </h2>
              <hr></hr>
            </div>
            <div id="list-wrapper pt-0">
              <div className="employee-wrapper flex-wrapper">
                <div style={{flex:7}}>
                  <h4>Id : {emp.id}</h4>
                  <h4>Name : {emp.name}</h4>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      
    )
}

export default Read
