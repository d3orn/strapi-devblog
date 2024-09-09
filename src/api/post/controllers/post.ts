/**
 * post controller
 */
const { sanitize } = require('@strapi/utils');
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({strapi}) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = "ok";
    } catch (error) {
      ctx.body = error;
    }
  },

  async find(ctx) {
    if (ctx.state.user) return await super.find(ctx)

    const page = ctx.query.page  && typeof ctx.query.page === 'string' ? parseInt(ctx.query.page, 10) : 1;
    const pageSize = ctx.query.pageSize && typeof ctx.query.pageSize === 'string' ? parseInt(ctx.query.pageSize, 10) : 10;
    const start = (page - 1) * pageSize;

    const [publicPosts, totalCount] = await strapi.service("api::post.post").findPublic({...ctx.query, start, limit: pageSize});

    const sanitizedPosts = await sanitize.contentAPI.output(publicPosts, strapi.getModel("api::post.post"));

    const totalPages = Math.ceil(totalCount / pageSize);

    ctx.body = {
      data: sanitizedPosts.map(post => ({
        id: post.id,
        attributes: post,
      })),
      meta: {
        pagination: {
          page,
          pageSize,
          pageCount: totalPages,
          total: totalCount,
        },
      },
    };
  },

  async findOne(ctx) {
    if (ctx.state.user) return await super.findOne(ctx);

    const { id } = ctx.params;
    const { query } = ctx;

    const postIfPublic = await strapi.service("api::post.post").findOneIfPublic({
      id,
      query,
    });

    if (!postIfPublic) {
      return ctx.notFound('Post not found');
    }

    const sanitizedPosts = await sanitize.contentAPI.output(postIfPublic, strapi.getModel("api::post.post"));

    ctx.body = {
      data: {
        id: sanitizedPosts.id,
        attributes: sanitizedPosts,
      },
      meta: {}
    };
  },

  async likePost(ctx) {
    const user = ctx.state.user;
    const { id } = ctx.params;
    const { query } = ctx;

    const updatedPost = await strapi.service("api::post.post").likePost({
      id,
      userId: user.id,
      query,
    });

    const sanitizedPosts = await sanitize.contentAPI.output(updatedPost, strapi.getModel("api::post.post"));

    ctx.body = {
      data: {
        id: sanitizedPosts.id,
        attributes: sanitizedPosts,
      },
      meta: {}
    };
  },
}));
