import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addPost, getPosts } from '../../actions/post'

const PostForm = ({ addPost, getPosts }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <div class="post-form">
                <div class="bg-primary p">
                    <h3>Post your thoughts</h3>
                </div>
                <form class="form my-1" onSubmit={e => {
                    e.preventDefault();
                    addPost({ text });
                    setText('');
                    getPosts();
                }}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Say something..."
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

export default connect(null, { addPost, getPosts })(PostForm)