import fetch from "node-fetch";
import BaseService from "./BaseService.js";

export default class SettingsService extends BaseService {

    static async getModules(access_token){
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

    static async getFields(access_token, entity){
        try{
            const response = await fetch(`${process.env.API_URL}/settings/fields?module=${entity}`, {
                headers:{
                    Authorization: `Zoho-oauthtoken ${access_token}`
                }
            })
            const { fields } = await response.json()
            return fields
        } catch(error) {
            console.log(error)
            return error
        }
    }
}
