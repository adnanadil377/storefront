import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chatbot from './ChatBot/ChatBot';

const Home = () => {
    // State to control the visibility of the chatbot
    const [isChatbotVisible, setIsChatbotVisible] = useState(false);

    // Function to toggle the visibility of the chatbot
    const toggleChatbotVisibility = () => {
        setIsChatbotVisible((prevState) => !prevState);
    };

    return (
        <div className='grid md:grid-cols-3 gap-5 p-5 m-10 max-h-full'>
            {/* Links for different sections */}
            <Link to='/customers' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    🙍‍♂️
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Customers
                </div>
            </Link>

            <Link to='/tool' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    🛠️
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Tools
                </div>
            </Link>

            <Link to='/suppliers' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    👨‍💼
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Suppliers
                </div>
            </Link>

            <Link to='/lease' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    🤝
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Lease
                </div>
            </Link>

            <Link to='/invoice' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    🧾
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Invoice
                </div>
            </Link>

            <Link to='/suppliers' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col'>
                <div className='text-9xl ml-auto mr-auto p-5'>
                    🛒
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Purchase order
                </div>
            </Link>

            {/* Button to toggle chatbot visibility */}
            <button
                className='fixed bottom-5 right-5 w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors'
                onClick={toggleChatbotVisibility}
            >
                {isChatbotVisible ? '❌' : '💬'}
            </button>

            {/* Conditionally render the Chatbot component based on the state */}
            {isChatbotVisible && <Chatbot />}
        </div>
    );
};

export default Home;
