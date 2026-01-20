import './App.css'
import { AppSidebar } from './components/app-sidebar';
import { LoginForm } from './components/login-form'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContactDetails from './pages/ContactDetails';
import { CreateContact } from './components/CreateContact';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/contact/:id" element={<ContactDetails />} />
        <Route path="/dashboard/contact/new" element={<CreateContact />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
