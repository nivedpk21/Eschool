import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import StudentData from "./pages/admin/StudentData";
import AddStudent from "./pages/admin/AddStudent";
import ViewStudent from "./pages/admin/ViewStudent";
import EditStudent from "./pages/admin/EditStudent";
import Profile from "./pages/admin/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/student-data" element={<StudentData />}></Route>
        <Route path="/add-student" element={<AddStudent />}></Route>
        <Route path="/view-student/:id" element={<ViewStudent />}></Route>
        <Route path="/edit-details/:id" element={<EditStudent />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
