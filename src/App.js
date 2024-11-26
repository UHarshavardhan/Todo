import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './Components/login';
import SignUp from './Components/signup';
import Home from './Pages/Home';
import TaskManager from './Pages/todo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/task" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
