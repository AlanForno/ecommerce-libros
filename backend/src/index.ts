import express, { type Request, type Response } from "express";
import { AppRoutes } from "./routes/routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(AppRoutes.routes);

app.get('/', (req: Request, res: Response) => {
    
});

app.listen(PORT, () => {
    console.log('Corriendo servidor en el puerto ' + PORT);
})