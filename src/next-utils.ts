import next from "next"; // instance of next.js server, which will handle incoming requests and serve your application

const PORT = Number(process.env.PORT) || 3000; // read a PORT value from your environment variables or default to 3000 if not set

export const nextApp = next({
  dev: process.env.NODE_ENV !== "production", // Checks if you're in development mode
  port: PORT,
});

export const nextHandler = nextApp.getRequestHandler(); // Get the request handler from the Next.js instance, which will be used to handle all incoming HTTP requests to your server
