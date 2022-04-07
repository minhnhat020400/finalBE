const mongoose= require('mongoose');
const FilmModel= require('../modle/Film.js');
const Rating = require('./rate');

//module tạo 1 phim mới
module.exports.UpNewFilm=async function(data){
    const newfilm = new FilmModel({
        nameMovie:data.nameMovie,
        Discription:data.Discription,
        time:data.time,
        rate:data.rate,
        viewNunber:data.viewNunber,
        rateNumber:data.rateNumber,
        minimumAge:data.minimumAge,
        quality:data.quality,
        createOn:data.createOn,
        poster:data.poster,
        videoLink:data.videoLink,
        trailerLink:data.trailerLink,
        category:data.category
    });
    const savefilm= await newfilm.save();
    return savefilm;
}
//module lấy film
module.exports.Getnewfilm= async function(qery){
    const json= FilmModel.find().sort({createOn:-1}).limit(qery);
    return json;
}

module.exports.GetAllFilm=async function(qery){
    const json= FilmModel.find().sort({createOn:-1});
    return json;
}

//module cập nhật lượt xem
module.exports.UpdateView= async function(v){
    console.log(v.body);
    const f= await FilmModel.findById({ _id: v.body._idF});
    const view= parseInt(f.viewNunber)+1;
    const json= await FilmModel.updateOne({ _id: v.body._idF}, { $set: { viewNunber:view.toString()}});
}

//module cập nhật rate
module.exports.UpDateRating = async function(data){
    console.log(data.body);
    const f= await FilmModel.findById({ _id: data.body._idF});
    const rate= parseInt(f.rateNumber)+parseInt(data.body._numberRating);
    const view= parseInt(f.rate)+1;
    const json= await FilmModel.updateOne({ _id: data.body._idF}, { 
        $set: { rateNumber:rate.toString(), rate:view.toString()}
    });
    return json;
}

//module tìm kiếm phim
module.exports.FindFilm = async function(nameFilm){
    console.log(nameFilm);
    const filmFinded= await FilmModel.find({nameMovie:new RegExp(nameFilm, "i")});
    // ({$and: {nameMovie: new RegExp('^'+nameFilm+'$', "i")}})
    return filmFinded; 
}

//module tìm film thao thể loại
module.exports.FindCate = async function(cate){
    console.log(cate);
    const filmFinded= await FilmModel.find({category:new RegExp(cate, "i")});
    // ({$and: {nameMovie: new RegExp('^'+nameFilm+'$', "i")}})
    return filmFinded; 
}

