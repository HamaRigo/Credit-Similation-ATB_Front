import React, { useState, useEffect } from 'react';
import ocrService from '../../services/ocrService';

const OcrList = () => {
    const [ocrList, setOcrList] = useState([]);

    useEffect(() => {
        fetchOcrEntities();
    }, []);

    const fetchOcrEntities = async () => {
        try {
            const response = await ocrService.getAllOcrEntities();
            setOcrList(response.data);
        } catch (error) {
            console.error("Error fetching OCR entities:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await ocrService.deleteOcrById(id);
            fetchOcrEntities(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting OCR entity:", error);
        }
    };

    return (
        <div>
            <h2>All OCR Entities</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Type Document</th>
                    <th>Results</th>
                    <th>Fraud</th>
                    <th>Account Number</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {ocrList.map((ocr) => (
                    <tr key={ocr.id}>
                        <td>{ocr.id}</td>
                        <td>{ocr.typeDocument}</td>
                        <td>{ocr.resultatsReconnaissance}</td>
                        <td>{ocr.fraude ? 'Yes' : 'No'}</td>
                        <td>{ocr.numeroCompte}</td>
                        <td>
                            {ocr.image && (
                                <img
                                    src={`data:image/png;base64,${ocr.image}`}
                                    alt="OCR Image"
                                    width="100"
                                />
                            )}
                        </td>
                        <td>
                            <button onClick={() => handleDelete(ocr.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default OcrList;
