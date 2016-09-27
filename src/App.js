import {GET_POSTS_ENDPOINT} from './utils/constants';
import PostsContainer from './components/Post';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(id) {
        return () => {
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
        };
    }

    componentDidMount() {

        fetch(GET_POSTS_ENDPOINT)
            .then(response => {
                response.json()
                    .then(data => this.setState({posts: data.slice(0, 20)}))

            });
    }

    render() {
        return (
            <main className="app" role="main">
                <h1>My Awesome Blog</h1>
                <PostsContainer posts={this.state.posts} onDelete={this.onDelete}/>
            </main>
        );
    }
}

export default App;
