process.env.MONGO_URL="mongodb://localhost:27017";
const { getCities } = require("../../main/mongo/dao/AutocompleteDAO");
getCities("Andhra pRadesh").then(arr=>console.log(arr));
