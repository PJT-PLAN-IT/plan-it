import { Header } from "./components/Header";
import AppRoutes from "./routes/Routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useLocation } from "react-router-dom"
import TestList from "./components/tripplan/TestList.jsx";

function App() {
    const location = useLocation();
    const noHeaderRoutes = ['/trip-plan'];

  return (
    <>
      <div className="mx-[300px]">
          { !noHeaderRoutes.includes(location.pathname) && <Header />}
      </div>
        <TestList/>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
