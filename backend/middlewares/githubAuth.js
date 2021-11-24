const User = require('../models/User');
const axios = require('axios');

module.exports = checkGithubAuth = async (req, res, next) => {
   const body = {
      client_id: process.env.githubClientId,
      client_secret: process.env.githubClientSecret,
      code: req.query.code
   };
   const opts = { headers: { accept: 'application/json' } };

   try {
      const tokenResponse = await axios.post(`https://github.com/login/oauth/access_token`, body, opts);

      const token = tokenResponse.data.access_token;

      const githubUser = await axios.get('https://api.github.com/user', { headers: { Authorization: 'token ' + token } })

      const { id, avatar_url, name, email, login } = githubUser.data;

      const signedUp = await User.findOne({ githubId: id });

      if (signedUp) {
         req.user = signedUp._id
      } else {
         const appUser = {
            githubId: id,
            username: name.split(' ')[0],
            email: email,
            picture: avatar_url
         }
         
         let newUser = await User.create(appUser);
         req.user = newUser._id
      }
      next();
   }
   catch (err) {
      console.error(err);
   }
}
