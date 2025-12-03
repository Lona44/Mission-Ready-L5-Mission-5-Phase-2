import React from "react";
import "./DesktopFilterPanel.css";

export default function DesktopFilterPanel({ filters, setFilters }) {
  return (
    <div className="desktop-filter-panel">

      {/* Sort By */}
      <section>
        <h3>Sort by</h3>
        <div className="chip-group">
          {["bestmatch", "trending", "latest", "priceAsc", "priceDesc"].map((s) => (
            <button
              key={s}
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
        <div className="chip-group">
          {["Auckland", "Wellington", "Hamilton", "Christchurch"].map((loc) => (
            <button
              key={loc}
              className={filters.location === loc ? "chip-selected" : "chip"}
              onClick={() => setFilters({ ...filters, location: loc })}
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* Colour */}
      <section>
        <h3>Colour</h3>
        <div className="chip-group">
          {["White", "Black", "Brown", "Grey", "Pink", "Blue"].map((c) => (
            <button
              key={c}
              className={filters.colour === c ? "chip-selected" : "chip"}
              onClick={() => setFilters({ ...filters, colour: c })}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h3>Price</h3>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
      </section>

    </div>
  );
}
