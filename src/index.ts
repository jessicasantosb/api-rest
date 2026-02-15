import { Knex } from "./server/database/knex";
import { server } from "./server/Server";
import { PORT } from "./server/utils/port";

const chalk = import("chalk").then((m) => m.default);

const startServer = async () => {
  const _chalk = await chalk;

  server.listen(PORT, () =>
    console.log(
      _chalk.blueBright(`
      _____                             
     / ____|                            
    | (___   ___ _ ____   _____ _ __    
     \\___ \\ / _ \\ '__\\ \\ / / _ \\ '__|
     ____) |  __/ |   \\ V /  __/ |     
    |_____/ \\___|_|    \\_/ \\___|_|     
    `),
      _chalk.greenBright(`\n[✨] Serving awesomeness since now!\n`),
      _chalk.magentaBright(
        `\n[🚀] ${_chalk.bold(`Listening for requests on:`)} ${_chalk.underline(
          `http://localhost:${PORT}`
        )}`
      )
    )
  );
};

const init = async () => {
  if (process.env.IS_LOCALHOST === "true") return startServer();

  try {
    await Knex.migrate.latest();
    await Knex.seed.run();
    startServer();
  } catch (error) {
    console.log(error);
  }
};

init();
