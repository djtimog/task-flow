import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroPage from "./pages/HomePage";

function App() {
  return (
    <>
      <div>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <HeroPage />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
