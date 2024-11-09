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
import { IoMdMic } from "react-icons/io";
import { IoMdMicOff } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const Home = ( ) => {
  const router = useRouter()
  
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageToSpeak, setMessageToSpeak] = useState("");
  const [questtionAreaState, setQuestionAreaState] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
 
  const endOfMessagesRef = useRef(null);
  const [answered, setAnswered] = useState(false);
  const [outputLength, setOutputLength] = useState(0);  
  const [transcriptedMessage, setTranscriptedMessage] = useState('');


  const [predictedClass, setPredictedClass] = useState('');
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [error, setError] = useState('');

  const [vision, setVision] = useState(false)

  // Backend API URL
  let apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/chat/` //?? http://localhost:8000/chat`;
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = async () => {
    if (message.trim() !== "") {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}/chat`;
          const response = await axios.post(apiUrl, { content: message }, {
            headers: { Authorization: `Bearer ${storedToken}` },
            
          });
          setChatMessages([...chatMessages, { text: message, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
          setMessageToSpeak(response.data.response)
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
  const speakText = (text, event) => {
    //  Prevent default behavior
    if(event) {
      event.preventDefault();
    }
    // Cancel the previous speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    //This creates a new speech synthesis instance
    const utterance = new SpeechSynthesisUtterance(text);
  
    utterance.rate = 1; // Adjust the speed
    utterance.pitch = 1; // Adjust the pitch
    utterance.volume = 1; // Adjust the volume (0 to 1)
    
    // Speak the text
    window.speechSynthesis.speak(utterance);

  
    utterance.onend = () => {
    window.speechSynthesis.cancel();
  }
  };

//  Function to trigger the voice recognition
const startVoiceRecognition =  (event) => {
  // Prevent default behavior
  if (event) {
    event.preventDefault();
  }
  // Check if browser supports speech recognition
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Your browser does not support voice recognition. Try Google Chrome.');
    return;
  }
  //  Change the state of the mic icon
  setMicOn(true);
  setIsRecording(true);

  // Use WebkitSpeechRecognition for Chrome or SpeechRecognition for other browsers
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';  
  recognition.interimResults = false;  //only final results

  // When a result is received
  recognition.onresult =  async (event) => {
    const transcript = event.results[0][0].transcript;
    setMessage(transcript);
    await sendTranscriptionToBackend(transcript);
    setMicOn(false);
  };

  // If there's an error during recognition
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    alert('There was an error with the speech recognition. Please try again.');
  };

  // Start recognition
  recognition.start();

};

const stopRecording = () => {
  recognition.stop();
  setMicOn(false);
  setIsRecording(false);
}
const  sendTranscriptionToBackend = async (transcription) => {
  if (transcription.trim() !== "") {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const response = await axios.post(apiUrl, { content: transcription }, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setChatMessages([...chatMessages, { text: message , sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
        setMessageToSpeak(response.data.response)
        setOutputLength(response.data.response.length);
        setAnswered(true);
      } catch (error) {
        console.error('Sending message failed:', error);
        setAnswered(false);
      } 
    }
  }
};

  return (
    <ProtectedRoute>
        <Header/>
        <div className='welcome-container'>
        <Welcome 
         textHeader='Start chatting or summarizing  your texts with OkapiChat! '
        textBody='
         A text summarization and conversational application built with React, Next.js, and FastAPI.
         ' /> 

        </div>
       <div className="main-chat-container container mt-2">
        <div className=" chat-container ms-3 me-3">
          {/* <div className=""> */}
            {chatMessages.map((msg, index) => (
              <div key={index} className={  ` d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                <span className={`${msg.sender === 'bot' ? 'text-justify  me-2 mt-2' : 'text-justify mt-1'}`}>
                  {/*  Bot message */}
                  {msg.sender === 'bot' ?
                  
                  <Image
                  src="/assets/images/okapi.jpg"
                  alt="robot"
                  width={24}
                  height={24}
                  className='rounded-circle'
                  />:

                  <Image
                  src="/assets/icons/user.svg"
                  alt="user"
                  width={24}
                  height={24}
                  className='rounded-circle'
                  />
                  }
                </span>
                <div className={ `${msg.sender === 'user' ? 'd-flex ms-2  text-justify' : ' text-justify '}  me-1 mt-1 `}>
                  <p className='text-secondary' id='transcription'>
                    {msg.text }
                  </p> 
                </div>
                
                
              </div>
            ))}
            <>
             { answered ? 
             <div className='d-flex  justify-content-between mt-2'>
              <span className='d-flex justify-between gap-2'>
                <a href=''><span> <RiFileCopyLine size={20}/> </span> </a>
                {/*  Add the sound  */}
                <a href=''
                 onClick={() => speakText(messageToSpeak, event)} cursor='pointer'
                 >
                 <AiOutlineSound size={20}/>
                </a>
                <a ><RiThumbUpLine size={20}/></a>
                <a cursor='pointer'><RiThumbDownLine size={20}/></a>
                <a cursor='pointer'><LuRefreshCcw size={20}/></a>
              </span>
            <span className='d-flex justify-between  text-end gap-2'>
            Text length: {outputLength}
            </span>
            </div>: ''}
            </>
            <div ref={endOfMessagesRef} />
          {/* </div> */}
        </div>
        {/*  Question input: */}
        <div  className="mb-0 text-center">
          <p className='text-secondary mb-1 mt-3'>Ask a question. Type or Speak it. </p>
        </div>
       <div className="question-input d-flex align-items-center gap-1">
          <a href=""
            className='me-2'
            onClick={startVoiceRecognition} 
            cursor='pointer'
          >
            {micOn  ? isRecording &&  <IoMdMic size={25} /> : <IoMdMicOff size={25} />}
          </a>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control p-2"
            placeholder="Type your message here..."
            rows="2"
          ></textarea>
          {/*  Vision model, Camera:  */}
          <a
           onClick={() => router.push('/vision')} className='ms-2'
           cursor='pointer'
          >
            <IoCameraOutline size={25} />
          </a>
           {/* Attachment Icon */}
          <input 
            type="file" 
            id="fileInput disabled" 
            aria-label='disabled'
            className="d-none" 
            onChange={handleFileUpload}
          />
            <label htmlFor="fileInput" className="text-secondary cursor-pointer" style={{userSelect: "none"}}>
            <a  href=""
             onClick={handleFileUpload}
            >  <GrFormAttachment  size={30}/> </a>
            </label>
          {/* Send Button */}
          <button onClick={handleSend} className="btn send-btn"
          >
            <IoMdSend />
          </button>
        </div>
        <div className='text-center mt-2'>
          <p className='small text-secondary'>OkapiChat can  make mistakes. <br/>
          This is a test application. We are working on improving it. Your feedback is welcome.
          </p>
         </div>
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
