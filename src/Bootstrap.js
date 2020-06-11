import _ from 'lodash';

/**
 * Bootstrapped data supplied when the React app is launched
 * @type {object}
 */
const defaultBootstrap = {
  audiencesAndProgrammes: {},
  apiSettings: {},
};

const getBootstrap = () => {
  if (!_.has(window, 'Bootstrap')) {
    return defaultBootstrap;
  }
  const bootstrap = _.cloneDeep(window.Bootstrap);
  delete window.Bootstrap;
  return bootstrap;
}
export default getBootstrap();
