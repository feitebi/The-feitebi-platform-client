var Changelly = require('./lib.js');

var changelly = new Changelly(
  '70e7315de03f4517b10261beed7d989b',
  'f058fc0fece8b2dcb0b159f6f3e00b54f2a57446acf8e8a7bcbc286d867a2d92'
);

changelly.getCurrencies(function(err, data) {
  if (err){
    console.log('Error!', err);
  } else {
    console.log('getCurrencies', data);
  }
});

changelly.createTransaction('eth', 'btc', '70e7315de03f4517b10261beed7d989b', 10, undefined, function(err, data) {
  if (err){
    console.log('Error!', err);
  } else {
    console.log('createTransaction', data);
  }
});

// changelly.getMinAmount('eth', 'btc', function(err, data) {
//   if (err){
//     console.log('Error!', err);
//   } else {
//     console.log('getMinAmount', data);
//   }
// });

// changelly.getExchangeAmount('btc', 'eth', 1, function(err, data) {
//   if (err){
//     console.log('Error!', err);
//   } else {
//     console.log('getExchangeAmount', data);
//   }
// });

// changelly.getTransactions(10, 0, 'btc', undefined, undefined, function(err, data) {
//   if (err){
//     console.log('Error!', err);
//   } else {
//     console.log('getTransactions', data);
//   }
// });

// changelly.getStatus('1gy2g76', function(err, data) {
//   if (err){
//     console.log('Error!', err);
//   } else {
//     console.log('getStatus', data);
//   }
// });

changelly.on('payin', function(data) {
  console.log('payin', data);
});

changelly.on('payout', function(data) {
  console.log('payout', data);
});