const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
// Google OAuth 2.0 Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Kiểm tra xem user đã tồn tại chưa
    let existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    // Kiểm tra email đã được sử dụng chưa
    let emailUser = await User.findOne({ email: profile.emails[0].value });

    if (emailUser) {
      // Nếu email đã tồn tại, liên kết với Google account
      emailUser.googleId = profile.id;
      await emailUser.save();
      return done(null, emailUser);
    }

    // Tạo user mới
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      // Không cần password cho Google OAuth
      //password: 'google_oauth_user', // Placeholder password
      // Tạo random password an toàn hơn
      password: `google_oauth_${Date.now()}_${Math.random().toString(36)}`,
      gender: 'other', // Default value
      profileImage: profile.photos[0]?.value
    });

    await newUser.save();
    done(null, newUser);

  } catch (error) {
    console.error('Google OAuth error:', error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
// Facebook 
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'email', 'photos']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let existingUser = await User.findOne({ facebookId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    let emailUser = await User.findOne({ email: profile.emails?.[0]?.value });

    if (emailUser) {
      emailUser.facebookId = profile.id;
      await emailUser.save();
      return done(null, emailUser);
    }

    const newUser = new User({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
      password: `facebook_oauth_${Date.now()}_${Math.random().toString(36)}`,
      gender: 'other',
      profileImage: profile.photos?.[0]?.value
    });

    await newUser.save();
    done(null, newUser);

  } catch (error) {
    console.error('Facebook OAuth error:', error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;