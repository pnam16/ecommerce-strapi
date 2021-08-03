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
  // [
  //   "Balo Túi Ví",
  //   "Mắt kính",
  //   "Phụ kiện nam",
  //   "Quần",
  //   "Thắt Lưng",
  //   "Trang Sức Nam",
  //   "Áo khoác  Áo vest",
  //   "Áo nỉ Áo len",
  //   "Áo sơ mi",
  //   "Áo thun",
  //   "Đồ Trung Niên",
  //   "Đồ bộ Đồ mặc nhà",
  //   "Đồ lót",
  //   "Đồ đôi"
  // ]
};
