const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Person = require("../model/Person")
const myKey = require("../setup/myurl");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = myKey.secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // console.log(Person)
            // console.log(jwt_payload)
            Person.findById(jwt_payload.id)
                .then(person => {
                    if (person) {
                        console.log(person + "found");
                        return done(null, person);
                    }
                    console.log(person + "not found");
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};