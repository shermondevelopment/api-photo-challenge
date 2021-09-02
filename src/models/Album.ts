import moongose, { Schema } from 'mongoose'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const Album = new Schema({
  title: { type: String, required: true },
  image_url: { type: String}
}, {timestamps: true})

Album.pre('save', function () {
  this.image_url = `http://localhost:3002/album/${this.title}`
})

Album.pre('remove', function() {
  return promisify(fs.unlink)(path.resolve(__dirname, '..', 'album', this.title))
})

export default moongose.model('Album', Album)