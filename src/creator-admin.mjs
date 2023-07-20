import "dotenv/config";
import HmacSHA256 from "crypto-js/hmac-sha256.js";
import Base64 from "crypto-js/enc-base64.js";
import { request, gql } from "graphql-request";

export default async function handler() {
  const KEY = process.env["CREATOR_ADMIN_KEY"];
  const SECRET = process.env["CREATOR_ADMIN_SECRET"];

  const url = process.env["CREATOR_ADMIN_URL"];

  const urlObj = new URL(url);
  const resource = `${urlObj.pathname}${urlObj.search}`;

  const now = Date.now();
  const msg = `${now}POST${resource}`;
  const sig = HmacSHA256(msg, SECRET).toString(Base64);

  const requestHeaders = {
    "x-qubic-api-key": KEY,
    "x-qubic-ts": now.toString(),
    "X-qubic-sign": sig,
  };

  const document = gql`
    query shop {
      shop {
        id
      }
    }
  `;

  try {
    const result = await request({
      url,
      document,
      requestHeaders,
    });

    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
