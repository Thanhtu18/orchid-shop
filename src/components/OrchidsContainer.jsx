import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import orchids from '../data/ListOfOrchids';
import OrchidCard from './OrchidCard';
import '../App.css';

function OrchidsContainer() {
  return (
    <div className="orchids-container">
      <h1>🌺 Orchid Collection</h1>
      <div className="orchid-grid">
        {orchids.map((orchid) => (
          <OrchidCard
            key={orchid.id}
            orchid={orchid}
          />
        ))}
      </div>
    </div>
  );
}

export default OrchidsContainer;
