import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import Warning from '../layout/Warning';
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';
import Loading from '../layout/Loading'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])


    return <div className='mt-5 mr-4 ml-4'>
        <Warning />
        {loading && profile === null
            ? <Loading />
            : <Fragment>
                <div>
                    <h1 className='large text-primary'>Dashboard</h1>
                    <p className='lead mt-2'>
                        <i className='fas fa-user'>&nbsp;&nbsp;</i>Welcome {user && user.name}
                    </p>
                    {profile !== null ?
                        <>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />

                            <div className='my-2'>
                                <button className='btn btn-danger' onClick={() => {
                                    deleteAccount()
                                }}>
                                    <i className='fas fa-user-minus' /> &nbsp;&nbsp;&nbsp;Delete Account
                                </button>
                            </div>
                        </>
                        : <Fragment>
                            <p>You have not yet setup a profile yet, please create a profile.</p>
                            <button className='btn btn-primary mt-1' onClick={() => {
                                navigate("/create-profile")
                            }}>
                                Create Profile
                            </button>
                        </Fragment>}
                </div>
            </Fragment>}
    </div>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);