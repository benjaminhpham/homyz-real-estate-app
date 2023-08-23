import { HiLocationMarker } from "react-icons/hi";

export default function SearchBar() {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input type="text" />
      <button className="button">Search</button>
    </div>
  );
}
