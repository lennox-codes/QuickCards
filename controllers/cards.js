const Card = require("../models/Card");

const getAllStarterCards = async (req, res) => {
  try {
    const cards = await Card.find({ type: "starter" });
    if (cards) res.json(cards);
  } catch (error) {
    console.log(error);
  }
};

const getSingleCard = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    const card = await Card.findById(cardId);
    if (card) res.json(card);
  } catch (error) {
    console.log(error);
  }
};

const createNewCard = async (req, res) => {};

module.exports = { getAllStarterCards, getSingleCard, createNewCard };
