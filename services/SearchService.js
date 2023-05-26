import fetch from "node-fetch";
import BaseService from "./BaseService.js";

export default class SearchService extends BaseService {
    "https://www.zohoapis.com/crm/v3/coql"

    static async vsquery( access_token, entity, field, vsField) {
        try{
            const sql = field==='drawing_count_records' ? 
                `select ${vsField} from ${entity} where ${vsField} is not null` : 
                `select id, ${field}, ${vsField} from ${entity} where ${field} is not null` 
            console.log( sql )
            const response = await fetch(`${process.env.API_URL}/coql`, {
                method:'post',
                headers:{
                    Authorization: `Zoho-oauthtoken ${access_token}`
                },
                body: JSON.stringify({
                    select_query : sql
                })
            })
            const { data, info } = await response.json()
            if( data ) return { data, info }
            return [];
        } catch(error) {
            console.log(error)
            return {data:[], info:{count:0}}
        }
    }

}
