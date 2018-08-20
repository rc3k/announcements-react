import _ from 'lodash';

/**
 * Bootstrapped data supplied when the React app is launched
 * @see templates/announcements/announcements.html
 * @type {object}
 */
let Bootstrap = {
  audiencesAndProgrammes: {},
  apiSettings: {},
};

if (_.has(window, 'Bootstrap')) {
  Bootstrap = _.cloneDeep(window.Bootstrap);
  delete window.Bootstrap;
}

export default Bootstrap;
