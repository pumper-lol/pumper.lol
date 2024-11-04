import React, { useEffect, useRef } from "react";

interface ReCAPTCHAProps {
  sitekey: string;
  onChange: (token: string | null) => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    onReCAPTCHALoad?: () => void;
  }
}

const ReCAPTCHA: React.FC<ReCAPTCHAProps> = ({ sitekey, onChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | Node | undefined | null>(null);

  useEffect(() => {
    // Load the reCAPTCHA script
    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=onReCAPTCHALoad`;
    script.async = true;
    script.defer = true;

    // Define the callback function
    window.onReCAPTCHALoad = () => {
      if (containerRef.current) {
        window.grecaptcha.render(containerRef.current, {
          sitekey: sitekey,
          callback: onChange,
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      // Only remove the script if it exists and is still in the document
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      if (window.onReCAPTCHALoad) {
        window.onReCAPTCHALoad = undefined;
      }
    };
  }, [sitekey, onChange]);

  return <div ref={containerRef} />;
};

export default ReCAPTCHA;
