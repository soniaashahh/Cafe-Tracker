import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { API_URL } from '../config/api.js';

const EditSpot = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [signatureDrink, setSignatureDrink] = useState(''); // <-- string
  const [rating, setRating] = useState('');                 // 1–5
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/spots/${id}`)
      .then((res) => {
        setName(res.data.name || '');
        setLocation(res.data.location || '');
        setSignatureDrink(res.data.signatureDrink || '');  // <-- load string
        setRating(res.data.rating ?? '');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar('Failed to load spot', { variant: 'error' });
      });
  }, [id, enqueueSnackbar]);

  const handleEditSpot = () => {
    const data = {
      name,
      location,
      signatureDrink,                  // <-- send string
      rating: Number(rating),          // <-- only rating is numeric
    };

    setLoading(true);
    axios
      .put(`${API_URL}/spots/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Spot updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        enqueueSnackbar('Error updating spot', { variant: 'error' });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Matcha Spot</h1>
      {loading ? <Spinner /> : null}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Shop Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Signature Drink</label>
          <input
            type="text"
            value={signatureDrink}
            onChange={(e) => setSignatureDrink(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Rating (1–5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditSpot}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSpot;
