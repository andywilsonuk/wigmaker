import campaignData from '../market/campaignData'
import notionData from '../research/notionData'
import milestoneTriggerData from './milestoneTriggerData'
import researchData from '../research/researchData'
import opportunitiesData from '../mesh/opportunitiesData'

class DataProvider {
  constructor () {
    this.notions = notionData
    this.research = researchData
    this.campaigns = campaignData
    this.milestoneTriggers = milestoneTriggerData
    this.opportunities = opportunitiesData
    this.allResearch = notionData.concat(researchData)

    this.idDictionary = new Map()
    this.all = notionData.concat(researchData).concat(campaignData).concat(milestoneTriggerData).concat(opportunitiesData)
    this.all.forEach((item) => {
      this.idDictionary.set(item.id, item)
    })
  }

  getById (id) {
    return this.idDictionary.get(id)
  }
}

const dataProvider = new DataProvider()
export default dataProvider
