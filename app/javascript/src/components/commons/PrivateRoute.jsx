import React from "react";

import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import Login from "components/EUI/Login";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  siteName,
  ...props
}) => {
  if (!condition) {
    return (
      <Route
        render={() => <Login siteName={siteName} />}
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route component={Component} path={path} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
