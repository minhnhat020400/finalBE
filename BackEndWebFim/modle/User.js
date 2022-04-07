const mongoose= require('mongoose')
const UserSchema= mongoose.Schema({
    email:String,
    name:String,
    password:String,
    imgUser:String,
    age:String
})
module.exports=mongoose.model('user',UserSchema)