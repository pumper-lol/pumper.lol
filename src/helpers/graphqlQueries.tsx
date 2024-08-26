import { gql } from "@apollo/client";

export const GET_TRADES = gql`
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
