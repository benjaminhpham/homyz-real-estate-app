import "./PropertyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { truncate } from "lodash";

interface PropertyCardProps {
  card: {
    image: string;
    price: string;
    title: string;
    description: string;
  };
}

export default function PropertyCard({ card }: PropertyCardProps) {
  const { image, price, title, description } = card;
  return (
    <div className="flexColStart r-card">
      <AiFillHeart size={24} color="white" />
      <img src={image} alt={title} />

      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{price}</span>
      </span>

      <span className="primaryText">{truncate(title, { length: 15 })}</span>
      <span className="secondaryText">
        {truncate(description, { length: 80 })}
      </span>
    </div>
  );
}
