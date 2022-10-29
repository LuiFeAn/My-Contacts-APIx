module.exports = (req,res,next) => {
    res.setHeader('Acess-Control-Allow-Origin',process.env.CORS_ORIGIN);
    res.setHeader('Acess-Control-Allow-Origin-Methods','*');
    res.setHeader('Acess-Control-Allow-Origin-Headers','*');
    res.setHeader('Acess-Control-Max-Age','86400');
    next();
}
