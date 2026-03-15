
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AppRouter from "./routes/AppRouter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <AppRouter />
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;