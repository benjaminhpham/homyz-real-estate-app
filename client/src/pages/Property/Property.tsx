import { useQuery } from "@tanstack/react-query";
import "./Property.css";
import { useLocation } from "react-router-dom";
import { getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { FaShower } from "react-icons/fa";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";

export default function Property() {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

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

        <div className="flexCenter property-details">
          {/* Left Side */}
          <div className="flexColStart left">
            {/* Head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText">${data?.price}</span>
            </div>

            {/* Facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e872" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1f3e872" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e872" />
                <span>{data?.facilities?.parkings} Garages</span>
              </div>
            </div>

            {/* Description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* Address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span>
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* Booking Button */}
            <button className="button">Book Your Visit</button>
          </div>

          {/* Right Side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
