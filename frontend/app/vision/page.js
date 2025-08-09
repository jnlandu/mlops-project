'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import Header from '../../components/Header';
import Welcome from '../../components/Welcome';
import Vision from '../../components/Vision'


const visionHome = ( ) => {

  return (
    <ProtectedRoute>
        <Header/>
       <div className="container mt-2">
        <Welcome 
         textHeader='Make image classification prediction with Okapi Vision'
        textBody='
         The Okapi Vision model is trained to classify images into two categories: cat and dog.
         ' />
        <>
          <Vision/>
        </>
      </div>
    </ProtectedRoute>
  );
}

export default visionHome;
