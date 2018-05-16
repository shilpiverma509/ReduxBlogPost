import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducers";
import BlogPosts from "./components/BlogPosts";
import ReduxPromise from "redux-promise";
import ShowPost from "./components/ShowPost";
import NewBlogPosts from "./components/NewBlogPosts";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={BlogPosts} />
          <Route path="/posts/new" exact component={NewBlogPosts} />
          <Route path="/posts/:id" exact component={ShowPost} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);

//          <Route path="/posts/:id" component={PostShow} />
