import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import "swiper/css";
import "./Residencies.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";

export default function Residencies() {
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
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButton />
          {data.slice(0, 8).map((card: any, index: number) => (
            <SwiperSlide key={index}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

const SliderButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
