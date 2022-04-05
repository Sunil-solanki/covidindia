import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import "./Layout.css";

const Layout = (props : any) => {
  return (
    <Fragment>
      <MainNavigation />
      <div>{props.children}</div>
    </Fragment>
  );
};

export default Layout;
