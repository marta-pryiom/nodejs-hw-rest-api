import pkg from 'mongoose'
// import { colors } from '../helpers'
const { connect, connection } = pkg

const uri = process.env.MONGO_URL

const db = connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

connection.on('connected', () => {
  console.log('mongoose connected succussfully')
  // console.log('mongoose connected succussfully'.blue)
})
connection.on('err', (err) => {
  console.log(`mongoose connection error ${err.message}`)
  // console.log(`mongoose connection error ${err.message}`.red)
})
connection.on('disconnected', () => {
  console.log('mongoose disconnected with DB')
  // console.log('mongoose disconnected with DB'.orange)
})
process.on('SIGINT', async () => {
  connection.close()
  console.log('Connection DB closed')
  // console.log('Connection DB closed'.blue)
  process.exit(1)
})

// process.on("unhandledRejection",(error, _) => {
//   if (error) {
//       console.log(ERROR: ${error.message})
//       server.close(() => {
//           return process.exit(1)//код ошибки которий надо описать в readme.md
//       })
//   }

// });

export default db
