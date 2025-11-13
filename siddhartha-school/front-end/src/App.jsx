import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academics from './pages/Academics';
import Gallery from './pages/Gallery';
import Fees from './pages/Fees';
import Contact from './pages/Contact';
import ThreeBackground from './components/ThreeBackground';
import Admissions from './pages/Admissions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ThreeBackground />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;