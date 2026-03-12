import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        <AppRouter />
      </main>

      <Footer />

    </div>
  );
};

export default App;
