import React, { useEffect, useRef } from "react";

interface ReCAPTCHAProps {
  sitekey: string;
  onChange: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onReCAPTCHALoad: () => void;
  }
}

const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({ sitekey, onChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load the reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCAPTCHALoad`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Define the callback function
    window.onReCAPTCHALoad = () => {
      if (containerRef.current) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: sitekey,
          callback: onChange,
        });
      }
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.onReCAPTCHALoad;
    };
  }, [sitekey, onChange]);

  return <div ref={containerRef} />;
};

export default ReCAPTCHA;
