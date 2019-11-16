import React from "react";

const NotFound = props => {
  if (props.staticContext) {
    props.staticContext.NOT_FOUND = true;
  }
  return <div>404</div>;
};

export default NotFound;
