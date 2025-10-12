import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateSpot = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [signatureDrink, setSignatureDrink] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveSpot = async () => {
    const data = {
      name,
      location,
      signatureDrink,
      rating: rating === '' ? null : Number(rating),
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/spots', data);
      enqueueSnackbar('Spot created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.log(error?.response?.data || error.message);
      enqueueSnackbar('Error creating spot', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Matcha Spot</h1>
      {loading ? <Spinner /> : null}

      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Shop Name</label>
          <input className='border-2 border-gray-500 px-4 py-2 w-full'
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Location</label>
          <input className='border-2 border-gray-500 px-4 py-2 w-full'
            value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Signature Drink</label>
          <input className='border-2 border-gray-500 px-4 py-2 w-full'
            value={signatureDrink} onChange={(e) => setSignatureDrink(e.target.value)} />
        </div>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Rating (1–5)</label>
          <input type='number' min='1' max='5'
            className='border-2 border-gray-500 px-4 py-2 w-full'
            value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>

        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveSpot}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateSpot;
