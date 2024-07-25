import React, { useState } from 'react';
import ocrService from '../../services/ocrService';

const OcrUploader = () => {
    const [file, setFile] = useState(null);
    const [typeDocument, setTypeDocument] = useState('');
    const [numeroCompteId, setNumeroCompteId] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file && typeDocument && numeroCompteId) {
            try {
                const response = await ocrService.analyzeAndSaveImage(file, typeDocument, numeroCompteId);
                console.log('Uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.log('Please fill all fields');
        }
    };

    return (
        <div>
            <h2>Upload OCR Document</h2>
            <input type="file" onChange={handleFileChange} />
            <input
                type="text"
                placeholder="Type Document"
                value={typeDocument}
                onChange={(e) => setTypeDocument(e.target.value)}
            />
            <input
                type="text"
                placeholder="Account Number ID"
                value={numeroCompteId}
                onChange={(e) => setNumeroCompteId(e.target.value)}
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default OcrUploader;
