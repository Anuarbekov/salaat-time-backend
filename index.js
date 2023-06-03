import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const getDate = () => {
  const today = new Date();
  const day =
    today.getDate() > 9 ? today.getDate() : "0" + today.getDate().toString();
  const month =
    today.getMonth() + 1 > 9
      ? (today.getMonth() + 1).toString()
      : "0" + (today.getMonth() + 1).toString();
  const year = today.getFullYear().toString();
  const date = day + "-" + month + "-" + year;
  return date;
};

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Default page!" });
  } catch (err) {
    res.json(err);
  }
});

app.get("/oskemen", async (req, res) => {
  try {
    const data = await axios.get(
      "https://namaz.muftyat.kz/kk/api/times/2023/49.95/82.616667"
    );
    res.send(data.data.result.find((namaz) => namaz.date === getDate()));
  } catch (err) {
    res.json(err);
  }
});

app.get("/almaty", async (req, res) => {
  try {
    const data = await axios.get(
      "https://namaz.muftyat.kz/kk/api/times/2023/43.238293/76.945465"
    );
    console.log(data.data.result.find((namaz) => namaz.date === getDate()));
    res.send(data.data.result.find((namaz) => namaz.date === getDate()));
  } catch (err) {
    res.json(err);
  }
});

app.listen(8080, () => {
  console.log("8080 port");
});
