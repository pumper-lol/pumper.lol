"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import * as yup from "yup";
import { createCoin } from "@/actions/coin";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

import { usePumperFactory } from "@/hooks/dapp";

export type Input = {
  name: string;
  symbol: string;
  description: string;
  image: File | null;
  twitterUrl: string;
  telegramUrl: string;
  websiteUrl: string;
  discordUrl: string;
};

export function useCreateCoinForm() {
  const { deployCoin } = usePumperFactory();
  const account = useAccount();
  const router = useRouter();

  const [input, setInput] = useState<Input>({
    name: "",
    symbol: "",
    description: "",
    image: null,
    twitterUrl: "",
    telegramUrl: "",
    websiteUrl: "",
    discordUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function setField(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setInput((prev) => ({ ...prev, [target.name]: target.value }));
  }

  function setImage(e: ChangeEvent<HTMLInputElement>) {
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
    } catch (error) {
      setValidationErrors(error.errors);
      setLoading(false);
      return;
    }

    try {
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
    } catch (error) {
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
