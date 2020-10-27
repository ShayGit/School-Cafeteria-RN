const functions = require("firebase-functions");
const server    = require("./server");
const api       = functions.https.onRequest((server));
                 // .runWith({ memory: "2GB", timeoutSeconds: 120 })
                  

module.exports = {api};


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });