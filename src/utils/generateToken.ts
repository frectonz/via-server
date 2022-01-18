import { randomBytes } from "crypto";

export default function generateToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(48, (err, buf) => {
      if (err) {
        reject();
      }
      resolve(`${Date.now()}-${buf.toString("hex")}`);
    });
  });
}
