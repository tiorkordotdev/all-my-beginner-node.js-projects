const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

//get all quotes
app.get("/api/quotes/random", (req, res) => {
  const data = getRandomElement(quotes);
  res.send({ quote: data });
});

//get quotes by author or return all quotes if there are no query params
app.get("/api/quotes", (req, res) => {
  const parameterValues = Object.values(req.query);
  if (parameterValues.length !== 0) {
    const newQuotes = [];
    for (let quote of quotes) {
      if (req.query.person === quote.person) {
        newQuotes.push(quote);
      }
    }
    return res.send({ quotes: newQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

//add new quote to quotes array
app.post("/api/quotes", (req, res) => {
  if (req.query.quote && req.query.person) {
    const newQuote = { quote: req.query.quote, person: req.query.person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
});
