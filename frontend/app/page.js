'use client';

import {  useState, useEffect, useRef} from 'react';
import axios from 'axios';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import Welcome from '../components/Welcome';

import { IoMdSend } from "react-icons/io";
import { GrFormAttachment } from "react-icons/gr";
import { RiFileCopyLine } from "react-icons/ri";
import { AiOutlineSound } from "react-icons/ai";
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbDownLine } from "react-icons/ri";
import { LuRefreshCcw } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const Home = ( ) => {
  const router = useRouter()
  
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
 
  const endOfMessagesRef = useRef(null);
  const [answered, setAnswered] = useState(false);
  const [outputLength, setOutputLength] = useState(0);  


  const [predictedClass, setPredictedClass] = useState('');
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');

  const [vision, setVision] = useState(false)


  useEffect(() => {
    const fetchChatMessages = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {

          const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/chat` //?? http://localhost:8000/chat`;
          const chatResponse = await axios.get(apiUrl, {
            headers: { 
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          setChatMessages(chatResponse.data.messages);
        } catch (error) {
          console.error('Fetching chat messages failed:', error);
        }
      }
    };
    fetchChatMessages();
  }, []);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = async () => {
    if (message.trim() !== "") {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/chat`;
          const response = await axios.post(apiUrl, { content: message }, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setChatMessages([...chatMessages, { text: message, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
          // setMessage("Hey");
          setOutputLength(response.data.response.length);
          setAnswered(true);
        } catch (error) {
          console.error('Sending message failed:', error);
          setAnswered(false);
        }
      }
    }
  };

  //  Speech: text-to-speech functionality
  const speakText = (text) => {
    // Cancel any ongoing speech synthesis
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  
    // Create a speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set some optional properties
    utterance.rate = 1; // Adjust the speed
    utterance.pitch = 1; // Adjust the pitch
    utterance.volume = 1; // Adjust the volume (0 to 1)
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  };
  


  return (
    <ProtectedRoute>
  
        <Header/>
       <div className="container mt-2">
        <Welcome 
         textHeader='Start chatting or summarizing  your texts with OkapiChat! '
        textBody='
         A simple text summarization and conversational application built with React, Next.js, and FastAPI.
        Try to send it a long message and see how it summarizes it.
         ' /> 

        <>
        <div className="mb-3  chat-container ms-3 me-3">
          {/* <div className=""> */}
            {chatMessages.map((msg, index) => (
              <div key={index} className={` d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <span className={`${msg.sender === 'bot' ? 'me-2 mt-2' : 'mt-1'}`}>
                  {msg.sender === 'bot' ?
                  
                  <Image
                  src="/assets/images/okapi.jpg"
                  alt="robot"
                  width={24}
                  height={24}
                  className='rounded-circle'
                  />
                  : <FaUserCircle size={24} />}
                </span>
                <div className={ `${msg.sender === 'user' ? 'd-flex ms-2  text-justify' : ' text-justify '}  me-1 mt-1 `}>
                  <p className='text-secondary'>
                    {msg.text}
                  </p> 
                </div>
                
                
              </div>
            ))}
            <>
             { answered ? 
             <div className='d-flex  justify-content-between mt-2'>
              <span className='d-flex justify-between gap-2'>
                <a href='#'><span> <RiFileCopyLine size={20}/> </span> </a>
                {/*  Add the sound  */}
                <a href='#'
                 onClick={() => speakText(message)}
                 >
                 <span> <AiOutlineSound size={20}/> </span>
                </a>
                <a href='#'><span> <RiThumbUpLine size={20}/> </span> </a>
                <a href='#'><span> <RiThumbDownLine size={20}/> </span></a>
                <a href='#'><span> <LuRefreshCcw size={20}/> </span></a>
              </span>
            <span className='d-flex justify-between  text-end gap-2'>
            summary length: {outputLength}
            </span>
            </div>: ''}
            </>
            <div ref={endOfMessagesRef} />
          {/* </div> */}
        </div>
       <div className="question-input d-flex align-items-center gap-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            placeholder="Type your message here..."
            rows="2"
          ></textarea>
          {/*  Vistion model, Camera:  */}
          <a href='#'
           onClick={() => router.push('/vision')} className='ms-2'
          >
            <IoCameraOutline size={25} />
          </a>
           {/* Attachment Icon */}
          <input 
            type="file" 
            id="fileInput" 
            className="d-none" 
            onChange={handleFileUpload}
          />
            <label htmlFor="fileInput" className="text-secondary cursor-pointer" style={{userSelect: "none"}}>
            <a  href="#"
             onClick={handleFileUpload}
            >  <GrFormAttachment  size={30}/> </a>
            </label>
          {/* Send Button */}
          <button onClick={handleSend} className="btn send-btn"
          >
            <IoMdSend />
          </button>
        </div>
        </>
      </div>
    </ProtectedRoute>
  );

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Handle the file upload logic here
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result;
        if (fileContent) {
        console.log("File content:", fileContent);
        // Send the file content to the server or handle it as needed
        }
      };
      reader.readAsText(file);
    }
    }
};

export default Home;
