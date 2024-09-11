import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import CropDetails from './components/CropDetails'; // Import the CropDetail component
import { CropProvider } from './Context/CropContext'; // Import CropProvider

function App() {
  return (
    <CropProvider> {/* Wrap your routes with CropProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmer" element={<PrivateRoute component={FarmerDashboard} />} />
          <Route path="/buyer" element={<PrivateRoute component={BuyerDashboard} />} />
          <Route path="/crop/:id" element={<CropDetails />} /> {/* Route for crop details */}
        </Routes>
      </Router>
    </CropProvider>
  );
}

function PrivateRoute({ component: Component }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? (
    <Component />
  ) : (
    <div>Please log in to access this page.</div>
  );
}

export default App;
