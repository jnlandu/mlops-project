
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OtpInput from './OtpInput';

import { decryptKey, encryptKey } from '../lib/utils';
import AuthContext from '../context/AuthContext';

const PasskeyModal = () =>{
  const router = useRouter();
  const path = usePathname();
  
  const { login } = useContext(AuthContext);

  const [modalShow, setModalShow] = useState(true);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');

  const encryptedPasskey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey'): null;

  useEffect(() => {
    // const accesskey = encryptedPasskey && decryptKey(encryptedPasskey);

    if (path) {
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            setModalShow(false);
            router.push('/admin/');
          } else {
            setModalShow(true);
          }
    }
  }
    , [encryptedPasskey]);

  const closeModal = () => {
        setModalShow(false);
        router.push('/login');
      }
    


  const validatePasskey = () => {
    // e.preventDefault(); // prevent default behavior of the browser
    
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedPasskey = encryptKey(passkey);

      localStorage.setItem('accessKey', encryptedPasskey);

      setModalShow(false);
      router.push('/admin/');
    } else {
      setError('Invalid passkey. Please try again.');
    }
  }



 
  const handleOtpComplete = (otp) => {
    console.log("OTP Entered:", otp);
    // Verify OTP here
    // setModalShow(false);
    router.push('/admin/login');
  };

  return (

    <div> 
        <Modal
        // {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow} 
        onHide={closeModal}
        className='modal'
        >
        <Modal.Header
         className='bg-dark'
         closeButton
         >
            <Modal.Title id="contained-modal-title-vcenter">
            Admin Access Verification
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark'>
            <p className='text-center'>
            To access the admin dashboard, please provide the passkey.
            </p>
            <OtpInput length={6} value={passkey} onChange={setPasskey} />
            <p className='text-center text-danger'>{error}</p>
         < Button onClick= {validatePasskey} 
        
        > Validate</Button>
        </Modal.Body>
        
        </Modal>
    </div>
  );
}

export default PasskeyModal;
