// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import SpotsTable from '../components/home/SpotTable';
import SpotsCard from '../components/home/SpotCard';

const Home = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('http://localhost:5555/spots');
        setSpots(res?.data?.data ?? []);
      } catch (e) {
        console.log(e);
        setError('Failed to load spots');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="px-6 py-10">
      {/* Page header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265b37] tracking-tight">
          Cafe Spots
        </h1>
        <p className="mt-1 text-sm text-[#2d6a4f]/70">
          Your matcha & coffee adventure tracker
        </p>
      </div>

      {/* Toggle + Add */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-4">
        {/* pill toggle */}
        <div className="inline-flex rounded-full bg-[#d8f3dc] p-1">
          <button
            onClick={() => setShowType('table')}
            className={`px-4 py-1 text-sm rounded-full transition ${
              showType === 'table' ? 'bg-[#2d6a4f] text-white shadow' : 'text-[#2d6a4f]'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setShowType('card')}
            className={`px-4 py-1 text-sm rounded-full transition ${
              showType === 'card' ? 'bg-[#2d6a4f] text-white shadow' : 'text-[#2d6a4f]'
            }`}
          >
            Card
          </button>
        </div>

        {/* floating add button on the right */}
        <Link
          to="/spots/create"
          aria-label="Add"
          className="inline-flex items-center gap-2 text-[#2d6a4f] hover:text-[#1b4332]"
        >
          <span className="hidden sm:inline">Add</span>
          <span className="inline-grid place-items-center w-9 h-9 rounded-full border border-[#2d6a4f]/20 bg-white shadow-sm hover:shadow">
            <MdAdd className="text-xl" />
          </span>
        </Link>
      </div>

      {/* Card container */}
      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur rounded-2xl shadow-sm ring-1 ring-black/5">
        <div className="p-2 sm:p-4">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : spots.length === 0 ? (
            <div className="text-gray-500 p-6">No spots yet. Click “Add”.</div>
          ) : showType === 'table' ? (
            <SpotsTable spots={spots} />
          ) : (
            <SpotsCard spots={spots} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
