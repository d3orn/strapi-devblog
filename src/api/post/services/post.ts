/**
 * post service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::post.post', ({ strapi }) =>  ({
  async findPublic(args) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        premium: false,
      },
    }

    return await Promise.all([
      strapi.entityService.findMany('api::post.post', newQuery),
      strapi.entityService.count('api::post.post', {
        filters: newQuery.filters,
      }),
    ])
  },

  async findOneIfPublic(args) {
    const { id, query } = args;

    const post = await strapi.entityService.findOne('api::post.post', id, query);
    return post.premium ? null : post;
  },

  async likePost(args) {
    const { id, userId, query } = args;

    const postToLike = await strapi.entityService.findOne('api::post.post', id, {
      populate: ['likedBy'],
    });

    return await strapi.entityService.update('api::post.post', id, {
      data: {
        likedBy: [...postToLike.likedBy, userId],
      },
      ...query,
    });
  },
}));
