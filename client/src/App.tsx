import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <AppRouter />
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
