import fetch from "node-fetch";
import BaseService from "./BaseService.js";

export default class ModulesService extends BaseService {

    static async get(access_token){
        try{
            const response = await fetch(`${process.env.API_URL}/settings/modules`, {
                headers:{
                    Authorization: `Zoho-oauthtoken ${access_token}`
                }
            })
            const { modules } = await response.json()
            return modules
        } catch(error) {
            console.log(error)
            return error
        }
    }
}


/**
 * {
"access_token": "1000.c7ec4b346af15d7c4638920b98a6b13f.f76123319fdb19836e997bd9e0680971",
"refresh_token": "1000.e4297df235ac6b2aaf0fe139b775d606.f16a0422fdc9114ac496172e8390ed93",
"api_domain": "https://www.zohoapis.com",
"token_type": "Bearer",
"expires_in": 3600
}
 */