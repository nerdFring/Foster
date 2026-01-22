import crypto from 'crypto'

export const generateVerifyToken=()=>{
    const verifyToken=crypto.randomBytes(32).toString("hex")

  const hashedToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

    return {verifyToken,hashedToken}
}


