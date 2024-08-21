import { env } from "process";
import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: `${env.PINATA_JWT}`,
  pinataGateway: `${env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
});
