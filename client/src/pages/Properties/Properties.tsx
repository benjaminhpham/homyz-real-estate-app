import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import "./Properties.css";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function Properties() {
  const { data, isError, isLoading, refetch } = useProperties();

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error While fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar />

        <div className="paddings flexCenter properties">
          {data.map((card: any, index: number) => (
            <PropertyCard card={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
