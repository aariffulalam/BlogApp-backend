const express = require('express');
const {config} = require('./config/config')
const cors= require('cors');
// const { urlencoded } = require('express');

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

const port = config.port || 8000
// const port =  8000

app.use('/auth',require('./routes/auth.route'))
app.use('/blog',require('./routes/blog.route'))
app.use('/reaction', require('./routes/reaction.route'))

app.listen(port, ()=>{
    console.log(`i am listling at ${port} port`)
})  