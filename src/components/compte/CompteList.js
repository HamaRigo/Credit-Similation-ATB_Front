import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComptes, deleteCompte } from '../../services/compteService';
import '../style/CompteList.css'; // Import the CSS file

const CompteList = React.memo(() => {
    const [comptes, setComptes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const result = await getComptes();
                setComptes(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDelete = async (numeroCompte) => {
        try {
            await deleteCompte(numeroCompte);
            setComptes(comptes.filter(compte => compte.numeroCompte !== numeroCompte));
        } catch (error) {
            setError(error.message);
        }
    };

    const navigateToAddCompte = () => {
        navigate('/comptes/add'); // Redirects to the Add Compte form
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2>Comptes List</h2>
            <button className="btn btn-primary mb-3" onClick={navigateToAddCompte}>
                Add Compte
            </button>
            <table className="table">
                <thead>
                <tr>
                    <th>Numero Compte</th>
                    <th>Solde</th>
                    <th>Type Compte</th>
                    <th>Client CIN</th>
                    <th>OCRs</th>
                    <th>Credits</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {comptes.map(compte => (
                    <tr key={compte.numeroCompte}>
                        <td>{compte.numeroCompte}</td>
                        <td>{compte.solde}</td>
                        <td>{compte.typeCompte}</td>
                        <td>{compte.clientCin}</td>
                        <td>{compte.ocrs ? compte.ocrs.join(', ') : ''}</td>
                        <td>{compte.credits ? compte.credits.join(', ') : ''}</td>
                        <td>
                            <button className="btn btn-primary me-2" onClick={() => navigate(`/comptes/${compte.numeroCompte}`)}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(compte.numeroCompte)}>
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

export default CompteList;
