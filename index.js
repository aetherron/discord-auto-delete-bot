const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;
const TARGET_CHANNEL_ID = "1485818085012148344";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('threadCreate', async (thread) => {
  try {
    // Only target your ⏳・stories forum
    if (thread.parentId !== TARGET_CHANNEL_ID) return;

    console.log(`Tracked thread: ${thread.name}`);

    setTimeout(async () => {
      try {
        await thread.delete();
        console.log(`Deleted: ${thread.name}`);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }, 24 * 60 * 60 * 1000); // 24 hours

  } catch (err) {
    console.error(err);
  }
});

client.login(TOKEN);