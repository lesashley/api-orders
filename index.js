const express = require('express');
const json = require('./data/orders.json');
let app = express();

app.get('/', function (req, res) {
  res.send('Orders!');
});

const orders = json.orders;

app.get('/orders', function (req, res) {
  res.json(orders);
});

app.get('/orders/:id', function (req, res) {
  const id = (req.params.id).toString();
  const result = orders.filter(r => r.id === id)[0];
  if (!result) {
    res.sendStatus(404);
  } else {
    res.send(result.despacho).json();
  }
});

app.post('/orders/despacho', (req, res) => {
    const turn = req.body.turn;
    const despacho = filterOrders(turn);
    res.send(despacho).json();
});

function filterOrders (id){
    return orders.map(e => {
      if(e.id === id){
        return e.despacho;
      }
    }).filter(e => e !== undefined).reduce(a =>{
      return a;
    });
}

const server = app.listen(process.env.PORT || 3000, function () {
  let host = server.address().address;
  host = (host === '::' ? 'localhost' : host);
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});