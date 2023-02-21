
process.env.MONGO_URL="mongodb://localhost:27017";
const { getIndexCards } = require("../../main/mongo/dao/ServicesDAO");



getIndexCards("customer").then(data=>console.log(data));