const mongoose= require('mongoose');
const RateModle= require('../modle/View.js');
const film= require('./controler.film.js')
// module rate film
module.exports.RateFilm= async function(data){
    const newRate= new RateModle({
        _idF:data.body._idF,
        _idU:data.body._idU,
        _numberRating:data.body._numberRating,
        viewOn:data.body.viewOn
    })
    const saveRate= await newRate.save();
    return saveRate;
}
//module xóa rate
module.exports.UnRatefilm = async function(data){
    const deleteRate= await RateModle.findOneAndDelete({_idF:data.body._idF});
    return deleteRate;
}

//module đếm số lượng film đc rate
module.exports.CountRating= async function(_idF){
    const Number = await RateModle.find({_idF:_idF});
    return Number.Count();
}

