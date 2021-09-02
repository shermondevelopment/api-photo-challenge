import app from './config/app'
import mongoConnect from './config/mongo-connect'


mongoConnect.connect().then( async () => {
  app.listen(3002, () => console.log('app running in port 3002'))
} ).catch(console.error)
