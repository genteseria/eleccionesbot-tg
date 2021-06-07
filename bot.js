const Telegraf = require('telegraf').Telegraf
const axios = require('axios')

const bot = new Telegraf(process.env.ELECCIONESBOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Hola " + ctx.from.first_name + " :) bienvenido a este bot.");
})

bot.help((ctx) => {
    ctx.reply("Escribe /elecciones para consultar los resultados de las elecciones en Perú");
})

bot.settings((ctx) => {
    ctx.reply("No contamos con Ajustes disponibles aún. Si te preocupa tu privacidad, no recolectamos ningún dato o mensaje tuyo :)")
})


bot.command('elecciones', (ctx) => {
    ctx.reply("⏳Un segundo...")
    axios.get('https://api.resultadossep.eleccionesgenerales2021.pe/results/10/000000?name=param')
        .then(response => {
            mensaje = "✅ Bien, aquí van los datos de las elecciones en Perú:\n\n🗳🇵🇪"
            const {generalData} = response.data.generals;
            const {results} = response.data;
            const {actData} = response.data.generals;
            mensaje += "\n\nAl " + generalData.POR_ACTAS_PROCESADAS + "% de actas procesadas."
            mensaje += "\n\n🟠 Keiko Fujimori: " + results[1].POR_VALIDOS + "% (" + results[1].TOTAL_VOTOS + " votos válidos)"; 
            mensaje += "\n\n✏️ Pedro Castillo: " + results[0].POR_VALIDOS + "% (" + results[0].TOTAL_VOTOS + " votos válidos)"; 
            mensaje += "\n\n🚫 Votos Nulos: " + results[4].POR_EMITIDOS + "% (" + results[4].TOTAL_VOTOS + " votos)"; 
            mensaje += "\n\n🏳️ Votos en Blanco: " + results[3].POR_EMITIDOS + "% (" + results[3].TOTAL_VOTOS + " votos)"; 
            mensaje += "\n\n🇵🇪 TOTAL DE VOTOS: " + results[5].TOTAL_VOTOS;
            mensaje += "\n\n🕒 Última actualización de la ONPE: " + actData.FECHA + " a las " + actData.HORA 
            ctx.reply(mensaje);
        })
        .catch(error => {
            console.log(error);
        })
    
})

bot.launch()
