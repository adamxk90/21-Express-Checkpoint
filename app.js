const express = require('express')
const app = express()

// Custom middleware to verify time of the request
app.use((req, res, next) => {
  const date = new Date()
  const day = date.getDay()
  const hour = date.getHours()
  const isWorkingHours = day >= 1 && day <= 5 && hour >= 9 && hour < 17
  if (!isWorkingHours) {
    res.send(
      'Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).'
    )
  } else {
    next()
  }
})

// Set EJS as the template engine
app.set('view engine', 'ejs')

// Home page
app.get('/', (req, res) => {
  res.render('home')
})

// Our Services page
app.get('/services', (req, res) => {
  res.render('services')
})

// Contact Us page
app.get('/contact', (req, res) => {
  res.render('contact')
})

// Serve static files from the "public" directory
app.use(express.static(__dirname + '../public'))

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000')
})
