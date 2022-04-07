const ModelComment =require('../modle/Boxcomment.js')
module.exports.addComment= async function(data){
    console.log(data.body);
    const newComment= new ModelComment({
        idU:data.body.idU,
        idF:data.body.idF,
        content:data.body.content,
        imgUser:data.body.imgUser,
        userName:data.body.userName,
        datecomment:data.body.datecomment
    });
    const saveComment= await newComment.save();
    return saveComment;
}
module.exports.loadComment = async function(idF) {
    const loadComent = ModelComment.find({ idF:idF}).sort({datecomment:-1});
    return loadComent;
}