import React from 'react'
import "../auth.form.scss"

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form>
                <div className="input-grp">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter email adress" />
                </div>
                <div className="input-grp">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" />
                </div>
                <button className="button primary-button">Submit</button>
            </form>
        </div>
    </main>
  )
}

export default Login