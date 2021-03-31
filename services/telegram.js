import fetch from "node-fetch";
import config from "../config/index.js";

export default {
  // Obtener todos los mensajes
  // probar manualmente con: source .env && curl -s https://api.telegram.org/bot$TOKEN/getUpdates
  // https://core.telegram.org/bots/api#getupdates
  async getMessages(offset = 0) {
    const { token } = config;
    const url = `https://api.telegram.org/bot${token}/getUpdates?allowed_updates=["message"]&offset=${offset}`;
    const res = await fetch(url);
    let data = await res.json();
    return data.result;
  },

  // para evitar duplicidades, necesitamos llamar esta función con un offset mayor al último mensaje,
  // de esa manera, telegram entiende que ya no queremos recibir mensajes anteriores al offset
  // esta función se llama a sí misma, hasta no obtener más mensajes
  async getMessagesRecursive(offset = 0) {
    const { env, token } = config;
    const url = `https://api.telegram.org/bot${token}/getUpdates?allowed_updates=["message"]&offset=${offset}`;
    const res = await fetch(url);
    let data = await res.json();
    let messages = data.result;

    // no hay mensajes nuevos, regresar
    if (!messages.length) {
      env == "dev" && console.log("no hay nuevos mensajes");
      return [];
    }

    // llamar de nuevo, recursivamente, tomando el nuevo offset
    let nuevoOffset = messages[messages.length - 1].update_id + 1;
    env == "dev" &&
      console.log(
        `${messages.length} msg nuevos! buscar con offset ${nuevoOffset}`
      );
    const newMessages = await this.getMessagesRecursive(nuevoOffset);
    // si existen, juntarlos
    if (newMessages) return [...messages, ...newMessages];
    else return messages;
  },

  // que cosa es un tip y que no
  isTip(message) {
    return message.message.text.includes("#tip");
  },

  // filtrar tips
  filterTips(messages) {
    return messages.filter((message) => this.isTip(message));
  },

  // forward message
  // probar manualmente:
  // MESSAGE_ID=70
  // source .env && curl -s https://api.telegram.org/bot$TOKEN/forwardMessage?chat_id=$CANAL&from_chat_id=-1001336359989&message_id=$MESSAGE_ID
  // https://core.telegram.org/bots/api#forwardmessage
  async forward(message) {
    const { token, canal } = config;
    const fromChatId = message.message.chat.id;
    const messageId = message.message.message_id;
    const url = `https://api.telegram.org/bot${token}/forwardMessage?chat_id=${canal}&from_chat_id=${fromChatId}&message_id=${messageId}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  },
};
