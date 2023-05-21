import SettingsService from "../services/SettingsService.js"

export const getFields = async ( access_token, req, res ) => {
    const { entity } = req.query
    const fields = await SettingsService.getFields(access_token, entity)
    res.status(200).send(fields)
}

export const getModules = async (access_token, req, res) => {

    // res.status(200).send([
    //     { id:'1001', module_name:'Leads', profiles:[ { id: '0001', Name: 'Administrator' } ] },
    //     { id:'1002', module_name:'Contacts', profiles:[ { id: '0001', Name: 'Administrator' } ] },
    //     { id:'1003', module_name:'Invoices', profiles:[ { id: '0001', Name: 'Administrator' } ] },
    // ])

    const modules = await SettingsService.getModules(access_token)
    const modulesFiltered = modules.filter( module => {
        return module.visible && module.show_as_tab && module.api_supported
    }).map( ({id, module_name, profiles }) => ({
        id,
        module_name,
        profiles
    }))
    res.status(200).send(modulesFiltered)
}