import React from "react";

const LoadingIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="10.5312"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        fill="#ADADAD"
        fillOpacity="0.6"
      />
      <rect
        x="3.03662"
        y="3.90625"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(-45 3.03662 3.90625)"
        fill="#ADADAD"
        fillOpacity="0.4"
      />
      <rect
        x="18.5928"
        y="2.53711"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(45 18.5928 2.53711)"
        fill="#ADADAD"
        fillOpacity="0.8"
      />
      <rect
        x="22.5"
        y="10.0312"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(90 22.5 10.0312)"
        fill="#ADADAD"
      />
      <rect
        x="13.7959"
        y="14.666"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(-45 13.7959 14.666)"
        fill="#ADADAD"
      />
      <rect
        x="7.8335"
        y="13.2969"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(45 7.8335 13.2969)"
        fill="#ADADAD"
        fillOpacity="0.1"
      />
      <rect
        x="7.28418"
        y="10.0312"
        width="1.93835"
        height="6.78421"
        rx="0.969173"
        transform="rotate(90 7.28418 10.0312)"
        fill="#ADADAD"
        fillOpacity="0.2"
      />
    </svg>
  );
};

export default LoadingIcon;
