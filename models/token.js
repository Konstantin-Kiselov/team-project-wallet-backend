const { Schema, model } = require("mongoose");

const TokenSchema = Schema({
    tokenId: String,
    UserId: String
});

const Token = model("token", TokenSchema);

module.exports = Token;