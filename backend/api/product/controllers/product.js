const { sanitizeEntity } = require('strapi-utils');
const slugify = require('slugify');
const axios = require('axios');

const base = "http://namxg-ecommerce-backend.herokuapp.com"

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

    const entity = await strapi.services.product.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },

  async bulkCreate(ctx) {
    const {data: {products}} = await axios.get(`${base}/product?unlimited=true`)

    const ids = products.map(e => e.id)

    ids.forEach(async element => {
      const {data} = await axios.get(`${base}/product/${element}`)
      const product = data;

      const media = await strapi.query('file', 'upload').findOne({
        name: product.image.split("/").reverse()[0],
      });

      const category = await strapi.services.category
        .findOne({name: product.category});

      const title = product.title.split("]").reverse()[0].trim();

      await strapi.services.product.create({
        title: title ? title : "",
        description: product.description,
        price: product.price,
        slug: slugify(title, {lower: true}),
        status: "published",
        image: media.id,
        categories: [category.id]
      })
    });

    return "";
  },
};
