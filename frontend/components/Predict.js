import axios from 'axios';
import React, { useState } from 'react';

const Predict = () => {
    const [image, setImage] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [predictedClass, setPredictedClass] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;  // No file selected

        // Display the selected image preview from the selected file
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('file', file);

        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/predict/`;
            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${storedToken}`  // Ensure this is set as per your auth requirements
                    }
                });
                setImage(`data:image/jpeg;base64,${response.data.image_data}`);
                setPredictedClass(response.data.predicted_class);
            } catch (error) {
                console.error('Error uploading and predicting:', error);
                setError('Failed to upload and predict: ' + error.message);
            }
        }
    };

    return (
        <>
            <input type="file" onChange={handleFileChange}  accept='image/*'/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {imageSrc && <img src={imageSrc} alt="Uploaded Preview" style={{ maxWidth: '500px' }} />}
            {predictedClass && <h1>Predicted Class: {predictedClass}</h1>}
        </>
    );
}
export default Predict;
