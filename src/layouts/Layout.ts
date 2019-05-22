import { RouteComponentProps } from "react-router";

type Layout = (props: {
  children: any;
  routeComponentProps: RouteComponentProps;
}) => JSX.Element;

export default Layout;
