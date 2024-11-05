"use server";
import axios, { AxiosError } from "axios";

interface VerifyReCaptchaProps {
  token: string;
  expectedAction: string;
  siteKey: string;
}

interface ReCaptchaResponse {
  name: string;
  event: {
    expectedAction: string;
    tokenProperties: {
      valid: boolean;
      hostname: string;
      action: string;
      createTime: string;
    };
    riskAnalysis: {
      score: number;
    };
  };
  tokenProperties: {
    valid: boolean;
  };
}

export async function verifyReCaptcha({
  token,
  expectedAction,
  siteKey,
}: VerifyReCaptchaProps): Promise<boolean> {
  try {
    const { data } = await axios.post<ReCaptchaResponse>(
      "https://recaptchaenterprise.googleapis.com/v1/projects/decasoft/assessments",
      {
        event: {
          token,
          expectedAction,
          siteKey,
        },
      },
      {
        params: {
          key: process.env.RECAPTCHA_API_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(data);
    return (
      data.tokenProperties.valid &&
      data.tokenProperties.action === expectedAction &&
      data.riskAnalysis.score > 0.5 // Adjust threshold as needed
    );
  } catch (error: AxiosError) {
    console.error("ReCaptcha verification failed:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return false;
  }
}
