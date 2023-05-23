import fetch from "node-fetch";
import BaseService from "./BaseService.js";

export default class SearchService extends BaseService {
    "https://www.zohoapis.com/crm/v3/coql"

    static async vsquery( access_token, entity, field, vsField) {
        try{
            console.log( `select id, ${field}, ${vsField} from ${entity} where ${field} is not null` )
            const response = await fetch(`${process.env.API_URL}/coql`, {
                method:'post',
                headers:{
                    Authorization: `Zoho-oauthtoken ${access_token}`
                },
                body: JSON.stringify({
                    select_query : `select id, ${field}, ${vsField} from ${entity} where ${field} is not null`
                })
            })
            const { data } = await response.json()
            if( data ) return data
            return [];
        } catch(error) {
            console.log(error)
            return error
        }
    }

}
