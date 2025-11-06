import React from 'react';

function OrchidModal({ orchid, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✖</button>
        <img src={orchid.image} alt={orchid.name} className="modal-img" />
        <h2>{orchid.name}</h2>
        <ul>
          <li><strong>Origin:</strong> {orchid.origin}</li>
          <li><strong>Color:</strong> {orchid.color}</li>
          <li><strong>Category:</strong> {orchid.category}</li>
          <li><strong>Rating:</strong> {orchid.rating} ⭐</li>
          <li><strong>Likes:</strong> {orchid.numberOfLike}</li>
          <li><strong>Special:</strong> {orchid.isSpecial ? '✅' : '❌'}</li>
          <li><strong>Natural:</strong> {orchid.isNatural ? '✅' : '❌'}</li>
        </ul>
      </div>
    </div>
  );
}

export default OrchidModal;
