const { likePostMutation, getLikePostResolver, likePostMutationConfig } = require('./api/post/graphql/post');

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    // extensionService.shadowCRUD('api::post.post').disable();

    const extension = ({nexus}) => ({
      typeDefs: likePostMutation,
      resolvers: {
        Mutation: {
          likePost: getLikePostResolver(strapi)
        }
      },
      resolversConfig: {
        "Mutation.likePost": likePostMutationConfig
      }
    })

    extensionService.use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['admin::user'],
      afterCreate: async ({result}) => {
        const {email, username, firstname, lastname, id, createdAt, updatedAt} = result;
        await strapi.service('api::author.author').create({
          data: {
            email,
            username,
            firstname,
            lastname,
            createdAt,
            updatedAt,
            admin_user: [id]
          }
        });
      },
      afterUpdate: async ({result}) => {
        const author = (await strapi.entityService.findMany('api::author.author', {
          populate: ['admin_user'],
          filters: {
            admin_user: {
              id: result.id
            }
          }
        }))[0];

        const { email, username, firstname, lastname, updatedAt } = result;

        await strapi.service('api::author.author').update(author.id, {
          data: {
            email,
            username,
            firstname,
            lastname,
            updatedAt
          }
        });
      },
    })
  },
};
