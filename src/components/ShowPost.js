import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSinglePost, deletePost } from "../actions/index";
import { Link } from "react-router-dom";

class PostShow extends Component {
  componentDidMount() {
    //if you haven't already fetched a post
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchSinglePost(id);
    }
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      return this.props.history.push("/");
    });
  }
  render() {
    const { post } = this.props;

    if (!post) {
      return <div>...Loading</div>;
    }
    return (
      <div>
        <Link to="/" className="btn btn-primary">
          Back
        </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete
        </button>
        <h3>{post.title}</h3>
        <h6>Categories:{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  console.log("ownprops", ownProps);
  return { post: posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(
  PostShow
);
