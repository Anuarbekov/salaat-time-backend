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
const getPrayerTimesWithNext = (todayNamazTime) => {
  const now = new Date();
  const prayerTimes = Object.entries(todayNamazTime)
    .filter(([key]) => key !== "date")
    .map(([name, time]) => {
      const [hours, minutes] = time.trim().split(":").map(Number);
      const prayerDate = new Date(now);
      prayerDate.setHours(hours, minutes, 0, 0);
      return { name, time: time.trim(), date: prayerDate };
    });
  console.log(prayerTimes);
  let nextPrayerFound = false;
  const result = prayerTimes.map(({ name, time, date }) => {
    const isNext = !nextPrayerFound && date < now;
    if (isNext) nextPrayerFound = true;
    return { name, time, isNext };
  });

  return result;
};
app.get("/", async (req, res) => {
  try {
    res.json({ message: "Default page of namaz-time-backend" });
  } catch (err) {
    res.json(err);
  }
});

app.get("/oskemen", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://namaz.muftyat.kz/kk/api/times/${new Date().getFullYear()}/49.948325/82.627848`
    );
    res.send(getPrayerTimesWithNext(
      data.result.find((namaz) => namaz.date === getDate())
    ));
  } catch (err) {
    res.json(err);
  }
});

app.get("/almaty", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://namaz.muftyat.kz/kk/api/times/${new Date().getFullYear()}/43.238293/76.945465`
    );
    res.send(getPrayerTimesWithNext(
      data.result.find((namaz) => namaz.date === getDate())
    ));
  } catch (err) {
    res.json(err);
  }
});

app.get("/astana", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://namaz.muftyat.kz/kk/api/times/${new Date().getFullYear()}/51.133333/71.433333`
    );
    res.send(getPrayerTimesWithNext(
      data.result.find((namaz) => namaz.date === getDate())
    ));
  } catch (err) {
    res.json(err);
  }
});

app.get("/shymkent", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://namaz.muftyat.kz/kk/api/times/${new Date().getFullYear()}/42.368009/69.612769`
    );
    res.send(getPrayerTimesWithNext(
      data.result.find((namaz) => namaz.date === getDate())
    ));
  } catch (err) {
    res.json(err);
  }
});

app.listen(8080, () => {
  console.log("8080 port");
});
