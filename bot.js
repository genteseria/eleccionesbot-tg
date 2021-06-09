const Telegraf = require('telegraf').Telegraf
const axios = require('axios')

const bot = new Telegraf(process.env.ELECCIONESBOT_TOKEN)

bot.start((ctx) => {
    ctx.reply("Hola " + ctx.from.first_name + " :) bienvenido/a a este bot. Escribe /elecciones para conocer los resultados actuales.");
})

bot.help((ctx) => {
    ctx.reply("Escribe /elecciones para consultar los resultados de las elecciones en Perú");
})

bot.settings((ctx) => {
    ctx.reply("No contamos con Ajustes disponibles aún. Si te preocupa tu privacidad, no recolectamos ningún dato o mensaje tuyo :)")
})


bot.command('elecciones', (ctx) => {
    axios.get('https://api.resultadossep.eleccionesgenerales2021.pe/results/10/000000?name=param')
        .then(response => {
            console.log(response.data);
	    let mensaje = "Resultados de las elecciones en Perú:\n\n🗳🇵🇪"
            if(response.data.generals.generalData){
		const {generalData} = response.data.generals;
		mensaje += "\n\nAl " + generalData.POR_ACTAS_PROCESADAS + "% de actas procesadas."
	    }
	    const {results} = response.data;
            const {actData} = response.data.generals;
            mensaje += "\n\n🟠 Keiko Fujimori: " + results[1].POR_VALIDOS + "% (" + results[1].TOTAL_VOTOS + " votos válidos)"; 
            mensaje += "\n\n✏️ Pedro Castillo: " + results[0].POR_VALIDOS + "% (" + results[0].TOTAL_VOTOS + " votos válidos)"; 
            dif_por = results[1].POR_VALIDOS - results[0].POR_VALIDOS;
	    vot1 = Number.parseInt(results[1].TOTAL_VOTOS.replace(',','').replace(',',''));
	    vot2 = Number.parseInt(results[0].TOTAL_VOTOS.replace(',','').replace(',',''));
	    console.log(vot1);
	    console.log(vot2);
	    dif_vot = vot1-vot2;
	    mensaje += "\n\n🪓Diferencia: " + dif_por + "% (" +  dif_vot + " votos válidos)";
	    mensaje += "\n\n🚫 Votos Nulos: " + results[4].POR_EMITIDOS + "% (" + results[4].TOTAL_VOTOS + " votos)"; 
            mensaje += "\n\n🏳️ Votos en Blanco: " + results[3].POR_EMITIDOS + "% (" + results[3].TOTAL_VOTOS + " votos)"; 
            mensaje += "\n\n🇵🇪 TOTAL DE VOTOS: " + results[5].TOTAL_VOTOS;
            mensaje += "\n\n🕒 Última actualización de la ONPE: " + actData.FECHA + " a las " + actData.HORA 
            ctx.reply(mensaje);
        })
        .catch(error => {
            ctx.reply("Tras 48 horas de mi existencia como bot, agradezco a todos por la oportunidad que me dieron de informarlos minuto a minuto de los resultados de este proceso electoral... Mis mejores deseos al pueblo peruano y a su presidente electo Pedro Castillo Terrones. Hasta siempre... ❤️");
        })
    
})

bot.command('autodestruccion', (ctx) => {
    ctx.reply('3...2...1... BOOM!');
})

bot.command('perro', (ctx) => {
    ctx.reply('🐶 woof!');
})

bot.command('pcgamer', (ctx) => {
    ctx.reply('Mmm... Soy más de Mac 👌');
})

bot.command('dado', (ctx) => {
    ctx.reply('🎲');
})

bot.launch()
