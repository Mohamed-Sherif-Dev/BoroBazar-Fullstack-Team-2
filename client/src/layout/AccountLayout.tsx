import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/account/AccountSidebar";
// import AccountSidebar from "../features/account/components/AccountSidebar";

export default function AccountLayout() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-6xl mx-auto flex gap-6">

        <AccountSidebar />

        <div className="flex-1 bg-white rounded-lg shadow p-6">

          <Outlet />

        </div>

      </div>

    </div>
  );
}