import "../auth.form.scss"
import { Link , useNavigate } from "react-router";

const Register = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate('/');
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-grp">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username"/>
          </div>

          <div className="input-grp">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="input-grp">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter password"/>
          </div>

          <button className="button primary-button" type="submit">Register</button>
        </form>

        <p>Already have an account ? <Link to ={"/login"} className="navigate">Login</Link> </p>
      </div>
    </main>
  )
}

export default Register