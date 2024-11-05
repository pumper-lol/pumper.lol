import { useState, useEffect } from "react";

interface ReCaptchaHookProps {
  siteKey: string;
}

interface ReCaptchaHookReturn {
  isLoading: boolean;
  executeReCaptcha: (action: string) => Promise<string>;
  error: Error | null;
}

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (
          siteKey: string,
          options: { action: string },
        ) => Promise<string>;
      };
    };
  }
}

export const useReCaptcha = ({
  siteKey,
}: ReCaptchaHookProps): ReCaptchaHookReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Load ReCaptcha script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setError(new Error("Failed to load ReCaptcha"));
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [siteKey]);

  const executeReCaptcha = async (action: string): Promise<string> => {
    if (!window.grecaptcha?.enterprise) {
      throw new Error("ReCaptcha not initialized");
    }

    try {
      return new Promise((resolve, reject) => {
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(siteKey, {
              action,
            });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      });
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    isLoading,
    executeReCaptcha,
    error,
  };
};
