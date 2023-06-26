import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });


    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <section className="container">
                {/* <div className="alert alert-danger">
                    Invalid credentials
                </div> */}
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={(e) => {
                    onSubmit(e)
                }}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            onChange={(e) => {
                                onchange(e);
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => {
                                onchange(e);
                            }}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/Register">Sign Up</Link>
                </p>
            </section>
        </>
    )
}

export default Login