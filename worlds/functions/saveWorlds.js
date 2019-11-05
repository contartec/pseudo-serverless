'use strict'

require('module-alias/register')

const WorldTibiaDataAPIService = require('worlds/services/WorldTibiaDataAPIService')

/**
 * @apiName getNearest
 * @apiVersion 0.1.0
 * @apiGroup World
 *
 * @apiParam {World} The world filters 
 *
 * @apiSuccess {Object} The list of [`Worlds`]{@link World}
 *
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      name           : 'Calmera',
 *      creation_date  : '2003-04',
 *      location       : 'North America',
 *      ...
 *    }
 *    ...
 *  ]
*/
const main = async event => {
  try {
    console.warn('[saveWorlds] init')

    const worlds = await WorldTibiaDataAPIService
      .getWorlds()

    console.warn(`[saveWorlds] finish ${worlds.length}`)

    return ({
      worlds
    })
  }
  catch (e) {
    console
      .error(`[getWorlds] ${event.queryStringParameters}`, {
        error : e.message,
        stack : e.estack
      })

    return ({ e })
  }
}

module.exports = { main }