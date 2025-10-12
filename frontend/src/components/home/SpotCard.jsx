// frontend/src/components/home/SpotCard.jsx
import SpotSingleCard from './SpotSingleCard';

const SpotsCard = ({ spots = [] }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {spots.map((s) => (
        <div key={s._id} className="rounded-2xl bg-[#f3faf5] ring-1 ring-black/5 hover:shadow-sm transition">
          <SpotSingleCard spot={s} />
        </div>
      ))}
    </div>
  );
};

export default SpotsCard;
