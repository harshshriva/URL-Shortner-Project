const validUrl = require('valid-url')

const urlModel = require("../model/urlModel")


// ===========================================================================================================================================>

// < here we create impor a redis and  connect to redis cach memory to use cashing in our code >

const redis = require('redis')

const { promisify } = require('util')

const redisClient = redis.createClient(18891, "redis-18891.c91.us-east-1-3.ec2.cloud.redislabs.com", { no_ready_check: true });

redisClient.auth("F1uWlcUyoLvjTPzfgZSSzyzrPQaY14md", function(err) {
    if (err) throw err;
});

redisClient.on("connect", async function() {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

// redis password= F22C7UaLHXolOQqet2gUka5oRy9Aj3L3    > that is my redis databse password
// redis enpoint = redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com:13142 > that is my port number and coneection string 

// =======================================================================================================================================>

// <  here we write a globel function to validate keys in request body >

const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

// < here we write a globel function to validate a request body is empty or not > 

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

// ========================================================================================================================================>



// ================================================================================================================================================================================================>

// < that is second and  get api which redirect a long link >

const getUrl = async function(req, res) {

    try {

        const urlCode = req.params.urlCode
        let cachcedData = await GET_ASYNC(`${urlCode}`)
        if (cachcedUrlData) {
            return res.status(202).redirect(JSON.Parse(cachcedData))
        }
        let getUrl = await urlModel.findOne({ urlCode })
        if (!getUrl) {
            return res.status(404).send({ status: false, msg: "url not found" })
        }
        let url = getUrl.longUrl.longUrl
        await SET_ASYNC(`${urlCode}`, JSON.parse.stringlfy(url))
        return res.redirect(url)
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}


// ==================================================================================================================================================================================>


// module.exports.genrateShortUrl = genrateShortUrl;
module.exports.getUrl = getUrl;