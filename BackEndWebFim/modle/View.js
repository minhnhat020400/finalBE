const mongoose= require('mongoose')
const ViewInfo= mongoose.Schema({
    _idU:String,
    _idF:String,
    viewOn:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('viewInfo',ViewInfo)