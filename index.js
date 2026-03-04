const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const jar = new tough.CookieJar();
const axiosInstance = wrapper(axios.create({ jar }));

client.on('messageCreate', async (message) => {
    if (message.content === "!start") {
        message.reply("🔄 Démarrage du serveur...");

        try {
            await axiosInstance.post("https://aternos.org/go/login", {
                user: process.env.ATER_USER,
                password: process.env.ATER_PASS
            });

            await axiosInstance.get("https://aternos.org/server/start");

            message.reply("✅ Serveur en cours de démarrage !");
        } catch (err) {
            message.reply("❌ Erreur lors du démarrage.");
            console.log(err);
        }
    }
});

client.login(process.env.TOKEN);
