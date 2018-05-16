import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";
/**
 * Field component =>event handling and updating different pieces of state
 * component =>function or another component that will return JSX which will get rendered to the screen
 * field (argumnet) => containes and event handler which makes sure that <Field /> knows what element(like input) is it being responsible for
 */

class NewBlogPost extends React.Component {
  renderField({ input, label, meta: { error, touched } }) {
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    //console.log(error);
    return (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" type="text" {...input} />
        <div className="text-help">{touched && <span>{error}</span>}</div>
      </div>
    );
  }
  onSubmit(values) {
    //console.log("props", this.props);
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }
  render() {
    //console.log("props", this.props);
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="title" component={this.renderField} label="Title" />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field label="Content" name="content" component={this.renderField} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

/**
 * validate() will be called automatically when user submits form
 * validate the inputs form 'values
 * if errors is empty, the form is fine to submit
 * If errors has   *any* properties,redux form assumes form is invalid
 *  properties inside validate()and the name property in
 * <Field /> should be identical
 */

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Title required";
  }
  if (!values.categories) {
    errors.categories = "Categories required";
  }
  if (!values.content) {
    errors.content = "content required";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "NewPostForm"
})(connect(null, { createPost })(NewBlogPost));
