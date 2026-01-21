import dotenv from "dotenv";
import path from "path";
import payload from "payload";
import { InitOptions } from "payload/config";

//find the .env file one folder above this file, and load it.
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Get the cached Payload instance from the global object (if it exists)
let cached = (global as any).payload;

// If Payload is NOT cached yet
if (!cached) {
  // Create a new cache object and store it globally
  // This ensures Payload is initialized only once
  cached = (global as any).payload = {
    client: null, // Will hold the ready Payload client
    promise: null, // Will hold the initialization promise
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({ initOptions }: Args = {}) => {
  // We cannot start Payload without it, because it's used for security
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD SECRET is missing");
  }

  // If the Payload client is already created, return it immediately
  if (cached.client) {
    return cached.client;
  }

  // If the client is not yet initialized, start Payload
  // We store the promise in cache so multiple requests can wait for the same initialization
  if (!cached.client) {
    cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }
  try {
    // Wait for the Payload client to finish initializing
    // This is like waiting for the kitchen to be ready
    cached.client = await cached.promise;
  } catch (e: unknown) {
    // If something goes wrong while starting Payload:
    // Reset the promise so the next request can try again
    // Throw the error so the caller knows something failed
    cached.promise = null;
    throw e;
  }

  // Return the ready-to-use Payload client
  // Now the caller can use it to interact with the backend safely
  return cached.client;
};
