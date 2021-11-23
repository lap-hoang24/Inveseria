const jwt = require('jsonwebtoken');

module.exports = checkAuth = async (req, res, next) => {
   if (!req.headers.authorization) {
      res.status(400).send('Authorization missing');
      return;
   };

   let token = req.headers.authorization.split(' ')[1];

   if (token !== 'undefined') {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
            res.status(401).send('Token not valid')
         };

         req.user = decoded.userId;
         next();
      });
   } else {
      res.status(401).send('Token missing');
   }
}