const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      /* // example
      env: {
        mongodb_password: 'when_running_dev'
      } */
    };
  }

  return {
    /* config options for all phases except development here */
    /* // example
    env: {
      mongodb_password: 'when_running_build_or_export'
    } */
  };
};
