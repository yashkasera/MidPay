/**
 * @author yashkasera
 * Created 29/09/21 at 06:12 PM
 */
const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is up on port : " + port)
})
