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
            const template = {
                visible:true,
                show_as_tab:true,
                api_supported:true,
                profiles:[ { id: '0001', Name: 'Administrator' } ] 
            }
            return [
                { ...template, id:'1001', module_name:'Leads' },
                { ...template, id:'1002', module_name:'Contacts' },
                { ...template, id:'1003', module_name:'Invoices' },
            ]
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
            if ( fields?.length > 0 ) return fields
            return []
        } catch(error) {
            console.log(error)
            const template1 = {
                json_type:'string',
                data_type:'text'
            }
            const template2 = {
                json_type:'double',
                data_type:'integer'
            }
            return [
                { ...template1, display_label:'Name', api_name:'name',},
                { ...template2, display_label:'Employees', api_name:'employees',}
            ]
        }
    }
}
