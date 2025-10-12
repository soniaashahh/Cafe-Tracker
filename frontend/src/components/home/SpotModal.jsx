import { AiOutlineClose } from 'react-icons/ai';
import { FaLeaf } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';

const SpotModal = ({ spot, onClose }) => {
  if (!spot) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-2xl p-6 relative cafe-card"
      >
        <AiOutlineClose
          className="absolute right-4 top-4 text-2xl text-red-500 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center gap-2 mb-1">
          <FaLeaf className="text-green-600" />
          <h2 className="text-xl font-semibold text-green-900">{spot.name}</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">ID: {spot._id}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-800">
            <GoLocation className="text-xl" />
            <span>{spot.location}</span>
          </div>
          <div>
            Signature Drink:{' '}
            <span className="font-medium">{spot.signatureDrink}</span>
          </div>
          <div>
            Rating:{' '}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
              {spot.rating} / 5
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotModal;
