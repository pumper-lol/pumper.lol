"use client";
import React, { useEffect, useRef, useCallback } from "react";

interface ReCaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  theme?: "light" | "dark";
  size?: "compact" | "normal";
  tabindex?: number;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({
  siteKey,
  onVerify,
  theme = "light",
  size = "normal",
  tabindex = 0,
}) => {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const handleCallback = useCallback(
    (token: string) => {
      onVerify(token);
    },
    [onVerify],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const renderReCaptcha = () => {
        if (!captchaRef.current) return;
        widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
          sitekey: siteKey,
          callback: handleCallback,
          theme,
          size,
          tabindex,
        });
      };

      if (window.grecaptcha) {
        renderReCaptcha();
      } else {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.onload = renderReCaptcha;
        document.body.appendChild(script);
      }
    }

    return () => {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [siteKey, theme, size, tabindex, handleCallback]);

  return <div ref={captchaRef} />;
};

export default ReCaptcha;

// Usage Example
// const App: React.FC = () => {
//   const handleVerify = (token: string) => {
//     console.log('Verified:', token);
//   };
//
//   return (
//     <div>
//       <h1>ReCaptcha Demo</h1>
//       <ReCaptcha
//         siteKey="YOUR_RECAPTCHA_SITE_KEY"
//         onVerify={handleVerify}
//         theme="light"
//         size="normal"
//       />
//     </div>
//   );
// };

// export default App;

declare global {
  interface Window {
    grecaptcha: {
      render: (element: HTMLElement, options: any) => number;
      reset: (widgetId: number) => void;
    };
  }
}
