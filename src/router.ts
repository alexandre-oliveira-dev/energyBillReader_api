import { Router } from 'express'
import { FileProcessResolver } from './file-process/file-process.resolver'
import multer from 'multer'

export const route = Router()
const upload = multer()

route.post('/file/:userId', upload.single('file'), new FileProcessResolver().fileProcess)