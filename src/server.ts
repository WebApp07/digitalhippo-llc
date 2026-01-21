import express from "express";
import { getPayloadClient } from "./get-payload";

const app = express();
const PORT = Number(process.env) || 3000;

const start = async () => {
  const payload = await getPayloadClient();
};

start();
