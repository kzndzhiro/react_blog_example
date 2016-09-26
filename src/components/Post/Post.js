import axios from 'axios';
import Button from '../Button';
import CommentContainer from '../Comment';
import React, {Component} from 'react';
import {GET_COMMENTS_FOR_POST, SHOW_COMMENTS, HIDE_COMMENTS} from '../../utils/constants'
import './Post.css';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            showComments: false
        };
        this.toggleComments = this.toggleComments.bind(this);
    }

    toggleComments() {
        axios.get(GET_COMMENTS_FOR_POST + this.props.id)
            .then(response => {
                this.setState({
                    showComments: !this.state.showComments,
                    comments: response.data.slice(0, 10)
                });
            });

    }

    render() {
        let commentsComponent = this.state.showComments ?
            <CommentContainer comments={this.state.comments}/> : undefined;
        const commentsBtnText = this.state.showComments ? HIDE_COMMENTS : SHOW_COMMENTS;

        return (
            <article className="post">
                <section>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.body}</p>
                </section>
                <div className="buttonContainer">
                    <Button classes="button" text="Edit"/>
                    <Button classes="button error" text="Delete"/>
                    <Button classes="button success" onClick={this.toggleComments} text={commentsBtnText}/>
                </div>
                {commentsComponent}
            </article>
        );
    }
}

Post.propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired
};

export default Post;