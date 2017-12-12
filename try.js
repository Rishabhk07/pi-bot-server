/**
 * Created by rishabhkhanna on 13/12/17.
 */
const where = require('node-where');
const ip = require('ip');
const axios = require('axios');

axios.get('https://api.ipify.org?format=json').then(function (response) {

    console.log();
    where.is(response.data.ip, function(err, result) {
        if (result) {
            console.log('City: ' + result.get('city'));
            console.log('State / Region: ' + result.get('region'));
            console.log('State / Region Code: ' + result.get('regionCode'));
            console.log('Zip: ' + result.get('postalCode'));
            console.log('Country: ' + result.get('country'));
            console.log('Country Code: ' + result.get('countryCode'));
            console.log('Lat: ' + result.get('lat'));
            console.log('Lng: ' + result.get('lng'));
        }
})
console.log(ip.address());


});