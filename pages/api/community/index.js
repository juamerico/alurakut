const {DATOCMS_TOKEN} = process.env
import { SiteClient } from "datocms-client"

export default async function requestReceiver(request, response) {
    if(request.method === "POST") {
        const TOKEN = DATOCMS_TOKEN
        const client = new SiteClient(TOKEN)
    
        //sintaxe do dato
        const createdRecord = await client.items.create({
            itemType: "972669", //model ID
            ...request.body
        })
    
        console.log(`registro: ${createdRecord}`)
    
        response.json({
            createdRecord: createdRecord
        })
        return
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas no POST tem."
    })
 
}