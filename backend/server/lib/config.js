import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT;
const URI = process.env.DATABASE_URI;
const SECRET = process.env.JWT_SECRET;
// const NODEMAILER_USER = process.env.NODEMAILER_USER;
// const NODEMAILER_PASS = process.env.NODEMAILER_PASS;
const DEV_HREF = process.env.DEV_HREF;
const PROD_HREF = process.env.PROD_HREF;
const BASE_HREF = process.env.BASE_HREF;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export { PORT, URI, SECRET, BASE_HREF, RESEND_API_KEY };
