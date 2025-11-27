"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import { manufacturers } from "@/constants";

interface Props {
  manufacturer: string;
  setManufacturer: (manufacturer: string | null) => void;
}

const SearchManufacturer = ({ manufacturer, setManufacturer }: Props) => {
  const [query, setQuery] = useState("");
  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Image
              src="/icons/carlogo.svg"
              height={20}
              width={20}
              className="pointer-events-none"
              alt="Car Logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Volkswagen..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="search-manufacturer__options">
              {filteredManufacturers.length === 0 && query !== "" ? (
                <div className="cursor-default select-none py-2 px-4 text-gray-500">
                  Nothing found.
                </div>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className="search-manufacturer__option"
                  >
                    {item}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
