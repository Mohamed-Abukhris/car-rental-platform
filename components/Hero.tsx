"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">Premium Cars, Exceptional Driving</h1>

        <p className="hero__subtitle">
          Fast search, instant booking, and a smooth rental experience—anytime,
          anywhere.
        </p>

        <Button
          onClick={handleScroll}
          className="bg-primary-blue text-white rounded-full mt-10 book-overview_btn"
        >
          Explore Cars
        </Button>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image
            src="/icons/hero.png"
            alt="hero"
            fill
            className="object-contain"
          />
          <div className="hero__image-overlay">
            <Image src="/icons/hero-bg.png" alt="overlay" fill />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
