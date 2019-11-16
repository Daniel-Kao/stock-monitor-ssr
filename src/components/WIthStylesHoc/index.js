import React from 'react';

export default (DecoratedComponent, styles) => {
  console.log(DecoratedComponent);
  console.log(styles);
  return function(props) {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }
    return <DecoratedComponent {...props} />;
  };
};
