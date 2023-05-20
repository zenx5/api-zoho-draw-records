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
