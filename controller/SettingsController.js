import SettingsService from "../services/SettingsService.js"

export const getFields = async ( access_token, req, res ) => {
    const { entity } = req.query
    const fields = await SettingsService.getFields(access_token, entity)
    res.status(200).send([{id:'0000000000000000000', display_label:'Count', api_name:'drawing_count_records'}, ...fields])
}

export const getModules = async (access_token, req, res) => {

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