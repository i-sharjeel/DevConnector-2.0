import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { addLike, removeLike, deletePost } from '../../actions/post'
import Warning from '../layout/Warning'
import PropTypes from 'prop-types'

const PostItem = ({ posts, auth, addLike, removeLike, deletePost, showActions }) => {
    return (
        <Fragment>
            <Warning />
            {posts.map((post, index) => {
                return (<>
                    {!showActions && <h2 className='large text-primary mb-3'>Post & Comments</h2>}
                    <div key={index} className="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/Profile/${post.user}`}>
                                <img className="round-img" src={post.avatar} alt="" />
                                <h4>{post.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">
                                {post.text}
                            </p>
                            <p className="post-date">Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment></p>
                            {showActions && <Fragment>
                                <button type="button" className="btn btn-light" onClick={() => {
                                    addLike(post._id)
                                }}>
                                    <i className="fas fa-thumbs-up"></i> &nbsp;&nbsp;
                                    <span>{post.likes?.length}</span>
                                </button>
                                <button type="button" className="btn btn-light" onClick={() => {
                                    removeLike(post._id)
                                }}>
                                    <i className="fas fa-thumbs-down"></i>
                                </button>
                                <Link to={`/Post/${post._id}`} className="btn btn-primary">
                                    Discussion <span className='comment-count'> &nbsp;&nbsp;{post.comments?.length}</span>
                                </Link>
                                {!auth.loading && post.user === auth.user._id && (
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        deletePost(post._id)
                                    }} >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                            </Fragment>}
                        </div>
                    </div>
                </>)
            })}
        </Fragment >
    )
}

PostItem.defaultProps = {
    showActions: true,
}

const mapStateToProps = state => ({
    auth: state.auth
})

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    removeLike: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    showActions: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)