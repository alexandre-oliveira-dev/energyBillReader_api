import { Request, Response } from "express";
import { FileProcessService } from "./file-process.service";
import pdf from 'pdf-parse'
import{} from 'pdf-lib'
import { generatePreSignedUrl, s3 } from "../utils/s3";


const service = new  FileProcessService()
export class FileProcessResolver{
 
    async fileProcess(req: Request, res: Response) {
        
        const { file } = req
        if (file?.buffer) {
            pdf(file.buffer).then(async data => {
                const lines = data.text.split('\n').map((item, index) => ({
                    line: index + 1,
                    content:item.trim()
                }))
                //N° cliente
                const refIndexnumberClient = lines.find(line => line.content.includes( 'Nº DO CLIENTE'))?.line
                const numberClient = refIndexnumberClient && lines[lines.findIndex(i => i.line === refIndexnumberClient) + 1].content.split(/\s+/)[0]
                
                //Month reference
                const refIndexMonthReference = lines.find(line => line.content.includes( 'Referente a'))?.line
                const monthReference = refIndexMonthReference && lines[lines.findIndex(i => i.line === refIndexMonthReference) + 1].content.split(/\s+/)[0]
                
                //eeQtd
                const refIndexEeQtd = lines.find(line => line.content.includes( 'Energia ElétricakWh'))?.line 
                const eeQtd = refIndexEeQtd && lines[lines.findIndex(i => i.line === refIndexEeQtd)].content.split(/\s+/)[2]
                const eeValue = refIndexEeQtd && lines[lines.findIndex(i => i.line === refIndexEeQtd)].content.split(/\s+/)[4]

                //es
                const refIndexEs = lines.find(line => line.content.includes( 'SCEE'))?.content.split('Energia SCEE s/ ICMSkWh')[1]
                const esQtd = refIndexEs?.trim().split(/\s+/)[0]
                const esValue = refIndexEs?.trim().split(/\s+/)[2]
                
                //ec
                const refIndexEc = lines.find(line => line.content.includes( 'Energia compensada GD I'))?.content.split('Energia compensada GD IkWh')[1]
                const ecQtd = refIndexEc && refIndexEc?.trim()?.split(/\s+/)[0]
                const ecValue = refIndexEc?.trim().split(/\s+/)[2]

                //contr.publica municipal
                const refIndexCPM = lines.find(line => line.content.includes( 'Contrib Ilum Publica Municipal'))?.content.split('Contrib Ilum Publica Municipal')[1]
                
                //total
                const refIndexTotal = lines.find(line => line.content.includes('TOTAL'))?.content.split('TOTAL')[1]

                const insert = await service.processFile({
                    clientNumber: String(numberClient),
                    monthReference: String(monthReference),
                    esQtd: Number(esQtd),
                    esValue: String(esValue),
                    ecQtd: Number(ecQtd),
                    ecValue: String(ecValue),
                    eeQtd: Number(eeQtd),
                    eeValue: String(eeValue),
                    contrPubMunicipalValue: String(refIndexCPM),
                    user: { 'connect': { id: '1' } },
                
                }).then(async () => {

                    console.log(file)

                     s3.putObject({
                        Bucket: 'energybillreader',
                        Key: `files/${file.originalname}`,
                        ContentType: file.mimetype
                    })

                  const url =  generatePreSignedUrl('putObject', {
                        Bucket: 'energybillreader',
                        Key: `files/${file.originalname}`,
                        Expires: 3600,
                        ContentType: file.mimetype
                  }).then().catch(err =>console.log(err))
                    console.log(url)
                   /*  await service.createFile({
                        fileName: file.filename,
                        patch: file.path,
                        url: String(url),
                        user: {
                            connect: {
                                id:'1'
                            }
                        }
                    }) */
                })
                return res.json(insert)
                
            })            
        }
    }
}