import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postID, addComment }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <div class="post-form">
                <form class="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addComment(postID, { text });
                    setText('');
                }}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Leave a comment..."
                        required
                        onChange={e => { setText(e.target.value) }}
                        value={text}
                    ></textarea>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" />
                </form>
            </div>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)