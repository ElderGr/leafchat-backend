import admin from 'firebase-admin'

let serviceAccount = require("../../keys/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leafchat-e01f9.firebaseio.com/"

});

let db = admin.database();

export default db
