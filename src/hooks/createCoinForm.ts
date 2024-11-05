"use client";

import { FormEvent, useState } from "react";
import * as yup from "yup";
import { createCoin } from "@/actions/coin";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import { useLaunchpadDeployer } from "@/hooks/dapp";
import { useReCaptcha } from "@/hooks/recaptcha";
import { verifyReCaptcha } from "@/actions/recaptha";

export type Input = {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
  twitterUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  discordUrl: string;
  token: string;
};

export function useCreateCoinForm() {
  const { deployCoin } = useLaunchpadDeployer();
  const account = useAccount();
  const router = useRouter();

  const { executeReCaptcha } = useReCaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
  });

  const [input, setInput] = useState<Input>({
    name: "",
    symbol: "",
    description: "",
    image: null,
    twitterUrl: "",
    telegramUrl: "",
    websiteUrl: "",
    discordUrl: "",
    token: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function setField(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setInput((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function setToken(token: string) {
    setInput((prev: Input) => ({ ...prev, token }));
  }

  function setImage(e: any) {
    const target = e.target as HTMLFormElement;
    if (!target.files?.length) return;
    setInput((prev) => ({ ...prev, image: target.files[0] }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      await validate(input);
    } catch (error: any) {
      setValidationErrors(error.errors);
      setLoading(false);
      return;
    }

    try {
      const token = await executeReCaptcha("create_coin");
      if (
        !(await verifyReCaptcha({
          token,
          expectedAction: "create_coin",
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string,
        }))
      ) {
        setError("ReCaptcha verification failed");
        return;
      }

      const address = await deployCoin(input.name, input.symbol);
      if (!address) {
        setError("Failed to deploy coin");
        return;
      }
      const body = jsonToFormData(input);
      body.append("address", address);
      body.append("creatorAddress", account?.address as string);
      const coin = await createCoin(body);
      router.push(`/c/${coin.address}`);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validationErrors,
    setField,
    setImage,
    handleSubmit,
    setToken,
  };
}

function jsonToFormData(json: Record<string, any>) {
  const formData = new FormData();
  for (const key in json) {
    formData.append(key, json[key]);
  }
  return formData;
}

async function validate(input: Input) {
  await yup
    .object({
      name: yup.string().required(),
      symbol: yup.string().required(),
      description: yup.string().required(),
      image: yup.mixed().required(),
      twitterUrl: yup.string().url(),
      telegramUrl: yup.string().url(),
      websiteUrl: yup.string().url(),
      discordUrl: yup.string().url(),
    })
    .validate(input, { abortEarly: false });
}
