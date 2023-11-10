import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Polls from './pages/Polls';
import ShowPoll from './pages/ShowPoll';
import CreatedPoll from './pages/CreatedPoll';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/poll" element={<Polls />} />
        <Route path="/poll/:id" element={<ShowPoll />} />
        <Route path="/create-poll" element={<CreatedPoll />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
