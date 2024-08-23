"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/dist")));
if (process.env.DEV)
    app.use((req, res, next) => {
        console.log(req.url, req.method);
        next();
    });
app.get("/api", (req, res) => {
    res.send("Hello World");
});
app.get("/api/coords", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    if (!query)
        return res.status(400).json({ error: "Please provide a query" });
    const response = yield fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.API_KEY}`);
    const json = yield response.json();
    if (!response.ok)
        res.status(400);
    res.json(json);
}));
app.get("/api/loc", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    const response = yield fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.API_KEY}`);
    const json = yield response.json();
    if (!response.ok)
        res.status(400);
    res.json(json);
}));
app.get("/api/weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
    const json = yield response.json();
    if (!response.ok)
        res.status(400);
    res.json(json);
}));
app.listen(port, () => console.log(`Server listening on port ${port}`));
