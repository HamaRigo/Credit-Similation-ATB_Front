// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { getCompte, updateCompte } from '../../services/compteService';
// import '../style/CompteList.css'; // Import the CSS file if needed
//
// const CompteDetail = () => {
//     const { id } = useParams(); // Get the ID from URL params
//     const navigate = useNavigate(); // Replace history with useNavigate
//     const [compte, setCompte] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         numeroCompte: '',
//         solde: '',
//         typeCompte: ''
//     });
//
//     useEffect(() => {
//         if (id) {
//             const fetchCompte = async () => {
//                 setLoading(true);
//                 try {
//                     const data = await getCompte(id);
//                     if (data) {
//                         setCompte(data);
//                         setFormData({
//                             numeroCompte: data.numeroCompte,
//                             solde: data.solde,
//                             typeCompte: data.typeCompte
//                         });
//                     } else {
//                         console.error('No data received');
//                         setError('No data received.');
//                     }
//                 } catch (error) {
//                     console.error('Error fetching compte:', error);
//                     setError('Failed to fetch compte.');
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//
//             fetchCompte();
//         } else {
//             console.error('ID is undefined');
//             setError('ID is missing.');
//             setLoading(false);
//         }
//     }, [id]);
//
//     const handleEdit = () => setIsEditing(true);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await updateCompte(id, formData);
//             setIsEditing(false);
//             // Redirect or fetch updated data
//             navigate(`/comptes/${id}`); // Use navigate for redirection
//         } catch (error) {
//             console.error('Error updating compte:', error);
//             setError('Failed to update compte.');
//         }
//     };
//
//     if (loading) {
//         return <p>Loading...</p>;
//     }
//
//     if (error) {
//         return <div className="error-message">{error}</div>;
//     }
//
//     if (!compte) {
//         return <div>No account details available.</div>;
//     }
//
//     return (
//         <div className="compte-detail-container">
//             <h2>Compte Details</h2>
//             {isEditing ? (
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label>
//                             Numero Compte:
//                             <input
//                                 type="text"
//                                 name="numeroCompte"
//                                 value={formData.numeroCompte}
//                                 onChange={handleChange}
//                                 readOnly
//                             />
//                         </label>
//                     </div>
//                     <div>
//                         <label>
//                             Solde:
//                             <input
//                                 type="number"
//                                 name="solde"
//                                 value={formData.solde}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                     </div>
//                     <div>
//                         <label>
//                             Type Compte:
//                             <input
//                                 type="text"
//                                 name="typeCompte"
//                                 value={formData.typeCompte}
//                                 onChange={handleChange}
//                             />
//                         </label>
//                     </div>
//                     <button type="submit">Save</button>
//                     <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//                 </form>
//             ) : (
//                 <div>
//                     <div>
//                         <strong>Numero Compte:</strong> {compte.numeroCompte}
//                     </div>
//                     <div>
//                         <strong>Solde:</strong> {compte.solde}
//                     </div>
//                     <div>
//                         <strong>Type Compte:</strong> {compte.typeCompte}
//                     </div>
//                     <button onClick={handleEdit}>Edit</button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default CompteDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompte, updateCompte } from '../../services/compteService';
import '../style/CompteList.css';

const CompteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [compte, setCompte] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        numeroCompte: '',
        solde: '',
        typeCompte: '',
        clientCin:'',
        ocrs:'',
        credits:''
    });

    useEffect(() => {
        if (id) {
            const fetchCompte = async () => {
                setLoading(true);
                try {
                    const data = await getCompte(id);
                    if (data) {
                        setCompte(data);
                        setFormData({
                            numeroCompte: data.numeroCompte,
                            solde: data.solde,
                            typeCompte: data.typeCompte
                        });
                    } else {
                        console.error('No data received');
                        setError('No data received.');
                    }
                } catch (error) {
                    console.error('Error fetching compte:', error);
                    setError('Failed to fetch compte.');
                } finally {
                    setLoading(false);
                }
            };

            fetchCompte();
        } else {
            console.error('ID is undefined');
            setError('ID is missing.');
            setLoading(false);
        }
    }, [id]);

    const handleEdit = () => setIsEditing(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCompte(id, formData);
            setIsEditing(false);
            navigate('/comptes'); // Redirect to the list after updating
        } catch (error) {
            console.error('Error updating compte:', error);
            setError('Failed to update compte.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!compte) {
        return <div>No account details available.</div>;
    }

    return (
        <div className="compte-detail-container">
            <h2>Compte Details</h2>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Numero Compte:
                            <input
                                type="text"
                                name="numeroCompte"
                                value={formData.numeroCompte}
                                onChange={handleChange}
                                readOnly
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Solde:
                            <input
                                type="number"
                                name="solde"
                                value={formData.solde}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Type Compte:
                            <input
                                type="text"
                                name="typeCompte"
                                value={formData.typeCompte}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <div>
                        <strong>Numero Compte:</strong> {compte.numeroCompte}
                    </div>
                    <div>
                        <strong>Solde:</strong> {compte.solde}
                    </div>
                    <div>
                        <strong>Type Compte:</strong> {compte.typeCompte}
                    </div>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default CompteDetail;
