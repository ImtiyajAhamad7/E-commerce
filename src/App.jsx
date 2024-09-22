import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header />
      {/* <ProductList /> */}
      <main className="container mt-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default App;
