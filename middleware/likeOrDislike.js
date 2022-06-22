const likeOrDislike = (req, res, next)=>{
    const{like, dislike} = req.body;
    if (!like){
        return {like:false, dislike:true}
    }
    else{
        return {like:true, dislike:false}
    }
    // console.log(like, dislike)
    // next()
}
module.exports = {likeOrDislike}