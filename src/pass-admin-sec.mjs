import "dotenv/config";
import HmacSHA256 from "crypto-js/hmac-sha256.js";
import Base64 from "crypto-js/enc-base64.js";
import { request, gql, resolveRequestDocument } from "graphql-request";

export default async function handler() {
  const KEY = process.env["PASS_ADMIN_SEC_KEY"];
  const SECRET = process.env["PASS_ADMIN_SEC_SECRET"];

  const url = process.env["PASS_ADMIN_URL"];

  const urlObj = new URL(url);
  const resource = `${urlObj.pathname}${urlObj.search}`;

  const document = gql`
    query user($userAddress: Address!) {
      user(userAddress: $userAddress) {
        id
      }
    }
  `;

  const variables = {
    userAddress: "0x09F9aB1ae48CcBD39D4b07643b0CdEB658d97da5",
  };

  const { operationName, query } = resolveRequestDocument(document);

  const body = JSON.stringify({
    query,
    variables,
    operationName,
  });

  const now = Date.now();
  const msg = `${now}POST${resource}${body}`;
  const sig = HmacSHA256(msg, SECRET).toString(Base64);

  const requestHeaders = {
    "x-qubic-api-key": KEY,
    "x-qubic-ts": now.toString(),
    "X-qubic-sign": sig,
  };

  try {
    const result = await request({
      url,
      document,
      variables,
      requestHeaders,
    });

    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
