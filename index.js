const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use("/src", express.static('src'));
app.use("/assets", express.static('assets'));
app.use("/libraries", express.static('libraries'));


app.use(express.json({
  limit: '1mb'
}));

app.post('/api', (request, response) => {
  console.log(request.body);
  response.json({
    status: 'success',
    // latituede: request.body.lat,
    // longitude: request.body.long
  })
})