import { Link } from 'react-router-dom';
import { BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdLocationOn } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { useState } from 'react';
import SpotModal from './SpotModal';

const SpotSingleCard = ({ spot }) => {
  const [showModal, setShowModal] = useState(false);
  if (!spot) return null;

  return (
    <div className="border border-green-100 rounded-xl p-4 bg-white hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaLeaf className="text-green-600" />
          <h3 className="font-semibold text-green-900">{spot.name}</h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
          {spot.rating} / 5
        </span>
      </div>

      <div className="mt-2 text-sm text-green-800/80 flex items-center gap-1">
        <MdLocationOn />
        {spot.location}
      </div>
      <div className="text-sm text-green-800/80">
        Signature: <span className="font-medium">{spot.signatureDrink}</span>
      </div>

      <div className="flex justify-between items-center gap-3 mt-4">
        <BiShow
          className="text-2xl text-green-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
          title="Quick view"
        />
        <Link to={`/spots/details/${spot._id}`} title="Details">
          <BsInfoCircle className="text-xl text-green-800 hover:text-black" />
        </Link>
        <Link to={`/spots/edit/${spot._id}`} title="Edit">
          <AiOutlineEdit className="text-xl text-yellow-600 hover:text-yellow-700" />
        </Link>
        <Link to={`/spots/delete/${spot._id}`} title="Delete">
          <MdOutlineDelete className="text-xl text-red-600 hover:text-red-700" />
        </Link>
      </div>

      {showModal && <SpotModal spot={spot} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SpotSingleCard;
