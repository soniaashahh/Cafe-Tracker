import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { API_URL } from '../config/api.js';

const ShowSpot = () => {
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/spots/${id}`);
        setSpot(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Matcha Spot</h1>

      {loading ? (
        <Spinner />
      ) : spot ? (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{spot._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Shop Name</span>
            <span>{spot.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Location</span>
            <span>{spot.location}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Signature Drink</span>
            <span>{spot.signatureDrink}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Rating</span>
            <span>{spot.rating}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Created</span>
            <span>{spot.createdAt ? new Date(spot.createdAt).toString() : '-'}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Updated</span>
            <span>{spot.updatedAt ? new Date(spot.updatedAt).toString() : '-'}</span>
          </div>
        </div>
      ) : (
        <div>No spot found.</div>
      )}
    </div>
  );
};

export default ShowSpot;
