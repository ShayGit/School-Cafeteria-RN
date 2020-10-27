const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const requireAuth = require("./requireAuth");
const htmlPages = require("./helpers/htmlPages");
const admin = require("firebase-admin");
const serviceAccount = require("./cafeteria-a8ebf-firebase-adminsdk-z6o7n-a96785c454.json");
admin.initializeApp(
 { credential: admin.credential.cert(serviceAccount)},
);
const db = admin.firestore();
const axios = require("axios");

const bluesnapAuthorizationKey = functions.config().api.BLUESNAP_KEY;
const bluesnapBase = functions.config().api.BLUESNAP_URL;
const ADMIN_EMAIL = functions.config().api.ADMIN_EMAIL;

const BASE_URL = functions.config().api.base_url;

const app = express();
const router = express.Router();

app.use(cors(), (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, Origin"
  );

  next();
});
app.use(cors({ origin: true }));

app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("School Cafeteria App API\nBuild v1.0.0");
});

router.post("/checkout", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const orderDetailsId = req.body.orderDetailsId;
    const userPhoneNumber = user.phone_number;

    const userFirestore = (
      await admin.firestore().collection("users").doc(user.uid).get()
    ).data();

    const orderDetails = await (
      await db.collection("order_details").doc(orderDetailsId).get()
    ).data();

    console.log(orderDetails.timeToMake);

    const order = await db.collection("orders").add({
      products: orderDetails.products,
      price: orderDetails.totalPrice,
      createdAt: orderDetails.createdAt,
      paymentStatus: "ממתין",
      orderStatus: "בהמתנה",
      timeToMake: orderDetails.timeToMake,
      note: orderDetails.note,
      paymentMethod: orderDetails.paymentMethod,
      confirmationNumber: orderDetails.confirmationNumber,
      user: {
        id: user.uid,
        firstName: userFirestore.firstName,
        lastName: userFirestore.lastName,
        isStuff: userFirestore.isStuff,
        phoneNumber: userPhoneNumber,
      },
    });

    res.json({ orderId: order.id });
  } catch (err) {
    await db.collection("orders").doc(order.id).delete();
    console.log("checkout error", err);
    res.status(500).send(err);
  }
});

