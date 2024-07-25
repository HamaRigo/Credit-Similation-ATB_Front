import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './components/client/ClientList';
import ClientDetail from './components/client/ClientDetail';
import AddClientForm from './components/client/AddClientForm';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompteList from "./components/compte/CompteList";
import CompteDetail from "./components/compte/CompteDetail";
import AddCompte from "./components/compte/AddCompte"; // Ensure you import the CSS for react-toastify

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/comptes" element={<CompteList />} />
                    <Route path="/comptes/add" element={<AddCompte />} />
                    <Route path="/comptes/:id" element={<CompteDetail />} />
                    <Route path="/clients" element={<ClientList />} />
                    <Route path="/client/:cin" element={<ClientDetail />} />
                    <Route path="/client/add" element={<AddClientForm />} />
                </Routes>
                {/*<ToastContainer />*/}
            </div>
        </Router>
    );
}

export default App;
