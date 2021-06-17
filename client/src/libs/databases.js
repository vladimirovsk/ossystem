const axios = require('axios');

/**
 * select all records from catalog
 * @returns {Promise<*[]>}
 */
 async function fetchCatalog(filter = '') {
    let dbgridData = []
    let url = '/api/v1/databases/catalog/'
    if (filter !==''){url= '/api/v1/databases/catalog/title/'}
    let result = await axios.get(`${url}${filter}`)
        .then(async (response) => {
            return await response.data
        })
        .catch(err=>{throw err})
         for (let i in result) {
             dbgridData.push({
                 id: result[i]._id,
                 title: result[i].title,
                 description: result[i].description,
                 image: result[i].image,
                 categoryName: await findCategoriesName(result[i].category),
                 categoryId: result[i].category
             });
         }
    return dbgridData
}

async function findCategoriesName(categoryId){
    let select = await findCategories(categoryId)
    console.log(categoryId,select.name)
    return select.name
}

async function fetchAllCategories(){
    let dbgridData = []
    let url = '/api/v1/databases/categories/'
    let result = await axios.get(`${url}`)
        .then(async (response) => {
            return await response.data
        })
        .catch(err => {
            throw err
        })
    for (let i in result) {

        dbgridData.push({
            key: result[i]._id,
            id: result[i]._id,
            name: result[i].name,
        });
    }

    return dbgridData;

}
/**select one record categories
 *
 */
async function findCategories (filter = '') {
    let url = '/api/v1/databases/categories/'
    let result = await axios.get(`${url}${filter}`)
        .then(async (response) => {
            return await response.data
        })
        .catch(err => {
            throw err
        })
      return  {
          key: result._id,
          id: result._id,
          name: result.name,
      };
}

export {
    fetchCatalog,
    fetchAllCategories,
    findCategories
}