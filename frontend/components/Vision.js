
import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Image from 'next/image';
import { BsChatSquareText } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { IoCameraOutline } from 'react-icons/io5';

const Vision = () => {
   
    const [imageSrc, setImageSrc] = useState('');
    const [predictedClass, setPredictedClass] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    // Video: Camera and Capture
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const canvasRef = useRef(null);
    const [image, setImage] = useState('');

    const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/predict`;

    // Start the video stream from the camera
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCameraOn(true);
            })
            .catch(err => {
                console.error("Error accessing the camera:", err);
                setError('Error accessing the camera: ' + err.message);
            });
    };

  // Capture the image from the video stream
  const captureImage = async () => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setImageSrc(canvasRef.current.toDataURL('image/*'));

        // Send  captured photo to the backend for prediction
        const formData = new FormData();

        const base64Data = imageSrc.replace(/^data:image\/[a-z]+;base64,/, "");

    // formData.append('file', image);
      formData.append('file', base64Data);
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${storedToken}`,
            }
        });
        setPredictedClass(response.data.predicted_class);   
        } catch (error) {
          setError('Failed to upload and predict: ' + error.message);
        }
    }
    // Stop the video stream, when the image is captured:
    // navigator.mediaDevices.getUserMedia({ video: false })
  };

   //  For uploading an image
   const handleFileChange = async (file) => {
    if (!file) return;

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
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        setPredictedClass(response.data.predicted_class);

      } catch (error) {
        console.error('Error uploading and predicting:', error);
        setError('Failed to upload and predict: ' + error.message);
      }
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1, //
  });



    return (

    <>
     <div
      {...getRootProps()}
      className={`d-flex flex-column align-items-center justify-content-center p-3 rounded gap-1 file-upload ${isDragActive ? 'drag-active' : ''
        }`}
    >
      <input {...getInputProps()} />
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="d-flex flex-column justify-content-center text-center gap-2 file-upload_label">
            <p>
              <span>Click to upload or drag and drop</span>
            </p>
            <p>SVG, PNG, JPG, or GIF (max. 800x400px)</p>
          </div>
        </>
      
    </div>
    <div className='d-flex flex-column mt-3 classify-btn '>
            <div className='d-flex  flex gap-2'>
              <div className='classification-text'>
              <small className='text-secondary h6 classification-text'>
                Image classification</small>
              </div>
               {/* Button to trigger the camera */}
              <button onClick={startVideo} className='btn btn-style w-25'>
                <IoCameraOutline size={25} />
              </button>
              <div className='d-flex  ms-2 text-end gap-3 redirect-to-chat'>
                <a href=''
                  onClick={() => router.push('/')}
                >
                <small className='text-secondary'>Chat with Okapi
                </small>
                </a>
                <a href='' className='mt-1' onClick={() => router.push('/')}>
                   <BsChatSquareText size={25} />
                </a>
              </div>
            </div>
     </div>
     <div className='uploaded-image mt-3'>
     {imageSrc && 
          <Image
              src={imageSrc}
              width={300}
              height={300}
              alt="Uploaded image"
              className="overflow-hidden "
              style={{ maxWidth: '500px' }}
            />
      }
     </div>
     <div className='mt-3 output-prediction'>
       {error && <p style={{ color: 'red' }}>{error}</p>}
       {predictedClass && <h4 className='mt-2'>Prediction: {predictedClass}</h4>}
     </div>

    {/*  Stream and Upload image: */}
    <div>
          <video ref={videoRef} className='mt-4' style={{ width: '100%' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} width="640" height="480" />
    </div>
      {isCameraOn ?  (
      <div className='capture-btn mt-3'>
            <button className='btn btn-style w-50' onClick={captureImage }>Take Photo</button>
      </div>) :
      ''
      }

  </>
);
};
export default Vision;
