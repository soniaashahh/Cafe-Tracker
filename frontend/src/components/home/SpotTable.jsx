// frontend/src/components/home/SpotTable.jsx
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const td = 'px-4 py-3 text-sm align-middle';
const th = 'px-4 py-3 text-sm font-bold text-[#1b4332] uppercase align-middle';

const SpotsTable = ({ spots = [] }) => {
  return (
    <div className="overflow-x-auto">
      {/* Remove horizontal gaps so header is one smooth bar */}
      <table className="w-full table-fixed border-separate border-spacing-y-3 border-spacing-x-0">
        <thead>
          <tr className="bg-[#e6f4ea]">
            <th className={`${th} text-left w-14 first:rounded-l-xl`}>No</th>
            <th className={`${th} text-left`}>Shop Name</th>
            <th className={`${th} text-left max-md:hidden`}>Location</th>
            <th className={`${th} text-left max-md:hidden`}>Signature Drink</th>
            <th className={`${th} text-center w-24 max-md:hidden`}>Rating</th>
            <th className={`${th} text-center w-32 last:rounded-r-xl`}>Operations</th>
          </tr>
        </thead>

        <tbody>
          {spots.map((spot, index) => (
            <tr
              key={spot._id}
              className="bg-[#f3faf5] hover:bg-[#eef7f1] ring-1 ring-[#d7eadf] rounded-xl"
            >
              <td className={`${td} text-left w-14 first:rounded-l-xl text-[#1b4332]`}>
                {index + 1}
              </td>

              <td className={`${td} text-left font-medium text-[#1b4332]`}>
                {spot.name}
              </td>

              <td className={`${td} text-left max-md:hidden text-[#1b4332]/80`}>
                {spot.location}
              </td>

              <td className={`${td} text-left max-md:hidden text-[#1b4332]/80`}>
                {spot.signatureDrink}
              </td>

              <td className={`${td} text-center w-24 max-md:hidden`}>
                <span className="inline-flex items-center justify-center min-w-[1.5rem] px-2 py-0.5 rounded-full text-xs font-semibold bg-[#d8f3dc] text-[#1b4332]">
                  {spot.rating}
                </span>
              </td>

              <td className={`${td} text-center w-32 last:rounded-r-xl`}>
                <div className="inline-flex items-center justify-center gap-4">
                  <Link to={`/spots/details/${spot._id}`} title="Details">
                    <BsInfoCircle className="text-[18px] text-[#1b4332] hover:opacity-80" />
                  </Link>
                  <Link to={`/spots/edit/${spot._id}`} title="Edit">
                    <AiOutlineEdit className="text-[18px] text-[#e9c46a] hover:opacity-80" />
                  </Link>
                  <Link to={`/spots/delete/${spot._id}`} title="Delete">
                    <MdOutlineDelete className="text-[18px] text-[#e76f51] hover:opacity-80" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpotsTable;
