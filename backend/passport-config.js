const LocalStrategy = require('passport-local').Strategy;
const Users = require('./model/userAuth'); // Adjust the path as necessary

module.exports = function(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, async (username, password, done) => {
    try {
      const user = await Users.findOne({ where: { username } });
      if (!user) return done(null, false, { message: 'User not found' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log("Serializing user:",user)
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const user = await Users.findByPk(username);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
