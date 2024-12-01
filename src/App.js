import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

function App() {
  return (
    <Router>
      <div className='bg-dark' style={{ minHeight: '100vh' }}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
