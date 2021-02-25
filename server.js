const { render } = require('ejs')
const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')
const cookieParser = require('cookie-parser')

// middleware
const rowdyRes = rowdy.begin(app)
app.use(require('morgan')('tiny'))
app.set('view engine', 'ejs')
app.use(require('express-ejs-layouts'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public')) // tells it to grab from public folder
app.use(cookieParser())

// routes
app.get('/', (req, res) => {
  res.render('index')
})

// controllers
app.use('/users', require('./controllers/userController.js'))

// starts the sever!
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('server started!');
  rowdyRes.print()
})