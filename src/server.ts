import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";

const app = express();
const PORT = Number(process.env) || 3000;

const start = async () => {
  // Initialize Payload CMS using our shared getPayloadClient helper
  // This ensures Payload starts only once and is reused everywhere
  const payload = await getPayloadClient({
    // Attach Payload to the existing Express app
    // This allows Payload Admin and APIs to run on the same server
    initOptions: {
      express: app,

      // This function runs ONCE when Payload has fully started
      onInit: async () => {
        // Log the Admin panel URL in the console
        // Example: http://localhost:3000/admin
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    },
  });

  // Route ALL incoming HTTP requests through Next.js handler
  app.use((req, res) => nextHandler(req, res));

  // Prepare Next.js (compile pages, set up routing, load configuration)
  // This runs asynchronously and doesn't block the server from starting
  nextApp.prepare().then(() => {
    payload.logger.info(`Next.js server is ready on port ${PORT}`);
  });

  // Start the Express server and listen for incoming requests on the specified PORT
  app.listen(PORT, async () => {
    payload.logger.info(
      `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`,
    );
  });
};

start();
