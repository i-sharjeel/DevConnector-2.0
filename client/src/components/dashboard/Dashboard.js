import React, { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import loader from '../../img/loading.json'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import Loading from '../layout/Loading'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(() => {
        getCurrentProfile()
    }, [])


    return <>
        {loading && profile === null
            ? <Loading />
            : <Fragment>
                <div className='mr-4 ml-4'>
                    <h1 className='large text-primary'>Dashboard</h1>
                    <p className='lead'>
                        <i className='fas fa-user' />Welcome {user && user.name}
                    </p>
                    {profile !== null ?
                        ""
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
    </>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);