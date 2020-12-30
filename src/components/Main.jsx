import React,{useState, useEffect , useContext} from 'react'
import firebase from "../config/firebase";
import { AuthContext } from '../AuthService';

const Main = () => {
  const [ messages , setMessages ] = useState("");
  const [value , setValue] = useState("");
  const user = useContext(AuthContext);
  
  const handleSubmit = (e)=> {
    e.preventDefault();
    setMessages([
      ...messages,
      {
      user:"john",
      content:value,
      },
  ])
  console.log(messages);
  console.log(user);

  }

  return (
    <div>
      <p>Main</p>
      <form action="" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={value}
          onChange={(e => {
            setValue(e.target.value);
          })}
          />
      </form>
    </div>
  )
}

export default Main;