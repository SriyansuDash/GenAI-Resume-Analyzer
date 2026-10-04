import { useState } from "react";
import "../auth.form.scss"
import { Link , useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const{loading , handleRegister} = useAuth();


  const handleSubmit = (e) =>{
    e.preventDefault();
    e.handleRegister({username , email, password});
    navigate('/');
  }

  if(loading){
    return(<main><h1>Loading...</h1></main>)
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-grp">
            <label htmlFor="username">Username</label>
            <input onChange={
              (e) => {setUsername(e.target.value)}
            } type="text" id="username" name="username" placeholder="Enter your username"/>
          </div>

          <div className="input-grp">
            <label htmlFor="email">Email</label>
            <input onChange={(e)=> {setEmail(e.target.value)}} type="email" name="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="input-grp">
            <label htmlFor="password">Password</label>
            <input onChange= {(e)=> {setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="Enter password"/>
          </div>

          <button className="button primary-button" type="submit">Register</button>
        </form>

        <p>Already have an account ? <Link to ={"/login"} className="navigate">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register