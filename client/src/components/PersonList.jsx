import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/PersonList.css";
import { changeStatusListener } from "../features/globalValues/globalSlice";
import { store } from "../store";
import { useDispatch, useSelector } from "react-redux";
import {fetchPerson} from "../features/globalValues/globalSlice";
import { toast } from "react-toastify";


const url = "http://localhost:3000/api/v1/people";

const PersonList = () => {

  const [ people, setPeople ] = useState([]);
  const { statusListener } = useSelector((state) => state.globalValues);

  const dispatch = useDispatch();


  const fetchData = async () => {
    
    try{
      // saljemo get(default) request
      const response = await axios(url);
      const data = response.data;
      setPeople(data.people);
    }catch(error){
      console.log(error);
    }
  }

  const deletePerson = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/people/${id}`);
      store.dispatch(changeStatusListener());
      toast.success("Person successfully deleted");
    } catch (error) {
      toast.error(error.message); 
    }

  }

  const enterUpdateState = async (id) => {
    try{
      const response = await axios(`http://localhost:3000/api/v1/people/${id}`);
      const data = await response.data;
      dispatch(fetchPerson(data));
    }catch(error){
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchData(url);
  }, [statusListener])

  return (
    <div className="person-list-main">
      <ul>
        { people.map(item => (
        <li key={item._id}>
        <p>{ item.name }</p>
        <p>{ item.email }</p>
        <div className="person-list-btn-div">
          <button onClick={() => deletePerson(item._id)}>Delete</button>
          <button onClick={() => enterUpdateState(item._id)}>Update</button>
        </div>
      </li>
        )) }
      </ul>
    </div>
  );
};

export default PersonList;
