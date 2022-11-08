module.exports = (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',process.env.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Max-Age','86400');
    next();
}
