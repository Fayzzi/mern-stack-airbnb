import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import BotpressChat from "../Pages/Chatbot/Chatbot";

export default function Layout() {
  return (
    <div className="md:mx-24 lg:mx-24   flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <BotpressChat />
    </div>
  );
}
