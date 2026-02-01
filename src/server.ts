import express from "express";
import { getPayloadClient } from "./get-payload";

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
};

start();
