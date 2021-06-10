const Card = require("../models/Card");

const getAllStarterCards = async (req, res) => {
  try {
    const cards = await Card.find({ type: "starter" });
    if (cards) res.json(cards);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getSingleCard = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    const card = await Card.findById(cardId);
    if (card) res.json(card);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createNewCard = async (req, res) => {};

module.exports = { getAllStarterCards, getSingleCard, createNewCard };
