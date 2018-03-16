import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
import { CAMPAIGN_FACTORY_ADDDRESS } from '../env.config.js';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  CAMPAIGN_FACTORY_ADDDRESS,
);

export default instance;
