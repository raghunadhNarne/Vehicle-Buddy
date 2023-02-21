process.env.MONGO_URL="mongodb://localhost:27017";
const { getLocations } = require("../../main/mongo/dao/AutocompleteDAO");
getLocations("gunt").then(arr=>console.log(arr));
