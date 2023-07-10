import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// // ..rest means anything else that is passed in
// const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
//     // if the user is not authenticated, navigate to the login screen else load the component
//     <Route {...rest} render={props => !isAuthenticated && !loading ? (<Navigate to={"/login"} />) : <Component {...props} />} />
// )
const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
    if (!isAuthenticated && !loading) {
        return <Navigate to={"/login"} replace />
    }
    return <Outlet />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)