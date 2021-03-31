import fetch from "node-fetch";
import config from "../config/index.js";

export default {
  // Obtener todos los mensajes
  // https://core.telegram.org/bots/api#getupdates
  async getUpdates() {
    const { bot, token } = config;
    const url = `https://api.telegram.org/bot${bot}:${token}/getUpdates`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  },
};
