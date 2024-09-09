module.exports = {
  likePostMutation: `
    type Mutation {
      likePost(id: ID!): PostEntityResponse
    }
  `,
  getLikePostResolver: (strapi) => {
    return async (parent, args, ctx, info) => {
      const { id } = args;
      const { id: userId } = ctx.state.user;

      const likedPost = await strapi.service('api::post.post').likePost({
        id,
        userId,
      });

      const { toEntityResponse } = strapi
        .plugin('graphql')
        .service('format')
        .returnTypes;

      return toEntityResponse(likedPost, {
        args,
        resourceUID: 'api::post.post'
      });
    };
  },
  likePostMutationConfig: {
    auth: {
      scope: ['api::post.post.likePost'],
    }
  }
}
