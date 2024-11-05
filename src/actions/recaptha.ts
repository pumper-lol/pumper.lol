"use server";
import axios, { AxiosError } from "axios";

interface VerifyReCaptchaProps {
  token: string;
  expectedAction: string;
  siteKey: string;
}

interface ReCaptchaResponse {
  name: string;
  riskAnalysis: {
    score: number;
  };
  tokenProperties: {
    valid: boolean;
    hostname: string;
    action: string;
    createTime: string;
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

    return (
      data.tokenProperties.valid &&
      data.tokenProperties.action === expectedAction &&
      data.riskAnalysis.score > 0.5 // Adjust threshold as needed
    );
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("ReCaptcha verification failed:", {
      status: axiosError.response?.status,
      data: axiosError.response?.data,
      message: axiosError.message,
    });
    return false;
  }
}
