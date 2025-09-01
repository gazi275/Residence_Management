import { Server } from "http";
// import app from "./app";
// import seedSuperAdmin from "./app/DB";
import config from "./config/index";
import { PrismaConnection } from "./app/DB/PrismaConnection";
import app from "./app";


const port = config.port || 5000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log("Sever is running on port ", port);
    PrismaConnection()
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
  // Graceful shutdown: log error and close server if needed
  // Optionally, implement a shutdown function to close DB, etc.
  // For now, just log error
  // Do not use process.exit(1) in production
  // Example: server.close(() => process.exit(1));
  // But here, just log
  // Optionally notify admin/devops
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
