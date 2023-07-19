import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({ profile: { education } }) => {
    return (
        <div class="profile-exp bg-white p-2" style={{ width: "47vw" }}>
            <h2 class="text-primary"><strong>Education</strong></h2>
            {education ? education.map((exp, i) => {
                return <div key={i}>
                    <h3 class="text-dark">{exp.school}</h3>
                    <p><Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                        exp.to === null ? "Now" : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
                    </p>
                    <p><strong>Degree: </strong>{exp.degree}</p>
                    <p><strong>Field of study: </strong>{exp.fieldOfStudy}</p>
                    <p>
                        <strong>Description: </strong>{exp.description}
                    </p>
                </div>
            }) : <Fragment>
                <h2>No Education Credentials</h2>
            </Fragment>}
        </div>
    )
}

export default ProfileEducation; 