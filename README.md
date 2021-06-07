# 🗳🤖 EleccionesBot-TG
Simple bot de Telegram que corre en Node.js con la ayuda de los módulos Telegraf y Axios.

## 💬 Comandos
- **/start** - inicia el bot
- **/help** - muestra el menú de Ayuda
- **/settings** - #TODO
- **/elecciones** - comando principal, muestra información de las elecciones, obtenida de la API de la ONPE

## ⚙️ Cómo alojar su propia instancia
Requisito: Crear un bot de Telegram utilizando [**BotFather**](https://t.me/BotFather) y tener a la mano el **token**.
Y luego ejecutar:
`git clone https://github.com/genteseria/eleccionesbot-tg`
``cd eleccionesbot-tg``

### 🐳 Con Docker
1. Colocar el **token** otorgado por BotFather en la línea 13 del **Dockerfile**.
2. ``docker build . -t genteseria/eleccionesbot-tg``
3. ``docker run -it genteseria/eleccionesbot-tg``

### 💻 Localmente
1. [Tener instalado Node.js y NPM en su sistema](https://nodejs.org/es/download/).
2. ``npm install``
3. Establecer la variable de entorno **ELECCIONESBOT_TOKEN** con el valor de su **token** de BotFather. [En Windows se puede hacer así](https://www.profesionalreview.com/2018/11/20/variables-entorno-windows-10/). Si estás en Linux/Unix puedes ponerla en tu .bashrc o .zshrc o directamente arrancar el bot con ``ELECCIONESBOT_TOKEN=tu-token node bot.js``
4. Arrancar el bot con ``node bot.js`

> *Adicional: Si se desea arrancar el bot en modo desarrollador con nodemon para reiniciarlo cada vez que se hagan cambios al código, ejecutar:* ``npm run dev``
