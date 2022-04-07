const express= require('express')
const mongoose = require('mongoose')
const app=express()
const bodyParser= require('body-parser')
require('dotenv/config')
app.use(bodyParser.json())
//import router user
const controlers= require('./ControllersAPI/controller.user.js');
const filmControler = require('./ControllersAPI/controler.film');
const viewControler = require('./ControllersAPI/controler.view');
const filmquery= require('./filmQuery.js');
const commentControler= require('./ControllersAPI/controler.comment.js');



//api đăng ký tài khoản
app.post('/api/user/userSignUp',function (req,res){
    console.log(!req.body.name,!req.body.email );
    if(!req.body.name || !req.body.email || !req.body.password){
        res.json({err:1 , data:{}});
        return;
    }
    controlers.signUp(req).then(function (values){
        console.log(!values)
        if(!values){
            res.json({err:2, data:{}});
            return;
        }
        res.json(values);
    })

});

// api đăng nhập
app.get('/api/user/userSignIn', function (req, res) {
    if (!req.body.email || !req.body.password) { //mk hoac email bi bo trong
        res.json({ err: 1, data: {} }); 
        return;
    }
    var data = {
        email: req.body.email,
        password: req.body.password,

    }
    controlers.signIn(data).then(function (value) {
        if (!value) {//sai email hoac mk
            res.json({ err: 2, data: {} });
            return;
        }
        res.json({ err: 0, data: value });
    });
});

//api quên mk
app.post('/api/user/forgetpass',function(req,res){
    if(!req.body.email){
        console.log(req.body);
        res.json({err:1, data:{}});
        return;
    }
    controlers.forgetPass(req.body.email).then(function(value){
        if (!value) {//sai email
            res.json({ err: 2, data: {} });
            return;
        }
        res.json({ err: 0, data: 'mật khẩu đã được gửi về email'});
    })
})

//api up film
app.post('/api/film/postnewfilm',function(req,res){
    console.log(req.body);
    if(!req.body.nameMovie || !req.body.poster || !req.body.videoLink || !req.body.category){
        console.log(req.body);
        res.json({err:0 , data:{}});
        return;
    }else{
        filmControler.UpNewFilm(req.body).then(function(value){
            if(!value){
                res.json({err: 2, data:{}});
                return;
            }else{
                res.json(value);
            }
        });
    }
});

//api get phim moi
app.get('/api/film/listnewfilm',function(req,res){
    filmControler.Getnewfilm(filmquery.qrNewfilm).then(function(value){
        if(!value){
            res.json({err: 2, data:{}});
            return;
        }else{
            res.json({err: 0, data:{value}});
        }
    })
});

//api lay toan bo phim
app.get('/api/film/listallfilm',function(req,res){
    filmControler.GetAllFilm(filmquery.qrNewfilm).then(function(value){
        if(!value){
            res.json({err: 2, data:{}});
            return;
        }else{
            res.json({err: 0, data:{value}});
        }
    })
})

//api view phim
app.post('/api/view',function(req,res){
    if(!req.body._idF){
        res.json({err:1,data:{}})
        return;
    }else{
        viewControler.ViewFilm(req).then(function(value){
            if(!value) {
                res.json({err:2, dada:{}});
                return;
            }else {
                res.json(value);
            }
        }); 
    }
    filmControler.UpdateView(req);
    
});

// rate film
app.post('/api/rate', function(req,res){
    if(!req.body._idU || !req.body._idF || !req.body._numberRating)
    {
        res.json({err:1, data:{}});
        return;
    }
    else{
        filmControler.UpDateRating(req).then(function (value){
            if(!value){
                res.json({err:2,data:{}});
                return;
            }else{
                res.json(value);
            }
        })
    }
});

//api comment phim
app.post('/api/comment/addcomment',function(req,res){
    if(!req.body.idF || !req.body.idU || !req.body.userName || !req.body.imgUser || !req.body.content)
    {
        res.json({err:1, data:{}});
        return;
    }else{
        commentControler.addComment(req).then(function(value){
            if(!value){
                res.json({err:2,data:{}});
                return;
            }else{
                res.json(value);
            }
        });
    }
});

//load coment fiml
app.get('/api/comment/loadComment/',  function(req,res){
    console.log(req.body.idF);
    if(!req.body.idF){
        res.json({err:1, data:{}});
        return;
    }else{
        commentControler.loadComment(req.body.idF).then(function(value){
            res.send(value);
            return;
        });
    }
});

//api tim phim
app.get('/api/film/find/', function(req,res){
    if(!req.body.name){
        res.json({err:1, data:{}});
        return;
    }else{
        filmControler.FindFilm(req.body.name).then(function(value){
            if(!value){
                res.json({err:2, data:{}})
            }else{
               res.send(value); 
            }
        })
    }
});

//api tim phim
app.get('/api/film/cate/', function(req,res){
    if(!req.body.cate){
        res.json({err:1, data:{}});
        return;
    }else{
        filmControler.FindCate(req.body.cate).then(function(value){
            if(!value){
                res.json({err:2, data:{}})
            }else{
               res.send(value); 
            }
        });
    }
});
//opend file file

mongoose.connect(process.env.DB_CONNECTION, function (err) {
    if (err) {
        console.log('err: ', err);
    } else {
        console.log('server mongo connected success');
    }
});
app.listen(5000,()=>{
    console.log('server listening on port : 5000');
});


