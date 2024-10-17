import axios from 'axios';
import React, { useRef, useState } from 'react';

const Predict = () => {
    const [image, setImage] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [predictedClass, setPredictedClass] = useState('');
    const [error, setError] = useState('');

    // Video: Camera and Capture
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const canvasRef = useRef(null);

    const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/predict`;

    // Start the video stream from the camera
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error accessing the camera:", err);
                setError('Error accessing the camera: ' + err.message);
            });
    };

    // Capture the image from the video stream

    const captureImage = () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setImageSrc(canvasRef.current.toDataURL('image/jpeg'));
    };

    // Send the captured image to the backend
    const sendImageForPrediction = async () => {
        try {
            const formData = new FormData();
            const base64Data = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");
            formData.append('file', base64Data);

            const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/predict`;
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPredictedClass(response.data.predicted_class);
        } catch (error) {
            console.error('Error uploading and predicting:', error);
            setError('Failed to upload and predict: ' + error.message);
        }
    };



    return (

    <div>
        <video ref={videoRef} style={{ width: '100%' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
        <button onClick={startVideo}>Start Camera</button>
        <button onClick={captureImage}>Capture Image</button>
        <button onClick={sendImageForPrediction}>Send for Prediction</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {imageSrc && <img src={imageSrc} alt="Captured" style={{ maxWidth: '500px' }} />}
        {predictedClass && <h1>Predicted Class: {predictedClass}</h1>}
    </div>
);
};
export default Predict;
