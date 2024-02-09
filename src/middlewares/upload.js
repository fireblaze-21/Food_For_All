const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads'));        
    },
    filename : function(req, file, cb) {
        const name = Date.now() + Math.round(Math.random() * 100000) + path.extname(file.originalname);
        cb(null, name);
    }
});
const upload = multer({
    storage,
    fileFilter :  function(req, file, cb) { 
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
            cb(null, true);
        else {
            cb(null, false);
            return cb(new Error("Only .jpg, .jpeg, .png format allowed"));
        }
    },
    limits : {
        fileSize : 1024 * 1024
    }
});
module.exports = upload;