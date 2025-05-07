import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import cookieParser from 'cookie-parser';
import notFound from "./app/utils/notFound";
import globalErrorHandler from "./app/utils/globalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",router);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "QuickBuy Server running..",
  });
  
});
app.use(globalErrorHandler);

app.use(notFound);

export default app;
