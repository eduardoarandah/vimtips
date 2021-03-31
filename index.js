import telegram from "./services/telegram.js";

// obtener todo lo que recibe el bot
const updates = await telegram.getUpdates();

// hacerlo bonito para la consola
const prettified = JSON.stringify(updates, null, 4);
console.log(prettified);
