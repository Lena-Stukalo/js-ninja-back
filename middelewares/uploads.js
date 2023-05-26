const multer = require('multer');
const path = require('path');
const { RequestError } = require("../helpers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+ext)
    }
  })
  
  const upload = multer({ storage: storage,
fileFilter: function(req, file, cb){
    if(file.mimetype==="image/png"|| file.mimetype==="image/jpeg"){
        cb(null,true)
    }else{
      throw  RequestError(400,'Only png & jpg type suported')
    }
},
limits:1024*1024*2 })

  module.exports=upload;