import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../layout/Loading'
import { getProfileByID } from '../../actions/profile'
import ProfileMain from './ProfileMain'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'

const Profile = ({ getProfileByID, profile: { profile, loading }, auth }) => {
    let path = window.location.pathname.split("/");
    let id = "";
    if (path && path.length > 0 && path[2]) {
        id = path[2];
    }
    useEffect(() => {
        getProfileByID(id);
    }, [getProfileByID, id])

    return (
        <Fragment>
            <div className="mt-4">
                {loading || profile === null ? <Loading /> : <Fragment>
                    <div class="profile-grid my-1">
                        <ProfileMain profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <ProfileExperience profile={profile} />
                            <ProfileEducation profile={profile} />
                        </div>
                    </div>
                </Fragment>}
            </div>
        </Fragment>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByID: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByID })(Profile)