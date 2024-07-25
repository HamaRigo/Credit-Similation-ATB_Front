import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import '../style/AddCompte.css'; // Import the CSS file
import { getClients } from '../../services/clientService'; // Import the client service
import { createCompte } from '../../services/compteService'; // Import createCompte

const AddCompte = () => {
    const [compte, setCompte] = useState({
        numeroCompte: '',
        solde: '',
        typeCompte: '',
        ocrs: [],
        clientCin: '',
        credits: []
    });
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                toast.error('Failed to fetch clients.');
            }
        };

        fetchClients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompte((prevCompte) => ({
            ...prevCompte,
            [name]: value,
        }));
    };

    const handleSoldeChange = (e) => {
        let value = e.target.value;

        // Remove non-numeric characters except for the comma
        value = value.replace(/[^0-9,]/g, '');

        // Replace comma with dot for number conversion
        value = value.replace(/,/g, '');

        // Convert to number to check if positive
        const numericValue = parseFloat(value);

        if (!isNaN(numericValue) && numericValue >= 0) {
            // Format number with comma as thousand separator
            const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' TND';
            setCompte((prevCompte) => ({
                ...prevCompte,
                solde: formattedValue,
            }));
        } else {
            // If invalid, reset to empty string
            setCompte((prevCompte) => ({
                ...prevCompte,
                solde: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Remove " TND" before submitting
        const formattedCompte = {
            ...compte,
            solde: parseFloat(compte.solde.replace(/,/g, '').replace(' TND', ''))
        };

        try {
            // Use createCompte function
            await createCompte(formattedCompte);
            toast.success('Compte added successfully!');
            // Reset form or redirect as needed
            setCompte({
                numeroCompte: '',
                solde: '',
                typeCompte: '',
                ocrs: [],
                clientCin: '',
                credits: []
            });
        } catch (error) {
            toast.error('Failed to add compte.');
            console.error(error);
        }
    };

    return (
        <div className="add-compte-container">
            <h2>Add New Compte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="numeroCompte">Numero Compte:</label>
                    <input
                        type="text"
                        id="numeroCompte"
                        name="numeroCompte"
                        value={compte.numeroCompte}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="solde">Solde:</label>
                    <input
                        type="text"
                        id="solde"
                        name="solde"
                        value={compte.solde}
                        onChange={handleSoldeChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="typeCompte">Type Compte:</label>
                    <input
                        type="text"
                        id="typeCompte"
                        name="typeCompte"
                        value={compte.typeCompte}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="clientCin">Client CIN:</label>
                    <select
                        id="clientCin"
                        name="clientCin"
                        value={compte.clientCin}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Client CIN</option>
                        {clients.map(client => (
                            <option key={client.cin} value={client.cin}>
                                {client.cin}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Add fields for OCRs and Credits if needed */}
                <button type="submit">Add Compte</button>
            </form>
        </div>
    );
};

export default AddCompte;
