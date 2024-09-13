import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada :)");
    server.listen(PORT, () => {
      console.log(`Servidor funcionando en el puerto ${PORT} :)`);
    });
  })
  .catch(error => console.log("Error al conectar la base de datos:", error));
