import { Route, Routes } from "react-router-dom";
import CreateBook from "./CreateBook/CreateBook";
import UserList from "./UserList/UserList";
import AdminMenu from "./AdminMenu/AdminMenu";
import "./Admin.css";

function Admin() {
  return (
    <div className="admin-div">
      <AdminMenu />
      <Routes>
        <Route path="/add" element={<CreateBook />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default Admin;
