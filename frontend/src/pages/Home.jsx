import React from "react";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import { collections } from "../assets/dummyData";

const Home = () => {
  return (
    <>
      <Hero />
      <h1 className="text-center text-4xl font-normal  mb-6 mt-10">
        Khám phá bộ sưu tập độc đáo của Wukudada
      </h1>
      <div className="mb-[50px]">
        <FeaturedCollection collections={collections} />
      </div>
    </>
  );
};

export default Home;
