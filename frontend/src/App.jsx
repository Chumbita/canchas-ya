import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import './styles/base/variables.css';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
