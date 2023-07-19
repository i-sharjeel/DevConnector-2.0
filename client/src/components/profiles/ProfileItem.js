import React from 'react'
import { Link } from 'react-router-dom'

const ProfileItem = ({ key, profile: { user: { _id, name, avatar }, status, company, location, skills } }) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt="dp" className='round-img' />
            <div className='set-display-flex justify-content-space-between'>
                <div>
                    <h2>{name}</h2>
                    <p>{status} {company && <span> at {company}</span>}</p>
                    <p className='mb-1'>{location && <span>{location}</span>}</p>
                    <Link to={`/Profile/${_id}`} className="btn btn-primary">View Profile</Link>
                </div>
                <ul>
                    {skills?.slice(0, 4).map((skill, index) => {
                        return (<>
                            <li key={index} className="text-primary">
                                <i className='fas fa-check'></i> &nbsp;&nbsp;{skill}
                            </li>
                        </>)
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ProfileItem;