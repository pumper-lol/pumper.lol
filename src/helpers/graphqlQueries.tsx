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
