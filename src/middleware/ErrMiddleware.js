module.exports = (error,req,res,next) => {
    return res.json({
        error:'Ops! algum erro ocorreu'
    }).status(500);
}
