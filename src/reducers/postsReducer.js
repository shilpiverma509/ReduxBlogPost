import _ from "lodash";
import { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from "../actions";

/**
 * we need to convert the list of object of posts to object of posts
 * with id as key and object as value
 * using _.mapKeys for pulling off the id property
 * of the individual object
 */

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // console.log("action", action);
      return _.mapKeys(action.payload.data, "id");
    // case CREATE_POST:
    // return
    case FETCH_POST:
      /**
       * const post = action.payload.data;
       * const newState = {...state};
       * newState[post.id] = post;
       * return newState;
       */
      return {
        //[es6 syntax to make a new key]
        ...state,
        [action.payload.data.id]: action.payload.data
      };
    /**
     * omit takes in state object and action.payload ==id which is the key
     * if state object has a key of post's id , just drop it
     */
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
