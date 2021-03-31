# vimtips
Tips de vim / neovim recopilados de vim_es en telegram 


# Modo de uso

Usar el Dockerfile para generar el container con python3 y python-telegram

`Docker built -t vimtips:latest .`

Editar el archivo .env con el TOKEN de tu bot

`source .env`

Correr el container en modo interactivo para ver los mensajes.
Este bot por el momento solo resopnde a los mensajes que comienzan con la palabra "#tip"
Resta ver que hacemos con los tips

`docker run -e MODE='dev' -e TOKEN=$TOKEN vimtips:latest -d`

En caso de querer correrlo en backgound

`docker run -d --name vimtips -e MODE='dev' -e TOKEN=$TOKEN vimtips:latest -d`

Para poder ver los logs ejecutar

`docker logs vimtips`

Si tu intención es seguir de manera interactiva los logs ejecutarlo asi:

`docker logs -f vimtips`
