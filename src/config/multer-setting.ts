import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { Request } from 'express'

const settingFile = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'album'))
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err, err.message)
        const image = `${hash.toString('hex')}${path.extname(file.originalname)}`
        cb(null, image)
      })
    }
  })
}

export default {
  dest: path.resolve(__dirname, '..', 'album'),
  storage: settingFile.local,
  fileFilter: (req: Request, file: any, cb: Function) => {
      if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
          cb(null, true)
      } else {
          cb(new Error('invalid file type.'))
      }
  }
}