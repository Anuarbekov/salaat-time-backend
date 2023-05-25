import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
app.use(cors());

const today = new Date();
const day = today.getDate().toString();
const month =
  today.getMonth() + 1 > 9
    ? (today.getMonth() + 1).toString()
    : "0" + (today.getMonth() + 1).toString();
const year = today.getFullYear().toString();
const date = day + "-" + month + "-" + year;

app.get("/oskemen", async (req, res) => {
  const data = await axios.get(
    "https://namaz.muftyat.kz/kk/api/times/2023/49.95/82.616667"
  );
  res.send(data.data.result.find((namaz) => namaz.date === date));
});

app.get("/almaty", async (req, res) => {
  const data = await axios.get(
    "https://namaz.muftyat.kz/kk/api/times/2023/43.238293/76.945465"
  );
  res.send(data.data.result.find((namaz) => namaz.date === date));
});
app.listen(8080, () => {
  console.log("8080 port");
});
