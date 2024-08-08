"use client";
import React, { FC, useState } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  selected: string | null;
  onSelect?: (option: string) => void;
};

const Dropdown: FC<DropdownProps> = (
  { label, options, onSelect, selected } = {},
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(selected);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="py-2 px-4 w-full text-left flex justify-between items-center"
      >
        <span>
          {label}: {selectedOption}
        </span>
        <svg
          className="w-5 h-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 14z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-[#303030] bg-opacity-80 rounded-md">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className="cursor-pointer hover:bg-gray-600 text-gray-100 py-2 px-4"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
