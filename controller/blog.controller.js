const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const upload = async (req, res)=>{
    const {id} = req.params
    const data = req.body
    const post = await prisma.blog.create({
        data:{
            title:data.title,
            blog : data.blog,
            image : data.image,
            authorId : parseInt(id)
        }
    }) 
    res.send(post)
}

module.exports = {upload}