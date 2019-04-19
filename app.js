const express = require('express');
const path = require('path');
const members = require('./members');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');

const app = express();

// Initt middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage router
app.get('/', (req, res) => { res.render('index', {
    title: 'Members App - Crashcourse',
    members
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));