const mongoose= require('mongoose');
const UserModel= require('../modle/User.js');
const emailSender= require('../EmailSender.js')

//module đăng ký
module.exports.signUp=async function (data){
    console.log(data.body+"data");
    var userExists= await UserModel.findOne({email:data.body.email});
    if(userExists)
    {
        console.log(userExists)
        return undefined;
    }
    //tạo người dùng mới
    const Theuser=new UserModel({
        email:data.body.email,
        name:data.body.name,
        password:data.body.password,
        imgUser:data.body.imgUser,
        age:data.body.age
    });
    const saveUser= await Theuser.save();
    return saveUser;
}

// module đăng nhập
module.exports.signIn= async function(data){
    var json = await UserModel.findOne({ $and: [{ email: data.email }, { password: data.password }] });
    return json;
}
// module lay mk
module.exports.forgetPass = async function(email){
    const findEmail =await UserModel.findOne({email:email});
    if(!findEmail){
        console.log(email);
        return undefined;
    }else{
        const content=`mật khẩu cũ của bạn là : ${findEmail.password}`
        console.log(content);
        const title ='mem Gửi lại bạn mật khẩu'
        emailSender.sendEmail(email,title,content)
        .then((result)=>console.log('email is sended: ' ,result))
        .catch((error)=>console.log(error.message));
        return true;
    }

}
