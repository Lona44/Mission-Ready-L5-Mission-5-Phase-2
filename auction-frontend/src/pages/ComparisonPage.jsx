import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ComparisonPage.css";

import DesktopFilterPanel from "../components/comparison/DesktopFilterPanel.jsx";
import MobileFilterModal from "../components/comparison/MobileFilterModal.jsx";
import ProductCard from "../components/shared/ProductCard.jsx";

import { getAuctions } from "../services/api.js";

export default function ComparisonPage() {
  const [searchParams] = useSearchParams();
  const idsString = searchParams.get("ids"); // "id1,id2,id3"
  const idsArray = idsString ? idsString.split(",") : [];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filters, setFilters] = useState({
    q: "",
    sort: "bestmatch",
    location: "",
    colour: "",
    minPrice: "",
    maxPrice: ""
  });

  // Mobile filter modal
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Desktop filter panel toggle (UX: clicking “Search” expands filter)
  const [showDesktopFilter, setShowDesktopFilter] = useState(false);

  // Fetch data
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    async function load() {
      if (!idsArray.length) return;

      setLoading(true);

      try {
        const res = await getAuctions({
          ids: idsArray.join(","),
          ...filters
        });
        setItems(res.data);
      } catch (err) {
        console.error("Comparison fetch error:", err);
      }

      setLoading(false);
    }

    load();
  }, [idsString, filters]);

  // Remove item
  const handleRemove = (removeId) => {
    const newIds = idsArray.filter((id) => id !== removeId);
    const newQuery = newIds.join(",");
    window.location.href = `/comparison?ids=${newQuery}`;
  };

  return (
    <div className="comparison-page">

      {/* --- Search + Filter Bar --- */}
      <div className="comparison-header">
        <input
          type="text"
          placeholder="Search to filter items..."
          value={filters.q}
          onChange={(e) => setFilters({ ...filters, q: e.target.value })}
        />

        {/* Desktop filter button */}
        <button 
          className="filter-btn-desktop" 
          onClick={() => setShowDesktopFilter(!showDesktopFilter)}
        >
          Filter
        </button>

        {/* Mobile filter button */}
        <button 
          className="filter-btn-mobile"
          onClick={() => setShowMobileFilter(true)}
        >
          Filter
        </button>
      </div>

      <div className="comparison-body">

        {/* Desktop filter panel */}
        {showDesktopFilter && (
          <DesktopFilterPanel
            filters={filters}
            setFilters={setFilters}
          />
        )}

        {/* Product list */}
        <div className="comparison-list">
          {loading && <p>Loading...</p>}

          {!loading && items.map((item) => (
            <ProductCard 
              key={item._id}
              product={item}
              onRemove={() => handleRemove(item._id)}
            />
          ))}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilter && (
        <MobileFilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowMobileFilter(false)}
        />
      )}

    </div>
  );
}
