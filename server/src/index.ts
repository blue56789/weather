import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import path from "path";

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "../../client/dist")));
if (process.env.DEV)
  app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
  });

app.get("/api", (req, res) => {
  res.send("Hello World");
});
app.get("/api/coords", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Please provide a query" });
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.API_KEY}`
  );
  const json = await response.json();
  if (!response.ok) res.status(400);
  res.json(json);
});
app.get("/api/loc", async (req, res) => {
  const { lat, lon } = req.query;
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.API_KEY}`
  );
  const json = await response.json();
  if (!response.ok) res.status(400);
  res.json(json);
});
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
  );
  const json = await response.json();
  if (!response.ok) res.status(400);
  res.json(json);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
