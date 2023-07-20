import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../layout/Loading'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading } }) => {
    let path = window.location.pathname.split("/");
    let id = "";
    if (path && path.length > 0 && path[2]) {
        id = path[2];
    }
    useEffect(() => {
        getPost(id);
    }, [getPost, id])

    return (
        <div className='mt-5 ml-4 mr-4'>
            {loading || post === null ? <Loading /> : <Fragment>
                <PostItem posts={[post]} showActions={false} />
                <CommentForm postID={post._id} />
                <div className='comments'>
                    {post?.comments.map((comment) => (<CommentItem key={comment._id} comment={comment} postID={post._id} />))}
                </div>
            </Fragment>}
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)