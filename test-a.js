const dns = require("dns");

dns.resolve4("google.com", (err, addresses) => {
  console.log(err || addresses);
});