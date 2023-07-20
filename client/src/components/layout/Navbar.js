import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li className='mr-1'><Link to="/Dashboard"><span className='hide-sm'>Dashboard</span></Link></li>
            <li className='mr-1'><Link to="/Profiles">Developers</Link></li>
            <li className='mr-1'><Link to="/Posts"><span className='hide-sm'>Posts</span></Link></li>
            <li><Link onClick={logout}><i className='fas fa-sign-out-alt' /><span className='hide-sm'> Logout</span></Link></li>
        </ul>);

    const guestsLinks = (
        <ul>
            <li><Link to="/Profiles">Developers</Link></li>
            <li><Link to="/Register">Register</Link></li>
            <li><Link to="/Login">Login</Link></li>
        </ul>);

    return (
        <div>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                {!loading && <Fragment>
                    {isAuthenticated ? authLinks : guestsLinks}
                </Fragment>}
            </nav >
        </div >
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)