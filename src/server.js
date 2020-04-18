const app = require('./app')
require('dotenv/config')

const PORT = process.env.PORT

app.listen(PORT || 4000, () => {
    console.log('Server connected at PORT ' + PORT);
})