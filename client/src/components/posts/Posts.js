import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Loading from '../layout/Loading'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    return (
        <Fragment>
            <div className='mt-5 ml-3 mr-3'>
                {loading ? <Loading /> : <>
                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'>
                        <i className='fas fa-user' /> &nbsp; Welcome to the community
                    </p>
                    <PostForm />
                    <PostItem posts={posts} />
                </>}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Posts);