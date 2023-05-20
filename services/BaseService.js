import fetch from "node-fetch";
import FormData from "form-data";

const {
    CLIENT_ID : client_id,
    CLIENT_SECRECT : client_secret
} = process.env

export default class BaseService {

    // static async generateCode() {
    //     const { CLIENT_ID : client_id, CLIENT_SECRECT : client_secret } = process.env
    //     const requestOptions = {
    //         method: 'GET',
    //       };
    //     const scope = "ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.coql.READ,Desk.tickets.ALL,Desk.tasks.ALL,Desk.settings.ALL,Desk.events.ALL,ZohoCRM.notifications.ALL,ZohoCRM.Files.READ,ZohoCRM.Files.CREATE,Desk.contacts.ALL,Desk.products.ALL,Desk.basic.ALL,Desk.search.READ,Desk.tasks.READ"
    //     const response = await fetch(`https://accounts.zoho.com/oauth/v2/auth?scope=${scope}&client_id=${client_id}&response_type=code&access_type=offline`, requestOptions)
    //     return await response.text()
    // }

    static async getToken(code){
        const formdata = new FormData();
        formdata.append("grant_type", "authorization_code");
        formdata.append("client_id", client_id);
        formdata.append("client_secret", client_secret);
        formdata.append("code", code);

        const options = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        }

        try{
            const response = await fetch(`${process.env.AUTH_URL}/token`, options)
            return await response.json()
        } catch ( error ) {
            return error
        }
    }

    static async refreshToken(refreshToken){
        const formdata = new FormData();
        formdata.append("refresh_token", refreshToken);
        formdata.append("client_id", client_id);
        formdata.append("client_secret", client_secret);
        formdata.append("grant_type", "refresh_token");

        const options = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        try{
            const response = await fetch(`${process.env.AUTH_URL}/token`, options)
            return await response.json()
        } catch ( error ) {
            return error
        }
    }
}