process.env.MONGO_URL="mongodb://localhost:27017";
const { getCarTypes } = require("../../main/mongo/dao/AutocompleteDAO");
getCarTypes("bol").then(arr=>console.log(arr));
