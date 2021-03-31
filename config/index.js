import dotenv from "dotenv";

// load env vars into process.env
dotenv.config();

export default {
  token: process.env.TOKEN,
  canal: process.env.CANAL,
  env: process.env.ENV,
};
