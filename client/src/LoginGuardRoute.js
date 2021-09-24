import { Route, Redirect } from "react-router-dom";

const LoginGuardRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={(routeProps) => {
      const token = localStorage.getItem("user");

      return token ? <Redirect to="/home" /> : <Component {...routeProps} />;
    }}
  />
);

export default LoginGuardRoute;
