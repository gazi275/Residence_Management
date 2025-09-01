import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// export const port = process.env.PORT  
// export const jwt_secret = process.env.TOKEN_SECRET

export default {
    port : process.env.PORT,
    secretToken : process.env.TOKEN_SECRET,
    jwt_secret : process.env.TOKEN_SECRET as string,
    DO_SPACE_ENDPOINT : process.env.DO_SPACE_ENDPOINT,
    DO_SPACE_ACCESS_KEY : process.env.DO_SPACE_ACCESS_KEY,
    DO_SPACE_SECRET_KEY : process.env.DO_SPACE_SECRET_KEY,
    DO_SPACE_BUCKET : process.env.DO_SPACE_BUCKET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}