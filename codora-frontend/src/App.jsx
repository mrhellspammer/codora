
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import RegistrationForm from "./pages/RegistrationForm";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseContent from "./pages/CourseContent";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// comp
import Navbar from "./comp/Navbar";



function App() {

  return (
    <>
    <Router>
      <div className="">

      <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseContent />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
