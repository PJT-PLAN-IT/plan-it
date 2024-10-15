import { Header } from "./components/Header";
import AppRoutes from "./routes/Routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const noHeaderRoutes = ["/plan"];

  return (
    <>
      <AuthProvider>
        <div className="mx-[300px]">
          {!noHeaderRoutes.includes(location.pathname) && <Header />}
        </div>

        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
