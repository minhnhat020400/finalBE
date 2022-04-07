const mongoose= require('mongoose');
const boxchatSchema= mongoose.Schema({
    idF:String,
    idU:String,
    content:String,
    imgUser:String,
    userName:String,
    datecomment:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('boxComment',boxchatSchema)