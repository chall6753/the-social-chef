import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
function Login({onLogin}) {
const[username,setUsername]=useState('')
const[password,setPassword]=useState('')
const navigate = useNavigate()

function onSubmit(e){
  e.preventDefault()

  fetch('/api/login',{
    method: 'POST',
    headers: {"Content-Type": 'application/json'},
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
    .then(res => {
      if(res.ok){
        res.json().then(user => onLogin(user))
        navigate('/') 
      }
      else{
        res.json().then(res => alert(res.errors))
      }
    }
  )
}
  return (
    <div>
      <h1>Login</h1>
        
        <form onSubmit={onSubmit}> 
            <label>username: </label>
            <input type='text' onChange={e => setUsername(e.target.value)}></input>
            <label>password: </label>
            <input type='password' onChange={e => setPassword(e.target.value)}></input>
            <button>login</button>
        </form>
    </div>
  );
}
export default Login;