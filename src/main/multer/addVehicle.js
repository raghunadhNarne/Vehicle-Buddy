var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/images/addVehicle")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage,limits: { fileSize: '5mb' }}).single("image");

module.exports = {upload};