const { sanitizeEntity } = require('strapi-utils');
const slugify = require('slugify');

module.exports = {
  lifecycles: {
    async beforeCreate(data) {
      if (data.title) {
        data.slug = slugify(data.title, {lower: true});
      }
    },
    async beforeUpdate(params, data) {
      if (data.title) {
        data.slug = slugify(data.title, {lower: true});
      }
    },
  },
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.category.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.category });
  },

  async bulkCreate(ctx) {

    const list = ctx.request.body;
    list.map(name => strapi.services.category.create({
      name,
      slug: slugify(name, {lower: true})
     }))

    return Promise.all(list);
  },
};
