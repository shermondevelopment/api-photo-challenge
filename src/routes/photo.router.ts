import { Router, Request, Response } from 'express' 
import multer from 'multer'
import Album from '../models/Album'
import settingMulter from '../config/multer-setting'

export default (router: Router): void => {
  router.get('/photo', async (req: Request, res: Response) => {
    const photos = await Album.find()
    return res.json(photos)
  })
  router.post('/photo/add', multer(settingMulter).single('photo'), async (req: Request, res: Response) => {
    const { path: photoPath, filename: title } = req.file
    const photos = await Album.count()
    
    if((photos + 1 > 6)) {
      return res.status(400).json({ warning: 'upload limit exceeded' })
    }
    
    const addPhoto = await Album.create({
      title
    })
    return res.json({addPhoto});
  })
  router.delete('/photo/delete/:id', async (req: Request, res: Response) => {
    const photo = await Album.findById(req.params.id);
    await photo.remove();
    return res.send();
  })
}