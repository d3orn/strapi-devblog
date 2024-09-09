module.exports = {
  beforeCreate: async ({params}) => {
    const adminId = params.data.createdBy;

    const author = (await strapi.entityService.findMany('api::author.author', {
      populate: ['admin_user'],
      filters: {
        admin_user: {
          id: adminId
        }
      }
    }))[0];

    params.data.authors.connect = [...params.data.authors.connect, author.id];
  }
}
