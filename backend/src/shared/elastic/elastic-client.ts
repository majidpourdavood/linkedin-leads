import { Client } from '@elastic/elasticsearch';

const elasticClient = new Client({
  node: process.env.ELASTIC_NODE || 'http://localhost:9200',
  requestTimeout: 10000,
});

export const PROFILE_INDEX = 'linkedin_profiles';

export default elasticClient;
