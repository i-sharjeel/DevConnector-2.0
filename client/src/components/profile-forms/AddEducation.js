import React, { useState } from 'react'
import withRouter from '../routing/WithRouter'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ navigate, addEducation }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        currect: false,
        description: ''
    })

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const { school, degree, fieldOfStudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        addEducation(formData, navigate)
    }
    return (
        <div><section className="container">
            <h1 className="large text-primary">
                Add An Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any School/College
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* School Name" name="school" value={school} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} required onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldOfStudy" vlaue={fieldOfStudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={() => {
                        setFormData({ ...formData, current: !current });
                        setToDateDisabled(!toDateDisabled);
                    }} /> Current School</p>
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
                        placeholder="Program Description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
            </form>
        </section></div>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))