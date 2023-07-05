import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Warning from '../layout/Warning';

const Login = ({ login, isAuthenticated }) => {
    const navigate = useNavigate();

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
        const email = formData.email;
        const password = formData.password;
        login({ email, password });
    }

    if (isAuthenticated) {
        navigate("/dashboard");
    }

    return (
        <>
            <section className="container">
                <Warning />
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);