/**
 * ProductCard Component
 */

import { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({
  product,
  showBookmark = false,
  onBookmarkClick,
  isWatchlisted = false,
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(isWatchlisted);
  const [isUpdating, setIsUpdating] = useState(false);

  const userId = "692f8df9790ef72851af2312";

  if (!product) return null;

  const {
    _id,
    title,
    description,
    category,
    location,
    colour,
    start_price,
    reserve_price,
    image, // ensure image field
  } = product;

  /** Unified image handler */
  const imageUrl = image || null;

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      if (isInWatchlist) {
        const response = await fetch("http://localhost:3000/api/watchlist", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            auction_id: _id,
          }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error);

        setIsInWatchlist(false);
        if (onBookmarkClick) onBookmarkClick(_id);
      } else {
        const response = await fetch("http://localhost:3000/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            auction_id: _id,
          }),
        });

        const result = await response.json();
        if (!response.ok && !result.error?.includes("Already watching"))
          throw new Error(result.error);

        setIsInWatchlist(true);
        if (onBookmarkClick) onBookmarkClick(_id);
      }
    } catch (err) {
      console.error(err);
      alert(
        `Failed to ${
          isInWatchlist ? "remove from" : "add to"
        } watchlist. Please try again.`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="product-card">
      {/* Bookmark button */}
      {showBookmark && (
        <button
          className="product-card__bookmark"
          onClick={handleBookmarkClick}
          disabled={isUpdating}
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
          style={{ opacity: isUpdating ? 0.6 : 1 }}
        >
          {/* Bookmark icons */}
          {isInWatchlist ? (
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect width="64" height="64" fill="#F6F5F4" />
              <path
                d="M0 0L32 34.2857L64 64H8C3.58172 64 0 60.4183 0 56V0Z"
                fill="#F9AF2C"
              />
              <path
                d="M25.9785 40.3486L17.3383 49.1074L14.0316 45.7479C13.8084 45.522 13.5057 45.395 13.1901 45.395C12.8744 45.395 12.5717 45.522 12.3486 45.7479C12.1254 45.9738 12 46.2803 12 46.5998C12 46.9193 12.1254 47.2257 12.3486 47.4517L16.4968 51.6511C16.7189 51.8746 17.0193 52 17.3324 52C17.6455 52 17.9459 51.8746 18.168 51.6511L27.6497 42.0524C27.8729 41.8281 27.9989 41.5231 28 41.2048C28.0011 40.8864 27.8772 40.5806 27.6556 40.3546C27.434 40.1287 27.1328 40.0011 26.8183 40C26.5038 39.9989 26.2017 40.1243 25.9785 40.3486Z"
                fill="#943900"
              />
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect width="64" height="64" fill="#F6F5F4" />
              <path
                d="M0 0L32 34.2857L64 64H8C3.58172 64 0 60.4183 0 56V0Z"
                fill="#F9AF2C"
              />
            </svg>
          )}
        </button>
      )}

      {/* IMAGE SECTION FIXED */}
      <div className="product-card__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="product-card__image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Placeholder (always here for onError fallback) */}
        <div
          className="product-card__placeholder-text"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          No Image
        </div>
      </div>

      {/* CONTENT BELOW */}
      <div className="product-card__content">
        <div className="product-card__location">
          <svg width="12" height="12" fill="#65605d">
            <circle cx="6" cy="6" r="2" />
          </svg>
          {location}
        </div>

        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__meta">
          <span className="product-card__category">{category}</span>
          {colour && <span className="product-card__colour">• {colour}</span>}
        </div>

        <p className="product-card__description">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>

        <div className="product-card__pricing">
          <div className="product-card__price">
            <span className="product-card__price-label">Starting price:</span>
            <span className="product-card__price-amount">
              ${start_price.toFixed(2)}
            </span>
          </div>

          {reserve_price && (
            <div className="product-card__reserve">
              Reserve: ${reserve_price.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}