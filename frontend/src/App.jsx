import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsX";
import Login from "./pages/Login.jsX";
import Dashboard from "./pages/Dashboard.jsX";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
