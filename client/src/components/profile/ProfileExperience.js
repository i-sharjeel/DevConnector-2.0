import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({ profile: { experience } }) => {
    return (
        <div class="profile-exp bg-white p-2" style={{ width: "47vw" }}>
            <h2 class="text-primary"><strong>Experience</strong></h2>
            {experience ? experience.map((exp, i) => {
                return <div key={i}>
                    <h3 class="text-dark">{exp.company}</h3>
                    <p><Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
                        exp.to === null ? "Now" : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
                    </p>
                    <p><strong>Position: </strong>{exp.title}</p>
                    <p>
                        <strong>Description: </strong>{exp.description}
                    </p>
                </div>
            }) : <Fragment>
                <h2>No Experience Credentials</h2>
            </Fragment>}
        </div>
    )
}

export default ProfileExperience