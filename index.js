const express = require('express');
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        cancel: () => "<button type=\"button\"  onclick=\"window.location.replace('/')\" class=\"btn btn-warning\">Отказаться</button>\n"
    }
});
const Storage = require('./storage');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 20020);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
    let storage = new Storage();
    res.render('index', {phones: storage.get(), block: false});
});
app.get('/add', (req, res, next) => {
    let storage = new Storage();
    res.render('add', {phones: storage.get(), block: true});
});
app.get('/update', (req, res, next) => {
    console.log(req.query.id);
    let storage = new Storage();
    let item = storage.getItem(req.query.id)
    res.render('update', {
        phones: storage.get(),
        block: true,
        id: req.query.id,
        old: item
    });
});
app.post('/add', (req, res, next) => {
    let storage = new Storage();
    storage.addNew({
        name: req.body.fio,
        phone: req.body.phone
    });
    res.redirect('/');
});
app.post('/update', (req, res, next) => {
    let storage = new Storage();
    storage.update({
        id: req.body.id,
        name: req.body.fio,
        phone: req.body.phone
    });
    res.redirect('/');
});
app.post('/delete', (req, res, next) => {
    let storage = new Storage();
    storage.delete(req.body.id);
    res.redirect('/');
});


const server = app.listen(process.env.PORT || app.get('port'),
    () => console.log(`http://localhost:${app.get('port')}/`));