import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Login from "./pages/login";
import VerifyCode from "./pages/verifyCode";
import "./styles/main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<VerifyCode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
