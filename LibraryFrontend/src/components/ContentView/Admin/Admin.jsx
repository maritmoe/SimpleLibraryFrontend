import { Route, Routes } from "react-router-dom";
import CreateBook from "./CreateBook/CreateBook";
import UserList from "./UserList/UserList";
import AdminMenu from "./AdminMenu/AdminMenu";
import EditBook from "./EditBook/EditBook";
import CreateMultipleBooks from "./CreateMultipleBooks/CreateMultipleBooks";
import BorrowingsList from "./BorrowingsList/BorrowingsList";

function Admin() {
  return (
    <div>
      <AdminMenu />
      <Routes>
        <Route path="/add" element={<CreateBook />} />
        <Route path="/add/multiple" element={<CreateMultipleBooks />} />
        <Route path="/books/edit" element={<EditBook />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/borrowings" element={<BorrowingsList />} />
      </Routes>
    </div>
  );
}

export default Admin;
