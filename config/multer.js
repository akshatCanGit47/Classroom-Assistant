const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
})

const upload = multer({storage:storage});

module.exports = upload;