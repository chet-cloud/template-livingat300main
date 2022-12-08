const axios = require('axios');
const rateLimit = require('axios-rate-limit');

// sets max 2 requests per 1 second, other will be delayed
// note maxRPS is a shorthand for perMilliseconds: 1000, and it takes precedence
// if specified both with maxRequests and perMilliseconds
const http = rateLimit(axios.create(), {maxRPS: 70 })
let i=0
for(let i=0;i<2000;i++){
    http.get('https://livingat300main.ca/').then(()=>{console.log(i++)})
}
