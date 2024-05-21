import { Router } from 'express'
import { FileProcessResolver } from './file-process/file-process.resolver'
import multer from 'multer'
import { FileResolver } from './files/files.resolver'

export const route = Router()
const upload = multer()

route.post('/upload/:userId', upload.single('file'), new FileProcessResolver().fileProcess)
route.get('/files/:userId', new FileResolver().getFiles)