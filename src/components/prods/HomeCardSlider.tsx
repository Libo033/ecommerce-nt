"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { IHomeCard } from "@/libs/interfaces";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import HomeCard from "./HomeCard";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/autoplay";

/* https://codesandbox.io/p/devbox/swiper-react-autoplay-pdrc53 */

const HomeCardSlider: React.FC<{ title: string; cards: Array<IHomeCard> }> = ({
  title,
  cards,
}) => {
  const [slides, setSlides] = useState<number>(0);

  useEffect(() => {
    if (document) {
      let width = document.body.offsetWidth;
      console.log(width);
      
      if (width >= 1172) {
        setSlides(4);
      } else if (width < 1172 && width >= 850) {
        setSlides(3);
      } else if (width < 850 && width >= 640) {
        setSlides(2);
      } else if (width < 640 && width >= 210) {
        setSlides(1);
      }
    }
  }, []);

  return (
    <div className={styles.HomeCardSlider}>
      <p className={styles.HomeCardSlider_Title}>{title}</p>
      <section className={styles.HomeCardSlider_Section}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={3}
          slidesPerView={slides}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {cards.length > 0 &&
            cards.map((card) => (
              <SwiperSlide
                style={{ display: "flex", justifyContent: "center" }}
                key={card._id}
              >
                <HomeCard {...card} />
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </div>
  );
};

export default HomeCardSlider;
