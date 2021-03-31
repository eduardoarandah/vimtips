import dotenv from "dotenv";

// load env vars into process.env
dotenv.config();

export default {
  bot: process.env.BOT,
  chat: process.env.CHAT,
  token: process.env.TOKEN,
};
