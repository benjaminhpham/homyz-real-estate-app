import { useQuery } from "@tanstack/react-query";
import "./Property.css";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";

export default function Property() {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  console.log(id);

  const { data, isLoading, isError } = useQuery(["allProperties", id], () =>
    getProperty(id)
  );

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error While fetching the property details</span>
        </div>
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
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like Button */}
        <div className="like">
          <AiFillHeart size={24} color="white" />
        </div>

        {/* Image */}
        <img src={data?.image} alt="" />
      </div>
    </div>
  );
}
