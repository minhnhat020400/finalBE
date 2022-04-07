const mongoose= require('mongoose');
const ViewModle= require('../modle/View.js');
const film= require('./controler.film.js')
module.exports.ViewFilm= async function(data){
    const newView= new ViewModle({
        _idF:data.body._idF,
        _idU:data.body._idU,
        viewOn:data.body.viewOn
    })
    const saveView= await newView.save();
    return saveView;
}