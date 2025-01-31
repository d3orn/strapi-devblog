/**
 * check-role policy
 */

export default (policyContext, config, { strapi }) => {
  const { userRole } = config;
  const isEligible = policyContext.state.user
    && policyContext.state.user.role.code == userRole;

  if (isEligible) {
    return true;
  }

  return false;
};
