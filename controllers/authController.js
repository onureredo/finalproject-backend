// signup page
module.exports.signup_get = (req, res) => {
    res.send('signup');
}

//login page
module.exports.login_get = (req, res) => {
    res.send('login');
}

//create a new user in db
module.exports.signup_post = (req, res) => {
    res.send('new signup');
}

//authenticate a current user
module.exports.login_post = (req, res) => {
    res.send('user login');
}

//logout user
module.exports.logout_get = (req, res) => {
    res.send('logout');
    
}