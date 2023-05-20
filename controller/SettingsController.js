import ModulesService from "../services/ModulesService.js"

export const getModules = async (access_token, req, res) => {

    const modules = await ModulesService.get(access_token)
    const modulesFiltered = modules.filter( module => {
        return module.visible && module.show_as_tab && module.api_supported
    }).map( ({id, module_name, profiles }) => ({
        id,
        module_name,
        profiles
    }))
    res.status(200).send(modulesFiltered)
}