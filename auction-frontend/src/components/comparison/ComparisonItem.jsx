import "./ComparisonItem.css";

export default function ComparisonItem({ product }) {
  if (!product) return null;

  return (
    <div className="cmp-item">

      {/* images on the left */}
      <div className="cmp-item__img">
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>

      {/* middle content */}
      <div className="cmp-item__content">
        <div className="cmp-item__location">
          {product.location}
        </div>

        <h3 className="cmp-item__title">{product.title}</h3>

        <div className="cmp-item__reserve">
          Reserve met<br />${product.reserve_price}
        </div>

        <button className="cmp-item__note-btn">Add note</button>
      </div>

      {/* right price */}
      <div className="cmp-item__right">
        <div className="cmp-item__check">✔</div>
        <div className="cmp-item__price">Buy now ${product.buy_now_price}</div>
      </div>
    </div>
  );
}