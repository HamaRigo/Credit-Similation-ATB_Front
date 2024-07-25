import React, { useState } from 'react';
import { createClient, checkClientExists } from '../../services/clientService'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const AddClientForm = () => {
    const [client, setClient] = useState({
        cin: '',
        nom: '',
        prenom: '',
        adresse: '',
        numeroTelephone: ''
    });
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate(); // Use useNavigate for redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        const cinPattern = /^[0-9]{8}$/; // Example pattern for CIN
        const phonePattern = /^[0-9]{8,15}$/; // Example pattern for phone number

        if (!cinPattern.test(client.cin)) {
            errors.cin = 'Invalid CIN format. It should be 8 digits.';
        }
        if (!client.nom) {
            errors.nom = 'Name is required.';
        }
        if (!client.prenom) {
            errors.prenom = 'Surname is required.';
        }
        if (!client.adresse) {
            errors.adresse = 'Address is required.';
        }
        if (!phonePattern.test(client.numeroTelephone)) {
            errors.numeroTelephone = 'Invalid phone number format. It should be between 8 to 15 digits.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setFormErrors({});

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const exists = await checkClientExists(client.cin);
            if (exists) {
                setError('Client with this CIN already exists.');
                return;
            }

            await createClient(client);
            alert('Client added successfully!');
            setClient({
                cin: '',
                nom: '',
                prenom: '',
                adresse: '',
                numeroTelephone: ''
            });
            navigate('/clients');
        } catch (error) {
            console.error('Error adding client:', error);
            alert('Failed to add client. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>CIN:</label>
                <input
                    type="text"
                    name="cin"
                    value={client.cin}
                    onChange={handleChange}
                    required
                />
                {formErrors.cin && <div className="error">{formErrors.cin}</div>}
            </div>
            <div>
                <label>Nom:</label>
                <input
                    type="text"
                    name="nom"
                    value={client.nom}
                    onChange={handleChange}
                    required
                />
                {formErrors.nom && <div className="error">{formErrors.nom}</div>}
            </div>
            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={client.prenom}
                    onChange={handleChange}
                    required
                />
                {formErrors.prenom && <div className="error">{formErrors.prenom}</div>}
            </div>
            <div>
                <label>Adresse:</label>
                <input
                    type="text"
                    name="adresse"
                    value={client.adresse}
                    onChange={handleChange}
                    required
                />
                {formErrors.adresse && <div className="error">{formErrors.adresse}</div>}
            </div>
            <div>
                <label>Numéro de Téléphone:</label>
                <input
                    type="text"
                    name="numeroTelephone"
                    value={client.numeroTelephone}
                    onChange={handleChange}
                    required
                />
                {formErrors.numeroTelephone && <div className="error">{formErrors.numeroTelephone}</div>}
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Add Client</button>
        </form>
    );
};

export default AddClientForm;
