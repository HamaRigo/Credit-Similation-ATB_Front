import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteClient, getClients } from '../../services/clientService';
import '../style/ClientList.css'; // Import the CSS file

const ClientList = React.memo(() => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await getClients();
                setClients(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (cin) => {
        try {
            await deleteClient(cin);
            setClients(clients.filter(client => client.cin !== cin));
        } catch (error) {
            setError(error.message);
        }
    };

    const navigateToAddClient = () => {
        navigate('/client/add'); // Redirects to the Add Client form
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2>Clients List</h2>
            <button className="btn btn-primary mb-3" onClick={navigateToAddClient}>
                Add Client
            </button>
            <table className="table">
                <thead>
                <tr>
                    <th>CIN</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Numéro de Téléphone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.cin}>
                        <td>{client.cin}</td>
                        <td>{client.nom}</td>
                        <td>{client.prenom}</td>
                        <td>{client.adresse}</td>
                        <td>{client.numeroTelephone}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => navigate(`/client/${client.cin}`)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(client.cin)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
});

export default ClientList;
