"use client";
import React, { FormEvent, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HeroSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function search(event: FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    router.push("/" + "?" + createQueryString("search", target.value));
  }
  return (
    <div className="flex items-center bg-gray-900 p-2 rounded-full shadow-custom-shadow">
      <div className="relative flex items-center flex-grow">
        <span className="absolute left-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.293 14.707a8 8 0 111.414-1.414l4.586 4.586a1 1 0 01-1.414 1.414l-4.586-4.586zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search token"
          className="w-full pl-10 pr-4 py-2 bg-gray-900 text-gray-300 focus:outline-none"
          onInput={search}
        />
      </div>
      <button className="bg-[#EFCF5A] text-gray-900 px-6 py-2 rounded-full font-medium">
        Search
      </button>
    </div>
  );
}

export default HeroSearchBar;
