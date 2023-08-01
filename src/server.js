import express from "express";
import "dotenv/config";
import registerRoute from "./routes/register.js";
import Io from "./helper/Io.js";
import Decoder from "./middlewares/decoder.js";
const app = express();

app.use(express.json());
app.use(registerRoute);

app.get("/", Decoder, async (req, res) => {
  //reading data
  const data = new Io("./db/users.json");
  const users = await data.read();

  //sending response data 
  res.json(users);
});

app.listen(process.env.PORT, (err) =>
  err
    ? console.log(err.message)
    : console.log("listening on port " + process.env.PORT)
);
