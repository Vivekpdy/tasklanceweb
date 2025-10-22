import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <TaskDetails />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/tasks/create"
                element={
                  <ProtectedRoute userType="client">
                    <CreateTask />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
