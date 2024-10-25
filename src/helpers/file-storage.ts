import { PinataSDK } from "pinata";
import { env } from "process";
import { S3, Endpoint } from "aws-sdk";

export const pinata = new PinataSDK({
  pinataJwt: `${env.PINATA_JWT}`,
  pinataGateway: `${env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
});

export const s3 = new S3({
  endpoint: new Endpoint(env.SPACES_ENDPOINT as string),
  credentials: {
    accessKeyId: env.SPACES_KEY as string,
    secretAccessKey: env.SPACES_SECRET as string,
  },
});
