"use client";
import { useState } from "react";
import { ButtonConnectWallet } from "@/components/ButtonConnectWallet";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
        {!isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_49_9831)">
              <path
                d="M20 18C20.2549 18.0003 20.5 18.0979 20.6854 18.2728C20.8707 18.4478 20.9822 18.687 20.9972 18.9414C21.0121 19.1958 20.9293 19.4464 20.7657 19.6418C20.6021 19.8373 20.3701 19.9629 20.117 19.993L20 20H4C3.74512 19.9997 3.49997 19.9021 3.31463 19.7272C3.1293 19.5522 3.01777 19.313 3.00283 19.0586C2.98789 18.8042 3.07067 18.5536 3.23426 18.3582C3.39786 18.1627 3.6299 18.0371 3.883 18.007L4 18H20ZM20 11C20.2652 11 20.5196 11.1054 20.7071 11.2929C20.8946 11.4804 21 11.7348 21 12C21 12.2652 20.8946 12.5196 20.7071 12.7071C20.5196 12.8946 20.2652 13 20 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H20ZM20 4C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5C21 5.26522 20.8946 5.51957 20.7071 5.70711C20.5196 5.89464 20.2652 6 20 6H4C3.73478 6 3.48043 5.89464 3.29289 5.70711C3.10536 5.51957 3 5.26522 3 5C3 4.73478 3.10536 4.48043 3.29289 4.29289C3.48043 4.10536 3.73478 4 4 4H20Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_49_9831">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_49_9860)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9999 13.414L17.6569 19.071C17.8455 19.2532 18.0982 19.3539 18.3603 19.3517C18.6225 19.3494 18.8734 19.2442 19.0588 19.0588C19.2442 18.8734 19.3493 18.6226 19.3516 18.3604C19.3539 18.0982 19.2531 17.8456 19.0709 17.657L13.4139 12L19.0709 6.343C19.2531 6.15439 19.3539 5.90179 19.3516 5.6396C19.3493 5.3774 19.2442 5.12659 19.0588 4.94118C18.8734 4.75577 18.6225 4.6506 18.3603 4.64832C18.0982 4.64604 17.8455 4.74684 17.6569 4.929L11.9999 10.586L6.34295 4.929C6.15349 4.75134 5.90236 4.65436 5.64268 4.65858C5.38299 4.6628 5.13514 4.76788 4.95155 4.95159C4.76797 5.1353 4.66307 5.38323 4.65903 5.64292C4.655 5.9026 4.75216 6.15367 4.92995 6.343L10.5859 12L4.92895 17.657C4.83343 17.7492 4.75725 17.8596 4.70484 17.9816C4.65244 18.1036 4.62485 18.2348 4.62369 18.3676C4.62254 18.5004 4.64784 18.6321 4.69812 18.755C4.7484 18.8778 4.82266 18.9895 4.91655 19.0834C5.01044 19.1773 5.1221 19.2515 5.24499 19.3018C5.36789 19.3521 5.49957 19.3774 5.63235 19.3762C5.76513 19.3751 5.89635 19.3475 6.01835 19.2951C6.14035 19.2427 6.2507 19.1665 6.34295 19.071L11.9999 13.414Z"
                fill="#FAFAFA"
              />
            </g>
            <defs>
              <clipPath id="clip0_49_9860">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute top-20 right-0 left-0 py-8 px-6 z-50 bg-black border-t border-[#333741]">
          <ul className="flex flex-col justify-center gap-3 gap-y-7 mx-auto text-base w-full">
            <li>
              <a href="#" className="hover:underline font-medium">
                How it Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-medium">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline font-medium">
                Community
              </a>
            </li>
          </ul>
          <div className="mt-16">
            <ButtonConnectWallet />
          </div>
        </div>
      )}
    </>
  );
}
