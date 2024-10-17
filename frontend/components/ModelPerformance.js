import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelPerformance = () => {
    const [url, setUrl] = useState('');
    const [windowSize, setWindowSize] = useState(300);
    const [error, setError] = useState('');
    // const apiUrl = process.env.NEXT_PUBLIC_FASTAPI_API_URL + "/monitor-model/?window_size=300";
    

    useEffect(() => {
      axios.post('http://localhost:8000/monitor-model/', { window_size: 300 }, {
        responseType: 'blob'
      }).then(response => {
        const objectUrl = URL.createObjectURL(response.data);
        setUrl(objectUrl);
      }).catch(error => {
        console.error('Error loading the dashboard:', error);
      });
    }, []);

    return (
      <>
       <h1 className='text-center'>Model Performance</h1>
       <div class="embed-responsive embed-responsive-16by9">
          <iframe 
          class="embed-responsive-item" 
          src={url}
          style={{ width: '100%', height: '90vh' }}
          allowfullscreen
          >

          </iframe>
      </div>
      </>
    );
};

export default ModelPerformance;
