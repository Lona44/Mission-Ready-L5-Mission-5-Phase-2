import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ComparisonPage.css";

import DesktopFilterPanel from "../components/comparison/DesktopFilterPanel.jsx";
import MobileFilterModal from "../components/comparison/MobileFilterModal.jsx";
import ComparisonItem from "../components/comparison/ComparisonItem.jsx";

import { getAuctions } from "../services/api.js";

export default function ComparisonPage() {

  // Detect mobile screen size
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track if the user has clicked "Apply Filters" in mobile mode
  const [mobileApplied, setMobileApplied] = useState(false); // ★ IMPORTANT

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [searchParams] = useSearchParams();
  const idsString = searchParams.get("ids");
  const idsArray = idsString ? idsString.split(",") : [];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reset all filters
  const clearAllFilters = () => {
    setFilters({
      q: "",
      sort: "bestmatch",
      location: [],
      colour: [],
      minPrice: "",
      maxPrice: "",
    });

    // If user clears filters in mobile, the alert should disappear again
    setMobileApplied(false); // ★ OPTIONAL but logical
  };

  // Filter state
  const [filters, setFilters] = useState({
    q: "",
    sort: "bestmatch",
    location: [],
    colour: [],
    minPrice: "",
    maxPrice: "",
  });

  // Show/hide Mobile Filter Modal
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  /* Load auctions whenever filters or URL ids change */
  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        let res;
        if (idsArray.length > 0) {
          // Comparison mode: fetch selected items
          res = await getAuctions({
            ids: idsArray.join(","),
            ...filters,
          });
        } else {
          // Browsing mode: fetch all matching items
          res = await getAuctions({ ...filters });
        }

        setItems(res.data);
      } catch (err) {
        console.error("Comparison fetch error:", err);
      }

      setLoading(false);
    }

    load();
  }, [idsString, filters]);

  // Remove item from comparison list
  const handleRemove = (removeId) => {
    const newIds = idsArray.filter((id) => id !== removeId);
    const newQuery = newIds.join(",");

    if (newIds.length === 0) {
      window.location.href = `/comparison`;
    } else {
      window.location.href = `/comparison?ids=${newQuery}`;
    }
  };

  return (
    <div className="comparison-container">
      <div className="comparison-page">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/my-trademe">My TradeMe</a>
          <span>/</span>
          <span className="current">Compare</span>
        </nav>

        <div className="comparison-title-row">
          <h1 className="comparison-title">Comparison Tool</h1>

          {/* Filter button for Desktop or Mobile */}
          <div className="filter-button-wrapper">
            <button
              className="filter-btn-desktop main-filter"
              onClick={() => {
                if (isMobile) {
                  setShowMobileFilter(true);
                } else {
                  document.querySelector(".dfp-left")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              <img src="/Vector.png" alt="filter icon" className="filter-icon" />
              <span className="filter-text">Filters</span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="cmp-search-wrapper">
          <div className="cmp-search-input">
            <img src="/searchicon.png" className="cmp-search-icon" alt="search" />
            <input
              type="text"
              placeholder="Search all of trade me"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            />

            {/* Filter chips */}
            <div className="cmp-chip-container">
              {filters.location.map((loc) => (
                <div key={loc} className="cmp-chip">
                  {loc}
                  <span
                    className="cmp-chip-remove"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        location: filters.location.filter((x) => x !== loc),
                      })
                    }
                  >
                    ✕
                  </span>
                </div>
              ))}

              {filters.colour.map((col) => (
                <div key={col} className="cmp-chip">
                  {col}
                  <span
                    className="cmp-chip-remove"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        colour: filters.colour.filter((x) => x !== col),
                      })
                    }
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>

            {/* Clear filters button */}
            <button
              className="cmp-search-btn"
              onClick={
                filters.location.length || filters.colour.length
                  ? clearAllFilters
                  : () => {}
              }
            >
              {filters.location.length || filters.colour.length
                ? "Clear filters"
                : "Search"}
            </button>
          </div>
        </div>

        {/* NOTE SECTION */}
        <div className="comparison-note">
          <strong>NOTE:</strong> Search for the item you want to compare
          <br />
          Make sure to use the Filter system to find a product that fits your
          preference
        </div>

        {/* Desktop filter panel */}
        {!isMobile && (
          <div className="dfp-wrapper">
            <DesktopFilterPanel
              filters={filters}
              setFilters={setFilters}
              selectedProduct={items[0]}
              matchedProducts={items.slice(1)}
              clearFilters={clearAllFilters}
            />
          </div>
        )}

        {/* Product List */}
        <div className="comparison-list">
          {loading && <p>Loading...</p>}

          {!loading &&
            items
              .filter((item) => item)
              .map((item, index) => (
                <React.Fragment key={item._id}>
                  
                  <ComparisonItem
                    product={item}
                    onRemove={() => handleRemove(item._id)}
                  />

                  {/* 
                    ★ IMPORTANT:
                    Only show the "matched products" alert in mobile mode
                    AND only after the user clicked "Apply Filters"
                    AND only after the first item (index === 0)
                    AND only if there are matched items (items.length > 1)
                  */}
                  {isMobile &&
                    mobileApplied &&
                    index === 0 &&
                    items.length > 1 && (
                      <div
                        className="dfp-alert"
                        style={{ marginTop: "10px" }}
                      >
                        These are other products we found that matched what you are looking for!
                      </div>
                    )}
                </React.Fragment>
              ))}
        </div>

        {/* MOBILE FILTER MODAL */}
        {isMobile && showMobileFilter && (
          <MobileFilterModal
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearAllFilters}
            onClose={() => setShowMobileFilter(false)}

            // ★ The key link: when mobile user clicks Apply Filters
            onApply={() => {
              setMobileApplied(true);  // mark that user applied filters
              setShowMobileFilter(false);
            }}
          />
        )}
      </div>
    </div>
  );
}