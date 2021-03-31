import telegram from "./services/telegram.js";
import conf from "./config/index.js";
const { env } = conf;

// obtener todo lo que recibe el bot
// const messages = await telegram.getMessages();

// lo mismo, pero evitando duplicidades al usar "offset" (checar docu de telegram api)
const messages = await telegram.getMessagesRecursive();

// mensajes recibidos
env == "dev" && console.log("Mensajes: \n" + JSON.stringify(messages, null, 4));

// mensajes filtrados
const tips = telegram.filterTips(messages);
env == "dev" && console.log("Filtrados: \n" + JSON.stringify(tips, null, 4));

// reenviar
// telegram.forward eas async, entonces usaremos Promise.all para esperar que todo se ejecute
const reenviados = await Promise.all(
  tips.map(async (tip) => telegram.forward(tip))
);
env == "dev" &&
  console.log("Reenviados: \n" + JSON.stringify(reenviados, null, 4));
