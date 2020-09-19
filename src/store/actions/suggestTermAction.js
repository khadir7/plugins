import { actionGenerator } from 'utils/ActionGenerator';
import KeyMirror from 'utils/KeyMirror';

const _actions = [
  'LOAD_OVALEDGE_CATEGORY_ONE',
  'LOAD_OVALEDGE_DOMAINS',
  'SET_OVALEDGE_CATEGORY_ONE',
  'SET_OVALEDGE_DOMAINS',
  'FETCH_OVALEDGE_DOMAINS_FAILED',
  'FETCH_OVALEDGE_CATEGORY_ONE_FAILED',
  'INSERT_BUSINESS_GLOSSARY_DATA'
];

const Actions = KeyMirror(_actions);

const namespacedActionGenerator = actionGenerator(Actions);

const getOvalEdgeCategories = namespacedActionGenerator('LOAD_OVALEDGE_CATEGORY_ONE', true);

const setOvalEdgeCategories = namespacedActionGenerator('SET_OVALEDGE_CATEGORY_ONE', true);

const fetchCategoryOneFailed = namespacedActionGenerator('FETCH_OVALEDGE_CATEGORY_ONE_FAILED');

const getOvalEdgeDomains = namespacedActionGenerator('LOAD_OVALEDGE_DOMAINS');

const setOvalEdgeDomains = namespacedActionGenerator('SET_OVALEDGE_DOMAINS', true);

const fetchDomainsFailed = namespacedActionGenerator('FETCH_OVALEDGE_CATEGORY_ONE_FAILED');

const insertBusinessGlossary = namespacedActionGenerator('INSERT_BUSINESS_GLOSSARY_DATA', true);

export default {
  Actions,
  getOvalEdgeCategories,
  setOvalEdgeCategories,
  fetchCategoryOneFailed,
  getOvalEdgeDomains,
  setOvalEdgeDomains,
  fetchDomainsFailed,
  insertBusinessGlossary
};
