import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { PaymentPage } from "./pages/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
