import { gql } from "@apollo/client";

export const GET_TRADES = gql`
  query Trades($token: String!) {
    tokenSolds(where: { token: $token }) {
      block_number
      contractId_
      fee
      id
      seller
      token
      timestamp_
      tokenAmount
      transactionHash_
      trxAmount
    }
    tokenPurchaseds(where: { token: $token }) {
      block_number
      buyer
      contractId_
      fee
      id
      timestamp_
      token
      tokenAmount
      tokenReserve
      transactionHash_
      trxAmount
    }
  }
`;

export const TOKEN_DATA_AT_TIME_QUERY = gql`
  query Token($timestamp: BigInt!, $token: String!) {
    tokenPurchaseds(
      first: 1
      where: { timestamp__lte: $timestamp, token: $token }
    ) {
      tokenAmount
      trxAmount
      timestamp_
    }
    tokenSolds(first: 1, where: { timestamp__lte: $timestamp, token: $token }) {
      tokenAmount
      trxAmount
      timestamp_
    }
  }
`;
