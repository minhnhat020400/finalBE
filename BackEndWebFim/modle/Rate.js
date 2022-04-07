const mongoose= require('mongoose')
const RateInfo= mongoose.Schema({
    _idU:String,
    _idF:String,
    _numberRating:String,
    RateOn:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('RateInfo',RateInfo)