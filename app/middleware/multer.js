const multer = require('multer');
const path = require('path');
const fs = require('fs');


const uploadMiddleware = async(req, res, next) => {

        if (!fs.existsSync("./upload")) {
        fs.mkdirSync("./upload");
         }

        let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

let upload = multer({ storage: storage });
   
   await upload.single('image_data')(req, res, function (err) {
        if (err) {
            return res.status(422).json({
                status: 'fail',
                message: err,
                data: {}
            });
        }
        next();
    });
};
module.exports = {uploadMiddleware};
