const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getAllStarterCards, getSingleCard } = require("../controllers/cards");

//These represent the very basic of the basic and nothing particularly complicated for now

// @desc Show all starter cards
// @route GET /cards/
// This should show all the cards of type: starter
router.get("/", getAllStarterCards);

// @desc  Show add page/starter page based on starter card id
// @route GET /cards/cardId
// This should navigate you to editing page with the starter information
router.get("/:cardId", getSingleCard);

// @desc Create new user card
// @route POST /cards/:cardId
// This should enable you to save the user card at the very first point

// @desc Shows the card with the matching id
// @route GET /cards/:id? SignOnly | ViewOnly
// ViewOnly being for the recipient and SignOnly being for the editors of the card
router.get("/:cardId", getSingleCard);

// @desc Update user card
// @route PUT /cards/:id
// This should allow you to update the card
// You might need to go as far as determining where in the card the information would need to be displayed in and whatnot but that would be something to worry about for another time

// @desc Shows all cards created by a specific user
// @route GET /cards/users/:userId/
// You can then further sort then by received / in the process or not

//Late feature stuff and not particularly important or that useful
// @desc Delete user card
// @route DELETE /cards/:id
// This is highly important as this might risk the final recipient that card if they log in to request it/hence another copy of the card might need to be made for the recipient to save if they do have an account//

module.exports = router;