router.get("/orders/:orderId", requireAuth, async (req, res) => {
  try {
    const result = await (
      await db.collection("orders").doc(req.params.orderId).get()
    ).data();

    const order = {
      ...result,
      createdAt: result.createdAt.toDate().toISOString(),
      timeToMake:
      result.timeToMake === "עכשיו"
          ? result.timeToMake
          : result.timeToMake.toDate().toISOString(),
    };

    res.json(order);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getLastOrders", requireAuth, async (req, res) => {
  try {
   
    let orders = [];
    const user = req.user;

    const ordersQuerySnap = await db
      .collection("orders")
      .where("user.id", "==", user.uid)
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    if (!ordersQuerySnap.empty) {
      ordersQuerySnap.forEach((orderDoc) => {
        const order = orderDoc.data();
        orders.push({
          ...order,
          id: orderDoc.id,
          createdAt: order.createdAt.toDate().toISOString(),
          timeToMake:
            order.timeToMake === "עכשיו"
              ? order.timeToMake
              : order.timeToMake.toDate().toISOString(),
        });
      });
    }

    console.log(orders);
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/creditCheckout", requireAuth, async (req, res) => {
  let order;
  try {
    const user = req.user;
    const orderDetailsId = req.body.orderDetailsId;
    const userPhoneNumber = user.phone_number;

    const userFirestore = (
      await admin.firestore().collection("users").doc(user.uid).get()
    ).data();

    const orderDetails = await (
      await db.collection("order_details").doc(orderDetailsId).get()
    ).data();

      order = await db.collection("orders").add({
      products: orderDetails.products,
      price: orderDetails.totalPrice,
      createdAt: orderDetails.createdAt.toDate(),
      paymentStatus: "ממתין",
      orderStatus: "בהמתנה",
      timeToMake: orderDetails.timeToMake,
      note: orderDetails.note,
      paymentMethod: orderDetails.paymentMethod,
      confirmationNumber: orderDetails.confirmationNumber,
      user: {
        id: user.uid,
        firstName: userFirestore.firstName,
        lastName: userFirestore.lastName,
        isStuff: userFirestore.isStuff,
        phoneNumber: userPhoneNumber,
      },
    });

    console.log('order', order);
    const options = {
      headers: { Authorization: `Basic ${bluesnapAuthorizationKey}` },
    };

    const bluesnapRes = await axios.post(
      `${bluesnapBase}/services/2/payment-fields-tokens`,
      {},
      options
    );
      console.log('bluesnapres',bluesnapRes);
    const bluesnapToken = bluesnapRes.headers.location.replace(
      `${bluesnapBase}/services/2/payment-fields-tokens/`,
      ""
    );

    res.send({ orderId: order.id, bluesnapToken });
  } catch (err) {
    await db.collection("orders").doc(order.id).delete();
    console.log("checkout error", err.message);
    res.status(500).send(err);
  }
});

/**
 * To redirect users to Bluesnap
 */
router.get("/web/checkout/redirect", requireAuth, async (req, res) => {
  try {
    const bluesnapToken = req.query.bluesnapToken;
    const user = req.user;
    const userFirestore = (
      await admin.firestore().collection("users").doc(user.uid).get()
    ).data();

    const orderId = req.query.orderId;

    const result = await (
      await db.collection("orders").doc(orderId).get()
    ).data();

    const jsonData = {
      token: bluesnapToken,
      title: "BlueSnap Example",
      description: "This is description for example...",
      amount: result.price.toString(),
      currency: "ILS",
      buttonLabel: "Click to buy",
      billingDetails: false,
      includeEmail: true,
      language: "EN",
      shopperData: {
        email: user.email,
        firstname: userFirestore.firstName,
        lastname: userFirestore.lastName,
      },
    };
    const customToken = await admin.auth().createCustomToken(user.uid);
    const resIdToken = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${
        functions.config().api.key
      }`,
      {
        token: customToken,
        returnSecureToken: true,
      }
    );
    const idToken = `Bearer ${resIdToken.data.idToken}`;

    const bluesnapData = {
      jsonData: jsonData,
      idToken,
      pay_url: `${BASE_URL}/payment/send`,
      success_url: `${BASE_URL}/payment/success`,
      cancel_url: `${BASE_URL}/payment/cancel`,
      orderId: req.query.orderId,
    };
    res.send(htmlPages.checkoutHtmlPage(bluesnapData));
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log("redirect error", err);
  }
});

router.post("/payment/send", requireAuth, async (req, res) => {
  try {
    console.log(req.body);

    const paymentHeaders = {
      headers: {
        Authorization: `Basic ${bluesnapAuthorizationKey}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    };

    const makePaymentRes = await axios.post(
      `${bluesnapBase}/services/2/transactions`,
      req.body.data,
      paymentHeaders
    );

    console.log(makePaymentRes.data);
    if (makePaymentRes.data.processingInfo.processingStatus === "success") {
      const orderRef = db.collection("orders").doc(req.body.orderId);

      const updateRes = await orderRef.set(
        {
          paymentStatus: "שולם",
        },
        { merge: true }
      );
      console.log(updateRes);

      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    res.json({ success: false });
    console.log("payment error", err);
  }
});

router.get("/payment/success", (req, res) => {
  /**
   * Don't fulfill the purchase here. Rather use Webhooks to fulfill purchase.
   */ res.status(200).send({ success: true });
});

router.get("/payment/cancel", (req, res) => {
  res.status(200).send({ success: false });
});

router.post("/bluesnap/webhook", async (req, res) => {
  try {
    console.log(req.body);

    if (req.body.transactionType === "CHARGE") {
      //
    }
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

router.post("/setCustomClaims", requireAuth, async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const claims = await admin.auth().verifyIdToken(idToken);

    if (
      typeof claims.email !== "undefined" &&
      claims.email.match(ADMIN_EMAIL)
    ) {
      await admin.auth().setCustomUserClaims(claims.sub, {
        admin: true,
      });
      res.end(
        JSON.stringify({
          status: "success",
        })
      );
    } else {
      res.end(JSON.stringify({ status: "ineligible" }));
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log("redirect error", err);
  }
});

router.get("/getUsers", requireAuth, async (req, res) => {

  async function getUserFirestore(userAuth) {
    const userFirestore = (
      await admin.firestore().collection("users").doc(userAuth.uid).get()
    ).data();
   const user={
        key: userAuth.uid,
        firstName: userFirestore.firstName,
        lastName: userFirestore.lastName,
        email: userAuth.email,
        phoneNumber: userAuth.phoneNumber,
        isStuff: userFirestore.isStuff,
      };
      return user;
  }

  async function listAllUsers(nextPageToken) {
    let users =[];
    // List batch of users, 1000 at a time.
     const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
     
        users = await Promise.all(listUsersResult.users.map(async (userRecord) => {
           const user = await getUserFirestore(userRecord);
           return user;
        }));

        // eslint-disable-next-line promise/always-return
        if (listUsersResult.pageToken) {
          // List next batch of users.
          const nextUsers = await listAllUsers(listUsersResult.pageToken);
          users.concat(nextUsers);
        }
      return users;
  }
  
  try {
    const user = req.user;
    if (user.admin) {
      const users = await listAllUsers();
      
       res.send(users);
    }
    else{
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log("get users error", err);
  }
});

app.use(router);
module.exports = app;
