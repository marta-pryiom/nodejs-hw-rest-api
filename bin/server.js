import { mkdir } from 'fs/promises'
import app from '../app'
import db from '../lib/db'
// eslint-disable-next-line no-unused-vars
import { colors } from '../helpers'

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.UPLOAD_DIR, { recursive: true })
    // console.log(`Server running. Use our API on port: ${PORT}`)
    console.log(`Server running. Use our API on port: ${PORT}`
    .yellow)
  })
}).catch((err) => {
  console.log(`Server is not running.Error ${err.message}`)
  // console.log(`Server is not running.Error ${err.message}`.orange)
})
