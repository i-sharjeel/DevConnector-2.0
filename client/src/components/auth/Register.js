import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { createUser } from '../general-utils';
import PropTypes from 'prop-types';
import Warning from '../layout/Warning';

const Register = ({ setAlert }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const { name, email, password, passwordConfirm } = formData;

    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setAlert('Please enter correct password', 'danger')
        }
        else {
            const newUser = {
                name,
                email,
                password
            }
            const response = await createUser(newUser);
            if (response) {
                alert('User created successfully');
            }
        }
    }

    return (
        <Fragment>
            <section className="container">
                <Warning />
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={(e) => {
                    onSubmit(e);
                }}>
                    <div className="form-group">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => {
                            onchange(e);
                        }} required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => {
                            onchange(e);
                        }} />
                        <small className="form-text">This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                onchange(e);
                            }}
                            name="password"
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="passwordConfirm"
                            onChange={(e) => {
                                onchange(e);
                            }}
                            minLength="6"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/Login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(Register);