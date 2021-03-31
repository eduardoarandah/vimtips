import logging, os, sys

from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

# Enabling logging
logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger()

# Getting mode, so we could define run function for local and Heroku setup
mode = os.getenv("MODE")
TOKEN = os.getenv("TOKEN")

if mode == "dev":
    def run(updater):
        updater.start_polling()
elif mode == "prod":
    def run(updater):
        PORT = int(os.environ.get("PORT", "8443"))
        HEROKU_APP_NAME = os.environ.get("HEROKU_APP_NAME")
        # Code from https://github.com/python-telegram-bot/python-telegram-bot/wiki/Webhooks#heroku
        updater.start_webhook(listen="0.0.0.0",
                              port=PORT,
                              url_path=TOKEN)
        updater.bot.set_webhook("https://{}.herokuapp.com/{}".format(HEROKU_APP_NAME, TOKEN))
else:
    logger.error("No MODE specified!")
    sys.exit(1)


def readMessage(update, _: CallbackContext) -> None:
    """ 
    Leemos el mensaje y si nos sirve avanzamos 
    Vamos a tomar como validos aquellos mensajes de cualquier usuario que comienzen con la
    palabra "#tip" en minuscula y con el signo #
    """
    if "#tip" in update.message.text[0:4]:
        update.message.reply_text("tu mensaje sera guardado")
        logger.info(update.message.text)

if __name__ == '__main__':
    logger.info("Starting bot")
    updater = Updater(TOKEN)
    updater.dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, readMessage))
    run(updater)
