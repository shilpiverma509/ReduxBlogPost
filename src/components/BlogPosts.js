import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import { Link } from "react-router-dom";

/** _.map()
 * first argument is object or array
 * second argument is the function which will return some jsx
 * to render to the ui
 */

class BlogPosts extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li key={post.id} className="list-group-item">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            New Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(BlogPosts);

/**
 * mapDispatchToProps () to wire up an action creator
 * instead
 * we will pass the action creator inside of an object as second argument
 * These both are completely identical.We still have acess to this.props.fetchPosts
 *
 */
