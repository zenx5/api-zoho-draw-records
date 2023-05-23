import SearchService from "../services/SearchService.js"

export const getTotal = async ( access_token, req, res ) => {
    let dataset = {};
    const { entity, field, vsField } = req.query
    const data = await SearchService.vsquery(access_token, entity, field, vsField)
    // res.status(200).send(data)
    if( data.length > 0 ) {
        for( const item of data ) {
            if( !dataset[ item[vsField] ] ) {
                dataset[ item[vsField] ] = Number( item[field] )
            } else {
                dataset[item[vsField]] += Number( item[field] )
            }
        }
    }

    res.status(200).send(dataset)
}
