import React, { useState } from 'react'
import withRouter from '../routing/WithRouter'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ navigate, addExperience }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        currect: false,
        description: ''
    })

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        addExperience(formData, navigate)
    }
    return (
        <div><section className="container">
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" vlaue={location} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={() => {
                        setFormData({ ...formData, current: !current });
                        setToDateDisabled(!toDateDisabled);
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" disabled={toDateDisabled ? true : false} value={to} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </section></div>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))