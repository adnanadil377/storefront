import React from 'react';
import { useNavigate } from 'react-router-dom';


const ToolListCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log(props.tl.id);
        navigate(`/tooldetail/${props.tl.id}`)
    }
    return (
        <div>
            <div className='max-w-lg mx-auto p-6 bg-white bg-opacity-80 shadow-md rounded-lg'>
                <div key={props.tl.id} onClick={handleClick}>
                    <h1 className='text-2xl font-bold mb-4'>{props.tl.name}</h1>
                    <p className='text-gray-700 mb-2'>{props.tl.description}</p>
                    <p className="text-lg font-semibold mb-2">Price per day: <span className="text-green-500">${props.tl.rental_price}</span></p>
                    <p className="text-lg mb-2">Category: <span className="text-blue-500">{props.tl.category}</span></p>
                    <p className="text-lg">Available quantity: <span className="text-yellow-500">{props.tl.quantity}</span></p>
                    {props.tl.availability && props.tk ? (
                    <button onClick={() => props.rt(props.tl.id)} className='bg-cyan-950 text-white text-lg rounded-xl p-2 w-auto mt-2'>Rent</button>
                    ) : (
                    <button className='bg-slate-400 rounded-xl text-lg p-2 w-auto mt-2' disabled>
                        {props.tl.availability ? 'Login to Rent' : 'Not Available'}
                    </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ToolListCard