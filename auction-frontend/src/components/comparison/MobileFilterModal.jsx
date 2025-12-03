import React from "react";
import "./MobileFilterModal.css";

export default function MobileFilterModal({ filters, setFilters, onClose }) {
  return (
    <div className="mobile-filter-modal">
        <div className="modal-content">

            <div className="modal-header">
                <h2>Filter</h2>
                <button onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
        </div>

        {/* Sort by */}
        <section>
          <h3>Sort by</h3>
          <div className="chip-group">
            {["bestmatch", "trending", "latest", "priceAsc", "priceDesc"].map((s) => (
              <button
                className={filters.sort === s ? "chip-selected" : "chip"}
                onClick={() => setFilters({ ...filters, sort: s })}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* Location */}
        <section>
          <h3>Location</h3>
          {["Auckland", "Wellington", "Hamilton", "Christchurch"].map((loc) => (
            <label key={loc}>
              <input
                type="radio"
                name="location"
                value={loc}
                checked={filters.location === loc}
                onChange={() => setFilters({ ...filters, location: loc })}
              />
              {loc}
            </label>
          ))}
        </section>

        {/* Colour */}
        <section>
          <h3>Colour</h3>
          {["White", "Black", "Brown", "Grey", "Pink", "Blue"].map((c) => (
            <label key={c}>
              <input
                type="radio"
                name="colour"
                value={c}
                checked={filters.colour === c}
                onChange={() => setFilters({ ...filters, colour: c })}
              />
              {c}
            </label>
          ))}
        </section>

      </div>

      <button className="apply-btn" onClick={onClose}>
        Apply Filter
      </button>
    </div>
  );
}
