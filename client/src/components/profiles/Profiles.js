import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Loading from '../layout/Loading'
import ProfileItem from './ProfileItem'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles])

    return (
        <Fragment>
            <div className="mt-5 ml-3 mr-3">
                {loading ? <Loading /> : <div>
                    <h1 className='large text-primary'><b>Developers</b></h1>
                    <p className='lead mb-3'>
                        <i className='fab fa-connectdevelop' /> &nbsp;&nbsp;<b>Browse and connect with developers</b>
                    </p>
                    <div>
                        {profiles && profiles.length > 0 ? profiles.map((x) => {
                            return (<>
                                <ProfileItem key={x._id} profile={x} />
                            </>)
                        }) : <h4>No Profiles Found....</h4>}
                    </div>
                </div>}
            </div>
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);