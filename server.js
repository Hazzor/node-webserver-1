const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.set('view engine','hbs');
// app.set('views', (__dirname + '/public'));

app.use((req, res, next)=>{
    // console.log(res);
    var now = new Date().toString();
    // console.log();
    var log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// maintenance purpose
// app.use((req, res, next)=> {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{

    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (hell, text)=>{

    return text.toUpperCase();
});
// http for get req
app.get('/', (req,res)=> {


    res.render('home.hbs', {
        pageTitle: 'Home Page',
        greeting : 'Welcome to Home Page',
        author : true ,
        // people: [
        //             "Yehuda Katz",
        //             "Alan Johnson",
        //             "Charles Jolley"
        //         ],
        sample : 
            {
                name : ['hester', 'ana'],
                age : [16, 18]
            }
        

    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle : 'About Page',

    });
})

app.get('/bad', (req,res)=>{
    res.send({
        message : 'unable to fulfil request'
    });
})

app.listen(3000, ()=> {
    console.log('listening on port 3000');
});

app.listen(8000, ()=> {
    console.log('listening on port 3000');
});