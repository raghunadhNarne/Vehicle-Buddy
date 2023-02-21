process.env.MONGO_URL="mongodb://localhost:27017";
const { getStates } = require("../../main/mongo/dao/AutocompleteDAO");
getStates().then(arr=>console.log(arr));
