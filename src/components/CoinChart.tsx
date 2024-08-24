"use client";
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const GET_TRADES = gql`
  query Trades($token: String!) {
    sells(where: { token: $token }) {
      amount
      block_number
      contractId_
      id
      price
      seller
      timestamp_
      token
      transactionHash_
    }
    buys(where: { token: $token }) {
      amount
      block_number
      buyer
      id
      contractId_
      price
      timestamp_
      token
      transactionHash_
    }
  }
`;

interface Trade {
  amount: string;
  block_number: string;
  contractId_: string;
  id: string;
  price: string;
  timestamp_: string;
  token: string;
  transactionHash_: string;
  seller?: string;
  buyer?: string;
}

export function CoinChart({ coin }: { coin: Coin }) {
  const { loading, error, data } = useQuery<{ sells: Trade[]; buys: Trade[] }>(
    GET_TRADES,
    {
      variables: { token: coin.address },
    },
  );

  useEffect(() => {
    console.log(data, error, loading);
  }, [data, error, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <div></div>;
}
