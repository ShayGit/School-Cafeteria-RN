const functions = require("firebase-functions");

const admin = require("firebase-admin");

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>');

    res.status(401).send('Unauthorized');
    return;

    }

    try {
        const token = authorization.replace('Bearer ', '');
        const decodedIdToken = await admin.auth().verifyIdToken(token);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
      } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(401).send('Unauthorized');
        return;
      }
};