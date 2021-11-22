const jwt = require('jsonwebtoken');

module.exports = checkAuth = async (req, res, next) => {

   // console.log('cookiessssssssss',req.cookies);

   // next();

   let token = req.headers.authorization.split(' ')[1];

   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) throw err;

         req.user = decoded.userId;
         next();
      });
   } else {
      res.status(401).send('Token missing')
   }
}