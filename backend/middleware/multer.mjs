import multer from 'multer'

const storage = multer.diskStorage({
    filename:function (request,file,callback){
        callback(null,file.fieldname + '-' + new Date.now() + Path2D.extname(file.originalname))
    }
})

const upload  = multer({storage:storage})

export default upload