/**
 * `timer-header` middleware
 */

import { Strapi } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const delta = Math.ceil(Date.now() - start);
    ctx.set('X-Response-Time', `${delta}ms`);
  };
};
