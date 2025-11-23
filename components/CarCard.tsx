"use client";
import React from "react";
import { estimateCarRent } from "@/utils";

interface Car {
  class: string;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  make: string;
  model: string;
  transmission: string;
  year: number;
}
interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const { year, make, model, drive, displacement, fuel_type } = car;
  const carRent = estimateCarRent(year, displacement, fuel_type, drive);
  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__title">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          $
        </span>
        {carRent}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /day
        </span>
      </p>
    </div>
  );
};
export default CarCard;
