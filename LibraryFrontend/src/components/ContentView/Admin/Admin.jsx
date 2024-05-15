import { Route, Routes } from "react-router-dom";
import CreateBook from "./CreateBook/CreateBook";
import UserList from "./UserList/UserList";
import AdminMenu from "./AdminMenu/AdminMenu";
import EditBook from "./EditBook/EditBook";
import CreateMultipleBooks from "./CreateMultipleBooks/CreateMultipleBooks";

function Admin() {
  return (
    <div>
      <AdminMenu />
      <Routes>
        <Route path="/add" element={<CreateBook />} />
        <Route path="/add/multiple" element={<CreateMultipleBooks />} />
        <Route path="/books/edit" element={<EditBook />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default Admin;
