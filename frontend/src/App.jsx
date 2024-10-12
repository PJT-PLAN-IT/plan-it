import { Header } from "./components/Header";
import AppRoutes from "./routes/Routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <>
      <div className="mx-[300px]">
        <Header />
      </div>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
