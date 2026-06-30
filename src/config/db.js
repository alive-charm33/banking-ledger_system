const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google's DNS (8.8.8.8) instead of system DNS
// This fixes ECONNREFUSED errors on DNS queries in broken network environments
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

async function connectToDB() {
    const uri = process.env.MONGO_URI;

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
        });
        console.log("Server is connected to DB");
    } catch (err) {
        console.log("Error connecting to DB:");
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDB;