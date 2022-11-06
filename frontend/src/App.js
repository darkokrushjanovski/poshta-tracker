import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Packages from "./pages/Packages";
import CreatePackage from "./pages/CreatePackage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navigation />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/create-package" element={<CreatePackage />} />
      </Routes>
    </Router>
  );
}

export default App;
