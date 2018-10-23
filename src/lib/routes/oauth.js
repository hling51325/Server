
module.exports = (router) => {
    // router.get('/oauth/urls/:site', getOAuthUrl)
    router.get('/oauth/:site/callback', oauthCallback)
    // router.get('/authorize', getAuth)
    // router.post('/token', getToken)
    router.get('/oauth/:site', oauth)
}
const crypto = require('crypto');
const axios = require('axios')

async function oauth(ctx) {
    const { site } = ctx.params
    passport.authenticate(site)
}

async function getOAuthUrl(ctx, next) {
    const oauth = require('../../../config/oauth')

    const { site } = ctx.params
    let url
    if (site === 'github') {
        let { CLIENT_ID, REDIRECT_URI } = oauth.GITHUB
        const state = passwordCrypto((Math.random() * 10000).toFixed(0))
        url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`
    }
    ctx.redirect(url)
    // ctx.response.body = url
}


function passwordCrypto(password) {
    return crypto.createHmac('sha256', password)
        .update('I love holo')
        .digest('hex');
}

async function oauthCallback(ctx, nrxt) {
    const { site } = ctx.params
    const {
        code,
        state
    } = ctx.query

    passport.authenticate(site, {
        successRedirect: '/',
        failureRedirect: '/'
    })

    // let response = await axios.post('https://github.com/login/oauth/access_token', {
    //     client_id: clientId,
    //     client_secret: clientSecret,
    //     code,
    //     redirect_uri: 'https://tokine.online',
    //     state
    // }, {
    //         headers: {
    //             Accept: "application/json"
    //         }
    //     })
    // {"access_token":"e72e16c7e42f292c6912e7710c838347ae178b4a", "scope":"repo,gist", "token_type":"bearer"}
    // response
}

function initOAuth(ctx, next) {
    const state = passwordCrypto((Math.random() * 100).toFixed(2))
}

function getAuth(req, res) {
    const {
        response_type,
        client_id,
        redirect_uri,
        scope,
        state
    } = req.body


    axios.get(redirect_uri, {
        code: getCode,
        state
    })

    function getCode() {
        return (Math.random() * 100).toFixed(2)
    }
}

function getToken(req, res, next) {
    const {
        grant_type,
        code,
        redirect_uri,
        client_id
    } = req.body

    // 

    res.json({
        access_token,
        token_type: 'bearer',
        expires_in: '84900',
        // refresh_token,
        // scope
    })
}