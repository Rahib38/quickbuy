import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api");

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Quick Server..",
  });
  
});
// app.use(globalErrorHandler);

// app.use(notFound);

export default app;
