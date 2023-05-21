import fetch from "node-fetch";
import FormData from "form-data";



export default class BaseService {

    static async getToken(code){
        const {
            CLIENT_ID : client_id,
            CLIENT_SECRECT : client_secret
        } = process.env

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
        const {
            CLIENT_ID : client_id,
            CLIENT_SECRECT : client_secret
        } = process.env

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