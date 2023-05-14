import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import ChatBot from "./ChatBot";

const PageLayout = () => (
  <>
    <NavBar />
    <ChatBot />
    <Outlet />
  </>
);

export default PageLayout;
