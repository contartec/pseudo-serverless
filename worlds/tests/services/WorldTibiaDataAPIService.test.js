'use strict'

const sinon = require('sinon')
const { expect } = require('chai')

const WorldTibiaDataAPIService = require('worlds/services/WorldTibiaDataAPIService')

const tibiaDataAPIWorlds = require('worlds/tests/fixtures/tibiaDataAPIWorld.fixture')
const tibiaDataAPIWorldNotFound = require('worlds/tests/fixtures/tibiaDataAPIWorldNotFound.fixture')

describe('WorldTibiaDataAPIService', () => {
  describe('.getTotalPlayersOnline', () => {
    context('when `world` is found', () => {
      let getWorldSpy, totalPlayersOnline

      before(async () => {
        const worldName = tibiaDataAPIWorlds.world.world_information.name

        getWorldSpy = sinon
          .stub(WorldTibiaDataAPIService, 'getWorld')
          .returns(tibiaDataAPIWorlds)

        totalPlayersOnline = await WorldTibiaDataAPIService
          .getTotalPlayersOnline(worldName)
      })

      after(() => getWorldSpy.restore())

      it('should return the total of online players', () => {
        expect(totalPlayersOnline).to.eql(tibiaDataAPIWorlds.world.world_information.players_online)
      })
    })

    context('when `world` is not found', () => {
      let getWorldSpy, totalPlayersOnline

      before(async () => {
        const worldName = 'arpel'

        getWorldSpy = sinon
          .stub(WorldTibiaDataAPIService, 'getWorld')
          .returns(tibiaDataAPIWorldNotFound)

        totalPlayersOnline = await WorldTibiaDataAPIService
          .getTotalPlayersOnline(worldName)
      })

      after(() => getWorldSpy.restore())

      it('should return `null`', () => {
        expect(totalPlayersOnline).to.not.exist
      })
    })
  })
})