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


    console.log(`product`, products)

    const ids = products.map(e => e.id)

    ids.forEach(async element => {
      const product = await axios.get(`${base}/product/${element.id}`)

      const media = await strapi.query('file', 'upload').findOne({
        name: product.image.split("/").reverse()[0],
      });

      const category = await strapi.services.category
        .findOne({name: "Balo Túi Ví"})

      await strapi.services.product.create({
        title: product.title.split("]").reverse()[0].trim(),
        description: product.description,
        price: product.price,
        slug: slugify(title, {lower: true}),
        status: "published",
        image: media.id

      })
    });
    // console.log(`cate`, await strapi.services.category.findOne({name: "Balo Túi Ví"}))
    //   //  {
    //   //   status: "published",
    //   //   title: "A",
    //   //   slug: "a",
    //   //   description: "A",
    //   //   price: 1, image: 110, categories: [49]
    //   // }
    // });
    // console.log(`media`, media)
    return "aaa";
  },
};

const a = {
  "categories": {
    "8d196faf-1584-4883-989e-dcda9db13ff1": "Balo Túi Ví",
    "1545409e-b977-42b7-a5d0-9c8ad63bd283": "Mắt kính",
    "b005ddfe-5365-44f8-bba4-8d28aec80790": "Phụ kiện nam",
    "6d527105-519d-4353-8fbc-9e72e36d9b21": "Quần",
    "846008d4-784a-41a5-8182-f9f515bb588e": "Thắt Lưng",
    "e8a95ad3-a037-4dd3-b841-7b2e49f29015": "Trang Sức Nam",
    "0a86c892-9cfc-405e-9c5d-0efc68bb2290": "Áo khoác  Áo vest",
    "70d78106-50d6-421b-ba7a-1908cc712517": "Áo nỉ Áo len",
    "1e668c79-b669-480d-b52f-871bd03b8c3c": "Áo sơ mi",
    "281f2116-0d62-4ff3-a2d0-382063785327": "Áo thun",
    "42bc9805-e90a-4bc2-914d-84c581e5683a": "Đồ Trung Niên",
    "708f404f-e628-4084-ae63-9d9616b0b7cb": "Đồ bộ Đồ mặc nhà",
    "2ef38370-4d9b-4d33-9b31-84e8bcec7640": "Đồ lót",
    "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9": "Đồ đôi",
  },
  "products": [
    {
      "_id": "606f3d359aff6f3d4f04ebbc",
      "id": "2ea9a272-2913-4088-848e-d7d16e9bc175",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun Unisex N7 Basic Tee phông trơn nam nữ tay lỡ oversize form rộng 12 màu",
      "image": "https://cf.shopee.vn/file/8bca483371fdec1c0f9bf89b02df20d8_tn",
      "price": 145000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebbd",
      "id": "901a8a35-3bee-44e2-9de5-1ec444d6ab2b",
      "title": "Áo sơ mi nam họa tiết FEAER vải Lụa thoáng mát, thấm hút, không nhăn form slim fit Boo Boo",
      "image": "https://cf.shopee.vn/file/0cf76b5bd33181657fa7a1db932ec31a_tn",
      "price": 260000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebbe",
      "id": "7db286bf-eb5b-4d56-b1f1-afded89f7b57",
      "title": "Áo thun nam cổ tròn POLOMAN vải Cotton co giãn,dày dặn, form regular fit B02",
      "image": "https://cf.shopee.vn/file/4df7671e3385f1c6d9850e9616c96eff_tn",
      "price": null,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 99,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebbf",
      "id": "4898e38c-eb26-4799-a6f0-cff73d7d48a0",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây Chuyền Mặt Hình Mặt Trăng Mặt Trời Thời Trang Cho Nam Nữ",
      "image": "https://cf.shopee.vn/file/9a686d7b25d9467012be049e3ac88ebe_tn",
      "price": 26892,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc0",
      "id": "7820c20c-cafc-4077-a874-b892ee667c35",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo polo nam Galvin cổ dệt bo len ,áo thun nam có cổ tay lỡ 12 - Leo Vatino",
      "image": "https://cf.shopee.vn/file/551d891431a0600e155299591a38be70_tn",
      "price": 220000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc1",
      "id": "32cf1db9-7165-41db-a0ec-815e21ab9667",
      "title": "Quần Baggy Nam Nữ KAKI Ống Suông Unisex - Kiểu quần kaki nam nữ thun vải đen và be tan Leevin Store",
      "image": "https://cf.shopee.vn/file/077b4f12cd804b2d491422438f8b5f2e_tn",
      "price": null,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 93,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc2",
      "id": "2a6ca51e-530a-49b0-b7de-1c6fe3e1b009",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Nhẫn Thép Titan Không Gỉ 22316 Dành Cho Cặp Đôi",
      "image": "https://cf.shopee.vn/file/db0b1f12b210fd327df607e4af2b8c44_tn",
      "price": 39400,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc3",
      "id": "32c58dff-bddf-46dc-8477-8d26ab0f79cb",
      "title": "[Giảm giá 50%] - Áo thun nam POLO trơn vải cá sấu cotton cao cấp ngắn tay cực sang trọng lịch lãm",
      "image": "https://cf.shopee.vn/file/34acd5e930c8a21e1c3a70d3cf2a70c5_tn",
      "price": 198000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc4",
      "id": "c40a54c2-be02-4417-b15e-5dbb96800f8a",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Nhẫn đeo tay bằng thép không gỉ thời trang cá tính cho cặp đôi",
      "image": "https://cf.shopee.vn/file/b70d197c430de75d8cca22add79ca042_tn",
      "price": 58000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc5",
      "id": "bde3330c-2acb-497d-9b58-5c96fce6857d",
      "title": "MẮT KÍNH THỜI TRANG CHỮ V FORM NHỎ 424 2 CHẤM NHIỀU MÀU HOT TREND",
      "image": "https://cf.shopee.vn/file/c65d70de433f2498d3563511a844735e_tn",
      "price": 16000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc6",
      "id": "1853bad2-ca3a-4b55-bbe9-55e1df0949de",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Kính Mát Cao Cấp Unisex Shady Chuẩn UV400 MK1050 (Nhiều Màu)",
      "image": "https://cf.shopee.vn/file/e71c15a77116bb2a64526c663d82c264_tn",
      "price": 250000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc7",
      "id": "fdc4c726-a461-46b9-ad54-3f71fc986f3c",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Nón bucket tròn vành GENZ trơn nhiều màu phong cách Ulzzang Unisex ZA005",
      "image": "https://cf.shopee.vn/file/fe4f3b8c1a4af99bf8a0aa99bd740830_tn",
      "price": 60000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc8",
      "id": "24c0dd4f-9468-4146-8e9a-4cad29f9171c",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền thép titan phong cách hip hop 28163S",
      "image": "https://cf.shopee.vn/file/1f0cd486d7da76dfbf95f184f5526db0_tn",
      "price": 66000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebc9",
      "id": "105fdf83-fba3-4f62-874f-8a08cacbeec5",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] XiaoboACC Dây Chuyền Nhiều Kiểu Dáng Chất Liệu Thép Titan Phong Cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/6c5ea38220ec96248675d40aecf11c23_tn",
      "price": 35000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebca",
      "id": "165bf094-2590-4be9-b57b-8513297842cc",
      "title": "Gọng kính thời trang SouthSide BUCSHOP nam nữ",
      "image": "https://cf.shopee.vn/file/2fd9fa621ae76449e7807544676a9c42_tn",
      "price": 99000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebcb",
      "id": "39476561-003e-4cd3-8fc8-e0111bd2e3da",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo Thun Nam Có Cổ Vải Cá Sấu Côtton Cao Cấp.Chất Lượng A799 , mẫu mới 2020",
      "image": "https://cf.shopee.vn/file/0a067fdf8f3e484780be85ad0cbf7a2f_tn",
      "price": 170000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebcc",
      "id": "7ea4e633-2b44-4675-bc36-32fb27689906",
      "title": "Áo thun Polo nam cổ bẻ vải cá sấu Cotton trẻ trung 6 màu P11 - POLOMAN",
      "image": "https://cf.shopee.vn/file/2f3518a551616d9f2fc564faacdbdaac_tn",
      "price": 399000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebcd",
      "id": "4c5e58b3-ee09-4717-8e68-254339e8cc65",
      "title": "Vòng cổ gắn xúc sắc hình mặt cười phong cách hiphop",
      "image": "https://cf.shopee.vn/file/ca4ba86cc79e3a2e6f930f8d30c9e225_tn",
      "price": null,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 119,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebce",
      "id": "e4824ef4-9e17-4360-b338-c1a02a6c7697",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Khuyên dáng dài phong cách Hàn Quốc cho nam",
      "image": "https://cf.shopee.vn/file/6b63a974397efb80b9a89a16b7398ff7_tn",
      "price": 8000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebcf",
      "id": "b8188102-b6e2-430f-8527-2312cb4d530c",
      "title": "Áo sơ mi ngắn tay nhuộm màu độc đáo phong cách thành phố thoải mái cá tính cho nam giới",
      "image": "https://cf.shopee.vn/file/fd7d876df3c31ca7bfbb93cee8f41755_tn",
      "price": 250000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd0",
      "id": "a53b3571-dc4a-4926-bb54-c91c8d716179",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khuyên tai nam G-dragon cực chất (1pcs) - Bim's House",
      "image": "https://cf.shopee.vn/file/620492307efe5962fac13573168d9636_tn",
      "price": 15000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd1",
      "id": "45758f89-a4b9-40b2-87f2-a57248682383",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần lót Boxer nam vải lụa băng tự nhiên 100% thoáng khí,co giãn cao cấp POLOMAN",
      "image": "https://cf.shopee.vn/file/4a576b8aee0ab30c8bf054e6530637a1_tn",
      "price": 120000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd2",
      "id": "af008e2b-988b-455a-a132-12a650ec88eb",
      "title": "[HOT TREND] ÁO KHOÁC KAKI JEAN NAM ĐẸP THỜI TRANG MỚI NHẤT 2019 KKN01",
      "image": "https://cf.shopee.vn/file/4c9c05be289167e68918129445b2650b_tn",
      "price": 108000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd3",
      "id": "5daaae00-e558-45d0-a12c-5c3478236042",
      "title": "[Mã FASHIONHOT27 giảm 10K]40-100kg Quần jogger ống rộng có bo simple ulzzang bigsize thời trang unisex",
      "image": "https://cf.shopee.vn/file/16aa18093baa50f721fff9a9b508dd79_tn",
      "price": 135000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd4",
      "id": "0c5bfa60-90ec-4d39-91b9-730deff1deb5",
      "title": "[Mã FASHIONHOT27 giảm 10K][Có VIDEO + ẢNH THẬT] Áo sweater - Áo nỉ bông tay dài UNISEX NE346",
      "image": "https://cf.shopee.vn/file/db5ec6d79c3937c3efa8e2d6b3b1efbd_tn",
      "price": 120000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd5",
      "id": "622a3794-0369-4804-827d-a0c95b5e6677",
      "title": "Áo thun nam nữ unisex tay lỡ LF basic tee phông form rộng oversize 2 màu trắng và đen cotton dáng xuông streetwear",
      "image": "https://cf.shopee.vn/file/c0f724323c5aa36714519bc48cde7dd0_tn",
      "price": 149000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd6",
      "id": "9c210d3c-750e-4fa2-a912-d1d7282ba99a",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Áo polo nam màu xanh jade họa tiết trơn phối gân dọc đơn giản APL37",
      "image": "https://cf.shopee.vn/file/252815eed5e5b05568a6759508f24331_tn",
      "price": 310000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd7",
      "id": "9cc47a5f-8ece-4a73-b986-8e68f15e64fa",
      "title": "[Mã FASHIONHOT27 giảm 10K]Bộ Quần Áo Đũi Nam chất vải đũi thái loại dày BD33",
      "image": "https://cf.shopee.vn/file/2287300230df650a0a4c7d2aab4508e6_tn",
      "price": 200000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd8",
      "id": "e4e0cb1e-2a4e-449e-99ff-91e9cf142cc3",
      "title": "Quần Đùi Nam 5S (4 màu) Vải Gió Mềm, Siêu Nhẹ, Dáng Thể Thao (QSG21010-05)",
      "image": "https://cf.shopee.vn/file/ad53ea340213283a33ff0b65366e3104_tn",
      "price": 255000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebd9",
      "id": "e86ba7cc-fd4e-4439-b43f-66ce01f75541",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Lót Giày Hương Quế, Lót Giầy Khử Mùi Hôi Hiệu Quả",
      "image": "https://cf.shopee.vn/file/b7039bbbf84d6e948283039721148313_tn",
      "price": 9900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebda",
      "id": "1fb593e2-71f3-4e2c-9deb-570c6f7ce024",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Dây Chuyền Mặt Hình Thánh Giá Phong Cách Harajuku Đường Phố 2282 Cho Nam Và Nữ",
      "image": "https://cf.shopee.vn/file/6ead55a305a8ba71b6190451f5397fdd_tn",
      "price": 44200,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebdb",
      "id": "4b4b4e64-cb1f-4ec7-83e5-ffdadbc24c97",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun tay lỡ form rộng Unisex siêu anh hùng cực cool, áo phông nam nữ size HLFashion",
      "image": "https://cf.shopee.vn/file/5f37cc92572cb76b4a0433d28caa4f7f_tn",
      "price": 130000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebdc",
      "id": "25ecf08d-f4da-47f9-8329-d5aaebdd9584",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khuyên Tai Cho Nam Nữ Cá Tính Tròn",
      "image": "https://cf.shopee.vn/file/745cb2ccef904bd4c53df16deb25ae69_tn",
      "price": 5400,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebdd",
      "id": "c4c35875-7a39-4cb0-afaf-2fdc17d51a00",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần lót nam thun lạnh nhật bản, quần sịp đúc không đường may không viền",
      "image": "https://cf.shopee.vn/file/963f4d8370ae5ae5c8a255526c1381cc_tn",
      "price": 59000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebde",
      "id": "49cfe6e3-4503-4ed6-b5d3-b5d393a46199",
      "title": "[HÀNG LOẠI 1] Quần Lót Nam ❤ Quần Sịp Nam Muji Nhật Bản  Thông Hơi Thoáng Khí Kháng Khuẩn",
      "image": "https://cf.shopee.vn/file/d432bc5894a8d1d7bfa717e8f7c8495f_tn",
      "price": 29000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebdf",
      "id": "92e2a717-7992-473f-82c3-5b7158c208c4",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] (Hàng Xuất Xịn) Quần đùi nam, Quần Đũi Nam ( Mát - Nhẹ Như Không)",
      "image": "https://cf.shopee.vn/file/3ad254d287b0b1c5a151b6632a671942_tn",
      "price": 50000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe0",
      "id": "eb53d9a9-3677-4c2e-bcd0-7212dec9a76d",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo chống nắng nam 2020 , Chất Vải kim cương sần Siêu Mát, logo thêu",
      "image": "https://cf.shopee.vn/file/d90371f0f94e4d9aeb41f8c8079caa65_tn",
      "price": 119000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe1",
      "id": "de0dfac3-4894-4a45-9d98-77cb930ed364",
      "title": "Bông Tai Kim Loại Hình Tròn Phong Cách Punk Rock Cho Nam Và Nữ (Có Bán Riêng Dây Buộc Tóc)",
      "image": "https://cf.shopee.vn/file/c9c96826902573099643e42a8ba63fff_tn",
      "price": 7813,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe2",
      "id": "44b58820-0a2c-4021-9215-dba6013a6614",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất Cao Cổ Trơn Gân - Tất Trơn Gân Unisex",
      "image": "https://cf.shopee.vn/file/efb653fb56b7a25068b58e70ed090ea6_tn",
      "price": 12000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe3",
      "id": "e955f311-e898-47f9-8b68-a6dcfb399963",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng Tay Thép Titan Thiết Kế Đơn Giản Phong Cách Cổ Điển Hàn Quốc",
      "image": "https://cf.shopee.vn/file/0fe420b1d3fb2ed43ee5b1b7c15744f2_tn",
      "price": 64800,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe4",
      "id": "d6d51008-111b-49c9-bff9-9c9526944dc8",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo polo nam Galvin cổ dệt bo len,áo thun nam có cổ tay lỡ công sở 25- Leo Vatino",
      "image": "https://cf.shopee.vn/file/46a0160b40a9927d6202bdd545a92049_tn",
      "price": 220000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe5",
      "id": "68e608d7-4680-4419-b544-258cee793183",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Áo Choàng Hóa Trang Nhân Vật Eren/Levi/Mikasa Trong Attack On Titan",
      "image": "https://cf.shopee.vn/file/b5f047b677abf0899ea4007dfd2016cd_tn",
      "price": 152572,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe6",
      "id": "55e8f776-6176-4c2e-9c36-09c2326d33bf",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Áo thun nam Cotton Compact phiên bản Premium chống nhăn Coolmate",
      "image": "https://cf.shopee.vn/file/4fbf868d5d43b67b4b7e47bc0ba79314_tn",
      "price": 259000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe7",
      "id": "f282986b-9005-4800-8907-b275ff4a9afb",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất Nam Nữ Cổ Cao Tia Điện Cực Chất XIMO (TN07)",
      "image": "https://cf.shopee.vn/file/7390f34fd12af301a98e0882d3973007_tn",
      "price": 18000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe8",
      "id": "b899bb03-eb78-4016-b8e9-1347c0eb6b82",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng Đeo Tay Nam Châm Cá Tính Cho Cặp Đôi",
      "image": "https://cf.shopee.vn/file/51c3dded79225d079fbbd77bbdf55826_tn",
      "price": 16000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebe9",
      "id": "e46f3251-b469-46e2-865b-7dda7d610aad",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Bộ thể thao nam bộ đồ quần áo nam tập gym KEEP TRAINING THE 1992",
      "image": "https://cf.shopee.vn/file/2d4a6afde50d287e28a53a4dc8f5d0f2_tn",
      "price": 150000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebea",
      "id": "00d8c254-1326-4a90-ab6e-02a34c695438",
      "title": "Ví Nam Da Bò Thật 100% Đốt Không Cháy (Ví Đứng)",
      "image": "https://cf.shopee.vn/file/58b9102ba326de95008884947cc84725_tn",
      "price": 250000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebeb",
      "id": "e73dc61b-74af-478f-9049-1858d05af3f4",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] TẤT ĐÁ BÓNG/THỂ THAO CỔ CAO Nike, Adidas, Mizuno",
      "image": "https://cf.shopee.vn/file/86034ad5593ea3ae930fcea60f48d912_tn",
      "price": 14900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebec",
      "id": "4643c90a-aeb7-4cc0-902a-22d7d90d9477",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo Đũi Nam Cổ Tàu Cộc Tay Đẹp Loại 1 hot 2020 AD63",
      "image": "https://cf.shopee.vn/file/22a1110dc83ef10efd88009a97e6daa9_tn",
      "price": 120000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebed",
      "id": "2c3068c6-6c07-45b8-b511-3db302a588e8",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền hình mặt trời phong cách Harajuku",
      "image": "https://cf.shopee.vn/file/f02e7758dac4f8985c688498d97af568_tn",
      "price": 69300,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebee",
      "id": "29652830-cfc0-4bbd-86e7-e7abd85a2d23",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất ngắn nam Vớ thấp cổ 3 màu trơn chống hôi chân",
      "image": "https://cf.shopee.vn/file/8e022cdaa1ccc462c0b3b51d02438c91_tn",
      "price": 3500,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebef",
      "id": "3062bfe1-c741-4fb2-85bb-1010f1401db2",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Hộp 5 quần lót ĐÙI xuất Nhật",
      "image": "https://cf.shopee.vn/file/ca62575d73eee1a7897ccbab8c894de0_tn",
      "price": 99000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf0",
      "id": "31651877-3c56-4beb-9f36-215042f63b59",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo phông nam có cổ đẹp tay ngắn cao cấp thời trang AT02",
      "image": "https://cf.shopee.vn/file/c93ad5e83770038ced07f4c8dff40da3_tn",
      "price": 150000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf1",
      "id": "33e34231-ff48-4a67-89e9-8baebf0f92d8",
      "title": "Quần Short Nam Kaki Mềm Mịn VICERO 6 Màu Trẻ Trung Phong Cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/736853cba44dc7d26afd0e46078b9451_tn",
      "price": 198000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf2",
      "id": "08bef5d7-b599-4b6e-8fb5-fefe3a5e793c",
      "title": "Nhẫn Trơn Titan Nhẫn cặp đppoi Nhẫn Đơn Không Gỉ Không Bay Màu Giá Siêu Rẻ",
      "image": "https://cf.shopee.vn/file/4a6e7add5499ef102a121b857a2c5911_tn",
      "price": 10000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf3",
      "id": "c4d49d3f-778d-4488-9750-22658737fd95",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền dạng chuỗi xích dày bằng thép titan cá tính thời trang",
      "image": "https://cf.shopee.vn/file/283b1a77876c7e6421c62b0940d23708_tn",
      "price": 45100,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf4",
      "id": "aba15f2c-c8ca-4964-8a91-a177b79ff528",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Gọng Kính Basic Đen - Trong Suốt Đủ Màu",
      "image": "https://cf.shopee.vn/file/22dba0ea1554b6856414070bb59de3b1_tn",
      "price": 20000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf5",
      "id": "d5934860-9b1e-4716-95d9-9e22df3819ea",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo đũi nam cổ tàu Áo cộc tay thể thao nam Linen THE 1992",
      "image": "https://cf.shopee.vn/file/02cb9b8e75da71535d59b1897c3bf37c_tn",
      "price": 120000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf6",
      "id": "0beb7cc1-17f6-4ffc-a4ec-b99dce1cbada",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần đùi,quần sooc nam thể thao vải gió mềm mịn 8 màu",
      "image": "https://cf.shopee.vn/file/9f61e0f80005031b49245cd3e274ac63_tn",
      "price": 99000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf7",
      "id": "b70026cb-c3be-4273-abff-0c5072069d1a",
      "title": "[Big Sale] Thắt lưng da bò nam - Dây nịt nam Hàn Quốc khóa tự động - Xem hàng trước khi thanh toán",
      "image": "https://cf.shopee.vn/file/b8f232a4b76a2cf7421fa3ecd08dea02_tn",
      "price": 20000,
      "categoryIds": [
        "846008d4-784a-41a5-8182-f9f515bb588e"
      ],
      "quantity": 100,
      "category": "Thắt Lưng"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf8",
      "id": "26e26e34-7fc2-4bf7-8d55-919f5f1594e9",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Set hình xăm siêu đáng yêu cá tính mã L-01 nguồn hàng buôn sỉ (1 tấm)",
      "image": "https://cf.shopee.vn/file/3c1c2b1afff631b381dc42ff297fa23f_tn",
      "price": 1000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebf9",
      "id": "5c6fffe4-a4f1-44e0-8dcf-97c834b5ebdf",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] QUẦN SỊP ĐÙI NAM DAS01A",
      "image": "https://cf.shopee.vn/file/6cfeef3b1f7a42ba7cdba1e9058f7842_tn",
      "price": 110000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebfa",
      "id": "f698dbb5-42a9-455f-9fba-b6c116577a65",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo gile nam nữ form rộng unisex (Có bigsize 2XL,3XL)",
      "image": "https://cf.shopee.vn/file/47e6d79c9b692219fa49d25d0571080d_tn",
      "price": 125000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebfb",
      "id": "e255af21-3fb8-4643-a9e1-437e60aaf6a8",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Áo Thun Nam Cổ Tròn 5S (6 màu) Tay Ngắn,Trẻ Trung, Mẫu Mới 2020",
      "image": "https://cf.shopee.vn/file/2965244fc375323542ed4d70df813f2f_tn",
      "price": 199000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebfc",
      "id": "4692c31b-b33e-441c-801c-47a77b4fa9e8",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] [ Siêu Rẻ ] Áo Thun Trơn Nam Nữ Nhiều Màu Vải Dày Không Xù Lông - La mode",
      "image": "https://cf.shopee.vn/file/f70c02163c178fdc36565cffd69533fc_tn",
      "price": 18224,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebfd",
      "id": "5c664b79-6fde-435f-b945-de91919577d2",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] ÁO THUN TRƠN OVERSIZE ĐỦ MÀU UNISEX (16 Màu)",
      "image": "https://cf.shopee.vn/file/d606536253da5192e1000a380f006d67_tn",
      "price": 150000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebfe",
      "id": "c4dfb303-888e-429c-81e2-0e96a1eb0ae9",
      "title": "Bộ vest SALE 70% còn 399k",
      "image": "https://cf.shopee.vn/file/58213076176e957be32e54249a3ad9b4_tn",
      "price": 399000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ebff",
      "id": "a8742fe6-0921-4406-be50-04034bd52baf",
      "title": "Áo thun Polo nam cổ bẻ họa tiết trơn FEAER 100% chất Cotton thoáng mát, không nhăn Basic FEAER |new arrival 2021|",
      "image": "https://cf.shopee.vn/file/9429fb6cf015e0bc61af4435726a3cf3_tn",
      "price": 139000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec00",
      "id": "a3d40cf8-dfb4-4c83-b6eb-df329a0d85ee",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần sịp đùi nam THE 1992 Quần lót boxing nam nhiều màu ngẫu nhiên",
      "image": "https://cf.shopee.vn/file/a06e8d6343f34e22d86514a6812d5f66_tn",
      "price": 25000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec01",
      "id": "fe48622a-4807-4050-b6b5-dde20f8f9f4a",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] IIXẢ HÀNGII Kính Bảo Hộ Giá Rẻ Kính Bảo Hộ Chống Bụi Tuyệt Đối",
      "image": "https://cf.shopee.vn/file/70b987c83b15024f53875fd2c45fc138_tn",
      "price": 15000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec02",
      "id": "171bb504-9b89-4c37-afc0-3c6dd8d58e41",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] ÁO THUN NAM NGẮN TAY CỔ BẺ MẪU MỚI NHIỀU MÀU",
      "image": "https://cf.shopee.vn/file/080e3fe11aed44804c64f5c7c91f8b8a_tn",
      "price": 69000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec03",
      "id": "af731769-0e6e-4f50-98c3-e98fd57b981f",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khuyên mũi trong suốt",
      "image": "https://cf.shopee.vn/file/7b267c5c28f8bf545d9403b5d8dfa68c_tn",
      "price": 10000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec04",
      "id": "3e9be778-b485-479c-9419-a371ef657e86",
      "title": "[Mã FASHIONG10 giảm 10k đơn từ 50k] Túi Đeo Hông Đeo Bụng Đeo Chéo Cao Cấp Nhiều Ngăn ( V-star)",
      "image": "https://cf.shopee.vn/file/2fee6558f403dda36c2a4c03448bc7bc_tn",
      "price": 50000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec05",
      "id": "6cb4cdac-ade7-4445-8dc0-fc79a959529e",
      "title": "Quần Baggy Nam Nữ Kẻ Caro PLAID Ống Suông Unisex - Kiểu quần baggy nữ vải Plaid kẻ caro dáng suông rộng Leevin Store",
      "image": "https://cf.shopee.vn/file/bedb93d286d9409e804e24626a9e6517_tn",
      "price": 198000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec06",
      "id": "cc41e46f-1217-401f-8e3d-33fadb7bf43d",
      "title": "[Mã FASHIONHOT27 giảm 10K]Freeship 50k-Quần Đùi Thể Thao Nam",
      "image": "https://cf.shopee.vn/file/90fda5fd6e6ad01b2c4647a6f021e454_tn",
      "price": 60000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec07",
      "id": "28e4a133-4c25-44a9-9557-2c2786eb657c",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] [FreeShip] Áo Ba Lỗ Nam",
      "image": "https://cf.shopee.vn/file/8eddec3dafebefbf2a12efe38cb72f8c_tn",
      "price": 39000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec08",
      "id": "2e53a164-b67b-4df8-900a-4523b545565c",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khăn BANDANA Streetwear Đa Năng - Khăn Choàng Bandana HipHop",
      "image": "https://cf.shopee.vn/file/6aacbc0a5c0514e876f2b78665c937ab_tn",
      "price": 25000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec09",
      "id": "43846d59-84a0-494c-8c60-7e1af4a36b5c",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dụng cụ bấm lỗ tai an toàn",
      "image": "https://cf.shopee.vn/file/5510e1233081d03f9f86f647317fa83a_tn",
      "price": 13000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0a",
      "id": "83fecf0f-238e-42db-b241-e3a3398a7c2c",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] quần short tây nam , quần nam ngắn tây âu kiểu dáng trẻ trung",
      "image": "https://cf.shopee.vn/file/e432e58f5b7b8555111168e857775341_tn",
      "price": 139000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0b",
      "id": "219f7bde-1b57-4890-b51d-7a348a57a3e5",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng Tay Thiết Kế Đơn Giản Dễ Thương Cho Nữ",
      "image": "https://cf.shopee.vn/file/a03e63653223f7147dd8f8640f138865_tn",
      "price": 3500,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0c",
      "id": "731df469-7550-4734-9e82-b545366acb8c",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] Áo sơmi tay lỡ kaki unisex Quốc Dân hoa cúc nam nữ phong cách ulzzang Wind",
      "image": "https://cf.shopee.vn/file/3fdabbead5e1f62dabc285006e0c04e7_tn",
      "price": 179000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0d",
      "id": "a3ad796c-be4f-4d17-8b37-5b7db1b526f5",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần đùi nam thun cotton mặc ngủ thoải mái, chất lượng (BIG SIZE)",
      "image": "https://cf.shopee.vn/file/3486902424c8636a49993d659d6567ec_tn",
      "price": 40000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0e",
      "id": "ac3a42b4-1561-4095-bc44-0ccb2f30d729",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Quần short thể thao dây rút thời trang đi biển có kích thước M-4XL cho nam giới",
      "image": "https://cf.shopee.vn/file/800e685e0e5189b55b8aede1d12ff9e2_tn",
      "price": 155000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec0f",
      "id": "94868f94-8932-412d-a587-94424d453c92",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo sơ mi nam tay dài trơn đủ màu có size big LAD-523, vải lụa mềm mát",
      "image": "https://cf.shopee.vn/file/cd9fac27a4bdf54fed67dd04c8045d97_tn",
      "price": 120000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec10",
      "id": "fc01e17c-7e94-4a0c-90e8-42855b5df657",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] ÁO BA LỖ NAM LEDATEX CAO CẤP",
      "image": "https://cf.shopee.vn/file/9977b134e26631660d847541c8e298c5_tn",
      "price": 36000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec11",
      "id": "eacf5623-ff14-47a4-991f-1891214276e1",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần Sịp Xì Đùi Nam Cao Cấp Quần Lót Nam Đùi Co Giãn 4 Chiều [ SDM ]",
      "image": "https://cf.shopee.vn/file/fe353f58155249da46bf45662a02a9ff_tn",
      "price": 32000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec12",
      "id": "e9b99300-0df9-4ff4-95a1-03187fafe98c",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] QUẦN LÓT NAM COTTON MỀM MÁT GIÁ RẺ CHỈ TỬ 8K-13K/C",
      "image": "https://cf.shopee.vn/file/7ea5ef5a59f3ae4d20fa0d2ac9f6cc62_tn",
      "price": 10000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec13",
      "id": "4fac9cdb-09e0-4afd-9ec0-d30cf894190d",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo chống nắng thông hơi nam phiên bán cải tiến mới nhất",
      "image": "https://cf.shopee.vn/file/8f8a0cb4f88eb627092fbf881bd84f16_tn",
      "price": 79000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec14",
      "id": "965d0417-0408-4bc3-973b-00159b98b7de",
      "title": "Bộ ngủ lụa Pijama nam màu trơn chất siêu đẹp (Hàng có sẵn)",
      "image": "https://cf.shopee.vn/file/26cd9839b70f8aeb5c7fe7721e780d9b_tn",
      "price": 359000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec15",
      "id": "e0439bf6-da63-4de0-9339-c71fc3a3cac3",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền mặt họa tiết phong cách thời trang hiphop",
      "image": "https://cf.shopee.vn/file/7b7c81d75939820b519b98510c81ff9e_tn",
      "price": 33000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec16",
      "id": "b5075374-e31e-4ebf-9a8a-5cf175827458",
      "title": "Kính Giả Cận Ngố Nobita Gọng Tăm Quảng Châu",
      "image": "https://cf.shopee.vn/file/c98f88e7b2e549d914fce7b51b2a6dfe_tn",
      "price": 18000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec17",
      "id": "8424a131-3019-4dd0-bd7f-14466d7e1927",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần Sịp Xì Chéo Nam Cao Cấp Quần Lót Nam Tam Giác Co Giãn 4 Chiều DL23",
      "image": "https://cf.shopee.vn/file/c37ef05ace702c8ef3ced703e0a7d557_tn",
      "price": 25000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec18",
      "id": "4559071b-2930-4b90-b8e0-a19b74f314ae",
      "title": "Hộp 4 Sịp Đùi Boxer Thông Hơi Cao Cấp Dành Cho Nam VEIKUCOOL",
      "image": "https://cf.shopee.vn/file/6aa50c5c89453cb10b1271b33204c507_tn",
      "price": 200000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec19",
      "id": "f94049cc-b4b5-4531-9867-47e38c1185b6",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo sát nách nam áo ba lỗ thể thao Tanktop nam THE 1992",
      "image": "https://cf.shopee.vn/file/af93b6a0a7ce3d94328614aedc23f18b_tn",
      "price": 70000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1a",
      "id": "b99d179b-1e35-4117-945d-0696fd32ae8a",
      "title": "[Mã FASHIONHOT27 giảm 10K]Bigsize 40-100kg nam nữ nhiều màu áo thun co giãn thời trang",
      "image": "https://cf.shopee.vn/file/e425959c3723dfcb4593108c1b9c842f_tn",
      "price": 110000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1b",
      "id": "128a7181-ca4d-4fd6-ab4b-c3f01db5dabd",
      "title": "Quần Jogger nam đẹp, Thiết kế mới nhất, Hàng kỹ mầu cực đẹp, Giá tốt nhất thị trường, Thoáng nhẹ, Thoải mái vô cùng!!!",
      "image": "https://cf.shopee.vn/file/654d3cc3907295876ef328ed62c586fd_tn",
      "price": 119000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1c",
      "id": "cf437588-59db-4e86-add4-b7df0d8e57bc",
      "title": "[Mã FASHIONHOT27 giảm 10K]Nơ bê lễ - nơ bê tráp chất lượng chuẩn hàng tp hcm sản xuất chuyên dùng cho các tiệm áo cưới",
      "image": "https://cf.shopee.vn/file/8612ac2f8edd977fb358f9f79868d381_tn",
      "price": 5500,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1d",
      "id": "6daee3f6-f113-4789-86ad-b8ddc3afcac5",
      "title": "Quần thể thao 2 túi kéo khoá vải thun lạnh dày đẹp - QSTT012",
      "image": "https://cf.shopee.vn/file/a2c7d45b6cd7e2e727003908fea7a4d9_tn",
      "price": 45000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1e",
      "id": "a3cfdb0c-64a4-4687-b65d-fc4317ed5cf2",
      "title": "[TRỢ GIÁ] Áo khoác Nam, Áo Blazer Nam phong cách Hàn Quốc BZ01",
      "image": "https://cf.shopee.vn/file/3d1602016e04443aebda7efdddbaf67d_tn",
      "price": 320000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec1f",
      "id": "ef402a29-ae29-4084-ba06-db4a68eecbc3",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất ngắn nam Vớ thấp cổ màu trơn THE 1992",
      "image": "https://cf.shopee.vn/file/c64857ce629077e3c57b3f4ab03e388e_tn",
      "price": 7000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec20",
      "id": "42c10228-d812-4af2-a0ed-6e7a98c6f8e8",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Album 7 - BST áo thun unisex form rộng mùa hè thời trang phong cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/b29db09475e67a8c52be4b968de11706_tn",
      "price": 24900,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec21",
      "id": "05220642-7ef6-4fc5-a2fc-bff80acdb38b",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo thun Nam , nữ đen-trắng - áo phông tay ngắn cổ tròn",
      "image": "https://cf.shopee.vn/file/191a95b2ff7821b6bb657fa6ed2c7bdc_tn",
      "price": 25000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec22",
      "id": "36beb585-6426-4220-9369-f1e301ab66db",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Áo Polo nam phối ngang Nelux vải cá sấu Cotton Trắng P01 - POLOMAN",
      "image": "https://cf.shopee.vn/file/2cb2de5c509eb2152f5b567c3a40246b_tn",
      "price": 399000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec23",
      "id": "a99074bf-1205-4873-a833-a4aed235d9f2",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo phông unisex nam nữ form rộng tay lỡ chữ SOUL đẹp vải dày mịn",
      "image": "https://cf.shopee.vn/file/238096503f791a237a769bb07ed5db48_tn",
      "price": 29900,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec24",
      "id": "4fc2e0d2-52b8-44d6-9cac-7b4a9159bc6f",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Combo 5 đôi tất ( vớ ) lười - mắt cá chân kháng khuẩn khử mùi thoáng khí",
      "image": "https://cf.shopee.vn/file/d7a5eb4b70b8e752219c3b24e36ed61a_tn",
      "price": 110000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec25",
      "id": "c2c28d44-d1f3-40ed-9e3b-72be93ea4c6f",
      "title": "Quần lót nam, quần sịp nam cotton - 1 loại lưng H.A.N.E.S (Ảnh thật ) Đủ size từ 35kg đến 90kg",
      "image": "https://cf.shopee.vn/file/eca15ad37dc9d7231efb6ea2b1df9fe9_tn",
      "price": 2850,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec26",
      "id": "f5d09fea-4ab6-4c23-9b0e-a23f670d1b6f",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] ÁO BA LỖ HÀNG VIỆT NAM 100% COTTON",
      "image": "https://cf.shopee.vn/file/3f85da34cadbeed85ec229f5f08f93f1_tn",
      "price": 25000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec27",
      "id": "ef8a0e32-64e7-4f25-a552-4a2d8d6e3a85",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần âu nam, quần baggy đen co dãn ôm ống côn vải chống nhăn cao cấp không bai, xù",
      "image": "https://cf.shopee.vn/file/9c27f0367267be0e4d4041ef2066e29e_tn",
      "price": 140000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec28",
      "id": "e051bc2d-c803-4f88-90c6-7cffe557fb89",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo Sơ Mi Nam Kẻ Sọc cao cấp - Vải 3D Đẹp Thoáng Mát SM00016",
      "image": "https://cf.shopee.vn/file/34923d4bd0d29c27e269e24deed5526a_tn",
      "price": 189000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec29",
      "id": "bf54cc12-e98e-4f69-9fb2-cd52ba43bc2c",
      "title": "❌FULLBOX HÃNG❌MẮT KÍNH NAM NỮ TRÒNG THUỶ TINH CAO CẤP MÀU XANH RÊU",
      "image": "https://cf.shopee.vn/file/168cb7b230bc24a05a14572ca340df44_tn",
      "price": 109000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2a",
      "id": "a44fc93e-5047-499f-8793-e2807fcec02b",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] 🌟FREESHIP🌟 Tất/vớ Nike cao cổ dấu tích 11 cm thể thao, gym nam nữ",
      "image": "https://cf.shopee.vn/file/60e2a42c597a2e66be98ec588565a9c7_tn",
      "price": 28000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2b",
      "id": "fdae717f-8aee-48d0-a0d2-8ffdb8b1f958",
      "title": "Quần Thể Thao Jogger 3 sọc & 1 sọc",
      "image": "https://cf.shopee.vn/file/a8c08ea7c950d79d3b6f8d433a2601b8_tn",
      "price": 59000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2c",
      "id": "7862f1f3-1215-4337-98fa-7ccf94d48a80",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần Sịp Lot Nam Đùi Màu Ngẫu Nhiên DL125",
      "image": "https://cf.shopee.vn/file/00e6091df6976d007bdb280ade4d2a66_tn",
      "price": 20000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2d",
      "id": "e34559c1-743e-4eeb-a496-c3ee2359fdbf",
      "title": "Bộ Đũi Nam Cộc Tay Cổ Tàu, Chất Đũi Thái, Form Chuẩn Mặc Mát Lạnh - Màu Nâu - BD01",
      "image": "https://cf.shopee.vn/file/ee8ca51607d96957da62b18ef4dd546a_tn",
      "price": 169000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2e",
      "id": "5456a31a-56b0-4d9d-8069-a328eeaeba26",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Cổ áo sơ mi giả dùng phối đồ phong cách thời trang cho nam và nữ",
      "image": "https://cf.shopee.vn/file/bb416d2f1cf33e328011cad940a2aca7_tn",
      "price": 94000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec2f",
      "id": "b09dd300-3a19-4799-9920-c029304fa323",
      "title": "[Mã FASHIONHOT27 giảm 10K]QUẦN NGỦ NAM - Họa Tiết Sang Trọng - Chất Kate Thoải Mái Thoáng Mát",
      "image": "https://cf.shopee.vn/file/8dc5f998ef53e3e1ffa95b3aed178a64_tn",
      "price": 49000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec30",
      "id": "2fb5daa4-7356-498d-8477-a68be694c732",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất Nam Cổ Ngắn ❤️🌸[Xả kho ]🌸❤️ Co Giãn Tốt,Thấm Hút Cho Nam",
      "image": "https://cf.shopee.vn/file/dfd2235e0eb28ff7c811c6449581e01e_tn",
      "price": 2000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec31",
      "id": "ad160dbd-88a9-426e-83ea-aa63dbc619f7",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần thể thao nam,quần thu đông nam chất umi cao cấp",
      "image": "https://cf.shopee.vn/file/4436bb8a29f9f869f420ad7ca5365488_tn",
      "price": 130000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec32",
      "id": "dfccdb2d-ff6d-4adb-9fd7-9bf22adf4716",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] [ STG ] Quần Sịp Xì Chéo Nam Cao Cấp Quần Lót Nam Tam Giác Co Giãn 4 Chiều, có túi zip",
      "image": "https://cf.shopee.vn/file/82b533e69b295739b4c3bcbc13fa77e4_tn",
      "price": 14000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec33",
      "id": "32034bae-e72e-4bd9-ab8d-4b821b5a1388",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Vòng tay phản quang sỉ số lượng lớn 3k",
      "image": "https://cf.shopee.vn/file/5fd5afabcdc2981d50223b48cb27a633_tn",
      "price": 6000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec34",
      "id": "e8d80d50-2e86-4f6c-b07a-9097d016b5af",
      "title": "Quần Short Gió Nam 5S (4 màu) Vải Mềm, Siêu Nhẹ, Dáng Thể Thao (QSG002S1)",
      "image": "https://cf.shopee.vn/file/4908f2342ee0b084a19ee68500506a77_tn",
      "price": 255000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec35",
      "id": "5e14679a-66ac-4b57-9440-8c1bea1b20df",
      "title": "Tất ngắn kháng khuẩn, chống mùi hôi, 5 màu sang trọng, cotton thoáng mát, thương hiệu Basis",
      "image": "https://cf.shopee.vn/file/7d09db8144abffd2e7e7cb174ceaba5c_tn",
      "price": 29000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec36",
      "id": "8a462a48-a510-40fb-ab31-b2365276db32",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo hoodie dáng rộng phong cách Hàn Quốc trẻ trung cho cặp đôi",
      "image": "https://cf.shopee.vn/file/008a7ac199e400c438c14778cad1b771_tn",
      "price": 243000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec37",
      "id": "2baf4b0c-1acd-4a82-8aed-03862ec71628",
      "title": "[SALE 50%] - Áo Thun Nam Cổ Tròn Cao Cấp ( nhiều màu) Tay Ngắn, chất cotton bề mặt vải mềm Mịn cực hot",
      "image": "https://cf.shopee.vn/file/3ebd3fa1d6ebf4fb62a949384dae0d1c_tn",
      "price": 99000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec38",
      "id": "cb19c456-8247-41ef-90f1-2ffa7f4bc6ec",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] [Album 5] Dây Chuyền Nam Titan Cá Tính Siêu Ngầu",
      "image": "https://cf.shopee.vn/file/1f952312e574764d46f3cdfdb7c423df_tn",
      "price": 55000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec39",
      "id": "1bc195ad-e6ff-40a7-9337-7bae2f2ddbf8",
      "title": "[Mã FASHIONHOT27 giảm 10K][Giảm giá 50%] - Áo thun nam POLO thiết kế vải cá sấu cotton cao cấp ngắn tay cực sang trọng",
      "image": "https://cf.shopee.vn/file/7d0984be70e9afaa1476bbfc8b6f02e3_tn",
      "price": 198000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3a",
      "id": "d8728f1a-78a1-4eab-a31a-9b279b78a987",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] SIÊU PHẨM 50 KHUÔN VẼ +1 HENNA 22g",
      "image": "https://cf.shopee.vn/file/831f49728db57a45df39f5a445eda603_tn",
      "price": 41300,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3b",
      "id": "f6c89eec-6662-4014-95bf-db1bd0dafbb0",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền đính ngọc trai nhân tạo phong cách thanh lịch dành cho nữ",
      "image": "https://cf.shopee.vn/file/b51a89c8ece9ccd36ede1dfc8dc34658_tn",
      "price": 17000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3c",
      "id": "bf7f7de4-9df8-4d46-a8fb-c7e661c2b1cf",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo khoác gió thu đông phối màu Bảo Đăng",
      "image": "https://cf.shopee.vn/file/b8004f157f82a3f96fcc5c0eca038a15_tn",
      "price": 158000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3d",
      "id": "80630152-7f83-44c4-85a3-ba5bf948f61c",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo Gile viền 2 sọc TRẮNG/ĐEN 🎶/Nam nữ unisex/FREESHIP 99K ❤️",
      "image": "https://cf.shopee.vn/file/43ef08ba6214b2fb9af203fb8b72867c_tn",
      "price": 240000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3e",
      "id": "f0aed676-b27c-4e15-8682-137953ab7b15",
      "title": "Quần hoa đi biển, chụp kỷ yếu",
      "image": "https://cf.shopee.vn/file/1c7c6067585e90c96ce429c65620fd45_tn",
      "price": 35000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec3f",
      "id": "b4269013-f1bf-4b6c-b5ca-5e3292e69214",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] NÓN BUCKET CỤP _ NÓN SỤP TRƠN NHIỀU MÀU",
      "image": "https://cf.shopee.vn/file/365d6c4f5aa93af4695e537a79bc105e_tn",
      "price": 59900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec40",
      "id": "807fa3e7-0cdb-4ec9-97bc-0fdf3f21cd47",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tấm dán xăm tatoo 1k",
      "image": "https://cf.shopee.vn/file/b7fe5302569a5f2db2053575bf8231f1_tn",
      "price": 1380,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec41",
      "id": "87672afb-e4f4-4577-b49d-c282e5981cf6",
      "title": "Kính lọc ánh sáng xanh Xiaomi TS Turok Steinhardt FU006 - Kính chống UV ánh sáng xanh Xiaomi HMJ01TS",
      "image": "https://cf.shopee.vn/file/489042b5dca785acd7cf541c0a558c8a_tn",
      "price": 299900,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec42",
      "id": "a5b9a902-90d4-4a74-9722-100b5e907036",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Cà vạt kỷ yếu - cà vạt nam nữ học sinh bản nhỏ 5cm - bán lẻ như buôn",
      "image": "https://cf.shopee.vn/file/d0d0830436ef766cbff4be57ca4371f9_tn",
      "price": 20000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec43",
      "id": "5467bae4-a139-45d8-b89f-e679326f941d",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Kính Đọc Sách Gọng Kim Loại Có Thể Gấp Gọn Tiện Dụng",
      "image": "https://cf.shopee.vn/file/98654dc35cda38704bdc7c33cabb850a_tn",
      "price": 29200,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec44",
      "id": "5f94fa02-c81d-4618-9df4-fa2bc6efb76c",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Dây Chuyền Phong Cách Hip Hop Cho Nam",
      "image": "https://cf.shopee.vn/file/4d065cb82444efd78880108e116428d3_tn",
      "price": 66000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec45",
      "id": "26cfe2a4-546d-4203-872c-d5c50e673114",
      "title": "[CLIP THẬT] Sơmi Họa tiết Dark Sky Fulltag MENDE(tag cổ + 2 tag giấy+tag tay) Chuẩn Cao Cấp 1:1 Sơ mi Lụa CNK 100%",
      "image": "https://cf.shopee.vn/file/bf07aa1b035334513cb61e83240fa26b_tn",
      "price": 230000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec46",
      "id": "f6af1a2c-c277-46fa-9a59-e912e07c6545",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Nón bucket vành cụp GENZ trơn nhiều màu phong cách Ulzzang Unisex ZA015",
      "image": "https://cf.shopee.vn/file/32dfd5dd9132649c91a5335bb082d8c4_tn",
      "price": 50000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec47",
      "id": "037164f8-87aa-4214-87f1-58d734144f68",
      "title": "[Mã FASHIONHOT27 giảm 10K]38-85kg Quần short nam nữ 38-85kg thời trang ullzzang bigsize",
      "image": "https://cf.shopee.vn/file/012c5eac1bda7bc1bceef15448600569_tn",
      "price": 100000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec48",
      "id": "bb66a935-b7c9-4cf9-83c2-6b67abb8b4a6",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] (Xả Kho) Quần Đùi Nam Kate BigSize - Giao Màu Ngẫu Nhiên",
      "image": "https://cf.shopee.vn/file/2d664bc1abbe94fdca0e80e2ba15a4c5_tn",
      "price": 75000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec49",
      "id": "9b054a7a-2ccb-4f8c-a687-da3295b46a5e",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] Áo khoác dù cardigan unisex form rộng Mặt Cười nam nữ ulzzang Wind",
      "image": "https://cf.shopee.vn/file/865b181b00eb96911329da421b2d1fec_tn",
      "price": 200000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4a",
      "id": "72b50d67-653e-45d4-9d27-5a348ab647c7",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo ba lỗ nam hàng Xuất khẩu Ledatex 100% cotton",
      "image": "https://cf.shopee.vn/file/eb48f04c21e8e15d04243b0804616f3b_tn",
      "price": 55000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4b",
      "id": "dd6650c4-41dd-4f81-84df-23aa08a034dc",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần Lót Nam Boxer Munafie Dệt Kim Co Giãn 4 Chiều + Túi Zip Sang Trọng",
      "image": "https://cf.shopee.vn/file/c48f6a1c4fc37c9fc35c2e78ae78f4cc_tn",
      "price": 35000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4c",
      "id": "7d42cead-bb1a-4d87-abcd-34bcd638ae40",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Bao Tay Chống Nắng ,Ống Tay Chống Nắng Hàn Quốc Let's Slim",
      "image": "https://cf.shopee.vn/file/45b4e0e059c9df960368817c0b57a2c2_tn",
      "price": 7900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4d",
      "id": "19bcd639-a6c2-48a3-bcec-90dd8ebbdb6c",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần nam Quần đũi dài nam ống suông Form Slimfit dáng âu",
      "image": "https://cf.shopee.vn/file/5a401c20c6472e86b730cda444a91c7b_tn",
      "price": 150000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4e",
      "id": "bb5d4972-af51-4a9a-b26f-bb514656df94",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo sơ mi nam cổ tàu dài tay kojiba SMT01",
      "image": "https://cf.shopee.vn/file/28b39e5c451f9df0753bd75ef4e0ff38_tn",
      "price": 150000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec4f",
      "id": "302c4b34-b947-4adb-bd21-a5cad29be62a",
      "title": "QUẦN LOT NAM THÔNG HƠI - HỘP 4 CHIẾC - QUẦN SỊP NAM TAM GIÁC NHẬT BẢN - CÓ SIZE LỚN MLQ01",
      "image": "https://cf.shopee.vn/file/e6d6f4f314619bbac355ea424bc793ba_tn",
      "price": 95000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec50",
      "id": "f0303f5d-7249-4495-9cb5-f35a7eb4d146",
      "title": "Áo Ba Lỗ Nam, Áo tank top tập gym nam cao cấp chất liệu thun, 4 chiều co giãn, thấm hút mồ hôi cực tốt ABL01",
      "image": "https://cf.shopee.vn/file/8717a04c71ce26934bdd0604c65c9567_tn",
      "price": 30000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec51",
      "id": "3f720d32-353d-48d3-8094-11b163cc2da4",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Dây Chuyền Thép Titan Mặt Bướm Kiểu Rỗng Phong Cách Hip Hop",
      "image": "https://cf.shopee.vn/file/1ce4ede610f21e4df52e1c7c58388512_tn",
      "price": 39500,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec52",
      "id": "911c6833-e0a1-44c7-a679-2e679d943f00",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo sơ mi nam dài tay dáng ôm sơ cổ bẻ vải lụa thái chống nhăn chống xù",
      "image": "https://cf.shopee.vn/file/fda6d31a110f46042464cf40b3ac43b3_tn",
      "price": 140000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec53",
      "id": "b4206717-d046-46ba-a3ef-0a9637b9bf07",
      "title": "[Mã FASHIONHOT27 giảm 10K]40 - 100kg Quần baggy nam nữ lưng thun co giãn bigsize(video ảnh thật)",
      "image": "https://cf.shopee.vn/file/8d40d959ccaf9346ac964ccfc907af68_tn",
      "price": 135000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec54",
      "id": "631106e7-9b39-4906-aca3-500d96699d61",
      "title": "Áo thun nam cổ tròn cotton Premium 5 màu mới trẻ trung, lịch lãm Basis AT04",
      "image": "https://cf.shopee.vn/file/60e968174566453011bc337712abdf96_tn",
      "price": 210000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec55",
      "id": "692c199b-db1a-48c7-b606-c6feb0e56cc1",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo sơ mi hoạ tiết đi biển Chất Kate thái loại 1( đủ size)- Giá xả hàng hôm nay",
      "image": "https://cf.shopee.vn/file/3682473fa2710fbeb23c03a171b2e52b_tn",
      "price": 39270,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec56",
      "id": "8f59d800-ba39-4a9a-ae82-7f9ef236a1b9",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Bộ thể thao nam- Bộ hè nam cộc tay",
      "image": "https://cf.shopee.vn/file/5e7bc6d62acd1bfeae34539029e6a3b4_tn",
      "price": 99000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec57",
      "id": "88122d7c-5f5d-498b-a2d2-03b9d2d1e495",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần lót nam DÁNG SỊP ĐÙI BOXER cotton co giãn 4 chiều AREMI 2021",
      "image": "https://cf.shopee.vn/file/b294ec5b48eb1ed8aeed93bc308a20cf_tn",
      "price": 90000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec58",
      "id": "c889a53f-c49b-4730-a908-fa65127211e6",
      "title": "Bộ đũi nam cộc tay Đồ bộ quần áo thể thao nam LINEN THE 1992",
      "image": "https://cf.shopee.vn/file/f08237ad641f5273810169d5ac39f247_tn",
      "price": 170000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec59",
      "id": "f0fe6987-bd0c-49bc-9d02-b223e0425051",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần baggy nam phong cách Hàn Quốc, ống suông mặc co giãn siêu dễ chịu",
      "image": "https://cf.shopee.vn/file/07c84a61ea174965cfebd9daadb1b47b_tn",
      "price": 125000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5a",
      "id": "475a92ac-8c21-4796-b84a-e5031db6e15c",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] Áo thun tay lỡ unisex phông form rộng Wollagee nam nữ phong cách ulzzang Wind",
      "image": "https://cf.shopee.vn/file/5f20bf98c4f76a3cc882c1f7349675c0_tn",
      "price": 99000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5b",
      "id": "15571af5-f3d7-4e08-91a0-5dc6e4a7bd17",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] 40-100kg Quần jogger nam nữ ống rộng bo thun bigsize unisex",
      "image": "https://cf.shopee.vn/file/23c4da2483b351a8cc7a3bf2c290e875_tn",
      "price": 135000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5c",
      "id": "009f5a25-fe35-4c09-93c4-9f1783d72539",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Nhẫn Nam Nữ Titan Trơn Không Họa Tiết [ FREE SHIP ]",
      "image": "https://cf.shopee.vn/file/8d39491b10b453e83cd5d734cc6fc84f_tn",
      "price": 49000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5d",
      "id": "99a9203e-90ce-40ee-845c-224338123aaf",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo Sơ Mi Ngắn Tay Phối Màu Đen Trắng Thời Trang Cho Nam",
      "image": "https://cf.shopee.vn/file/35985622b7d81d44f6d365aaba13a1bb_tn",
      "price": 210000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5e",
      "id": "12e79507-1bd8-473d-8c06-5c91c0f2a0c9",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Freeman - Quần lót nam lưng nhỏ thun lạnh siêu mát - Spandex Casual Freeman 6042",
      "image": "https://cf.shopee.vn/file/9503d3b0e016564539f8f678e286bdf8_tn",
      "price": 54000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec5f",
      "id": "99e06357-4a70-405a-941d-2e1b461a18d4",
      "title": "ĐỒ BỘ TRÁI CÂY ĐI BIỂN, NHIỀU MẪU TƯƠI SÁNG",
      "image": "https://cf.shopee.vn/file/a7117bf55af15eacb86513436c376623_tn",
      "price": 75000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec60",
      "id": "5620d0f5-1f13-452d-96db-9e05a2dcd81a",
      "title": "Quần ống rộng nam Baggy vải Hàn cao cấp màu đen, ghi co giãn thời trang Alpha - QA1",
      "image": "https://cf.shopee.vn/file/33ac1f728e8d1fcb151fea736c680599_tn",
      "price": 220000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec61",
      "id": "8fae1a2f-73df-4f9d-a374-166209200a2d",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo sát nách Tank Top áo lá áo ba lỗ nam cotton 100% cực đẹp và thấm hút",
      "image": "https://cf.shopee.vn/file/f0b3bc1c2e67a221898f43603fbba66f_tn",
      "price": 40000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec62",
      "id": "85e93205-fc68-4869-8beb-b7f7b7bdfc7e",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] BỘ ĐỒ NGỦ PIJAMA NAM NỮ CAO CẤP SANG TRỌNG QSHOP QM07",
      "image": "https://cf.shopee.vn/file/c13717dd10aa1f197187afe9863ab954_tn",
      "price": 290000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec63",
      "id": "0b147a2a-f4cd-4398-b7f2-66762c0e9d31",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] [ Free Ship ] Quần sịp quần lót nam thun lạnh doremon hàng hiệu",
      "image": "https://cf.shopee.vn/file/df832c717f9e7263de71c5d5e151426a_tn",
      "price": 56000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec64",
      "id": "b6ebb04c-df72-452c-9fbb-67e717968df5",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo sơ mi ngắn tay dáng rộng in họa tiết cá tính thời trang mùa hè cho nam",
      "image": "https://cf.shopee.vn/file/6eb251182eec3061f05d612248926c48_tn",
      "price": 220000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec65",
      "id": "3cb4268b-e234-42e5-828a-ba7748b7c340",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Túi đựng kính mát dây rút thời trang – Túi đựng điện thoại đồ đa năng",
      "image": "https://cf.shopee.vn/file/58ead43567b7b9d542cfd84c26f2e4ca_tn",
      "price": 2999,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec66",
      "id": "e5263b49-a232-48d9-aa52-4bd90bd2f317",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Quần thể thao nam Ultra Short có túi khóa kéo Coolmate",
      "image": "https://cf.shopee.vn/file/b664b68fb4389e79c8a325985ef59c2d_tn",
      "price": 189000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec67",
      "id": "6a18a202-3f1d-4139-a879-829d9b6c4f97",
      "title": "Bộ 4 Quần Boxer Lót Nam Thoáng Khí Bó Sát Chất Mềm Mặc Êm Không Bị Lằn Bụng, Sịp Đùi Nam",
      "image": "https://cf.shopee.vn/file/60a937fbaadcf0033b6569e6e1b75383_tn",
      "price": 15000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec68",
      "id": "3a56718e-48bf-4ff9-9331-09e943cf9f66",
      "title": "[Mã FASHIONHOT27 giảm 10K]( BIG SIZE ) Áo khoác kaki mantle dáng dài hàn quốc unisex",
      "image": "https://cf.shopee.vn/file/068f004454dd348d723b00c36d357ed8_tn",
      "price": 350000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec69",
      "id": "1217d596-8147-4526-91ea-74fb3de79a7f",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Túi Đeo Chéo Phản Quang Da Bóng Cao Cấp Chống Nước, Đeo Hông Ngăn Rộng Tiện Dụng",
      "image": "https://cf.shopee.vn/file/5fbcbe876fee4750605aac6c728942eb_tn",
      "price": 20000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6a",
      "id": "e2c2ce9b-a13b-446c-8c1a-317451b6faae",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Kính đọc sách chống mỏi mắt tiện dụng",
      "image": "https://cf.shopee.vn/file/3162d14addb69d53544953ac85dc6de2_tn",
      "price": 19700,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6b",
      "id": "63db9442-b920-45cc-a500-b205687327c3",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần short đũi nam- Quần đũi ngố nam siêu mát",
      "image": "https://cf.shopee.vn/file/544ca0a165aeb354d345a0bb522bb4e2_tn",
      "price": 129000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6c",
      "id": "be3536e1-59a0-43fa-a135-f5d1a642dfd1",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Xả kho thanh lí Áo ba lỗ cho Nam chất cotton mềm mịn ( ảnh thật)",
      "image": "https://cf.shopee.vn/file/13b5623cdbbe6108c5fa2120d1718f85_tn",
      "price": 15000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6d",
      "id": "965dc7c4-cdfb-45ec-8a2a-c3dd35389aae",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền mặt hình biểu tượng cảm xúc thời trang cho nam nữ",
      "image": "https://cf.shopee.vn/file/1763eb88b7931187e733d057c993af64_tn",
      "price": 45000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6e",
      "id": "413fc1af-dd12-41aa-893b-b0bf75e76ef4",
      "title": "[CLIP THẬT] Sơmi Họa Tiết Logo MENDE SS1 Fulltag | Chuẩn Cao Cấp 1:1 | TẶNG GIẤY THƠM - Sơ mi Lụa CNK 100%",
      "image": "https://cf.shopee.vn/file/a5530a91d9b00097a78f0f6c3a145da3_tn",
      "price": 238000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec6f",
      "id": "49a6f38c-7dfe-49f3-8833-32b988cfc664",
      "title": "[Mã FASHIONG10 giảm 10K đơn 50K] Tất nam nữ cao cổ hàn quốc 🍀 HÀNG ĐẸP 🍀",
      "image": "https://cf.shopee.vn/file/468e6d7f679ba9a86c505f3cbbfb7807_tn",
      "price": 13900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec70",
      "id": "acba4a87-bb8d-4572-865f-a7f95c84fd3d",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Cà vạt nữ bản nhỏ 6x26cm - cavat thắt sẵn, cavat học sinh",
      "image": "https://cf.shopee.vn/file/53c5b5748e3ac97ff0b70bcf20b95eba_tn",
      "price": 20000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec71",
      "id": "efa35cd6-2017-489b-aaad-20fcfe3ec47a",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Miếng lót giày hút mùi thoáng khí bằng quế tự nhiên tiện dụng cho nam và nữ",
      "image": "https://cf.shopee.vn/file/030dc62e5da8b30781b2e08e60488dda_tn",
      "price": 9900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec72",
      "id": "31a279b0-332d-4ea9-a409-fa102124fd55",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun TRƠN form rộng tay lỡ cotton TRẮNG ĐEN unisex nam nữ",
      "image": "https://cf.shopee.vn/file/39a5df8ee4843cda5614f2b27a1eafd0_tn",
      "price": 116000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec73",
      "id": "7a5594eb-f7e4-41fe-b9ba-95d76e351914",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Nhẫn đôi bằng thép không gỉ mạ bạc 925 thời trang",
      "image": "https://cf.shopee.vn/file/98af282de3d925c239df51bb310740d8_tn",
      "price": 52279,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec74",
      "id": "4ccd575d-1243-4f9b-a4bb-f5f4392b1907",
      "title": "Vớ Tất Nam Nữ cổ ngắn Nhật SX theo công nghệ NANO CAO CẤP XIMO TCN03",
      "image": "https://cf.shopee.vn/file/305cc9df713328049ca71a6702af3f08_tn",
      "price": 6400,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec75",
      "id": "e43a4dbb-f972-4b1b-b7b8-74cc060ea620",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] [loại 1] tất nam cổ ngắn hàng dày đẹp",
      "image": "https://cf.shopee.vn/file/af0497f1d1cb18818d46317f0154302d_tn",
      "price": 8000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec76",
      "id": "3c9bd351-6318-46a3-9a8c-632f572d6aa5",
      "title": "Thảm lau chân hình bầu dục thời trang [DÀY ĐẸP]",
      "image": "https://cf.shopee.vn/file/a82ee7438a6bc4080a0bb41ac9238450_tn",
      "price": 20000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec77",
      "id": "fe3270ea-b9a4-4c6b-84d9-5994c5e8474d",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất Nam Nữ Cổ Ngắn ❤️HÀNG ĐẸP❤️ Co Giãn Tốt ,Thấm Hút Mồ Hôi.",
      "image": "https://cf.shopee.vn/file/ff047e1ea7d9358925910af24e6c0acc_tn",
      "price": 2900,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec78",
      "id": "cd84b23b-2921-44b1-9cab-92f54f251b1c",
      "title": "Áo gia đình khủng long dễ thương thun cotton dày dặn co giãn 4 chiều đủ màu size 5-110kg",
      "image": "https://cf.shopee.vn/file/e6ee0c0d3fbcf246423a0a5e6dca68ff_tn",
      "price": 35000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec79",
      "id": "9be34d2f-f84f-4146-80aa-ccbcd12443c7",
      "title": "MẮT KÍNH MÁT NAM ITALY CHÍNH HÃNG CAO CẤP 737 FULLBOX",
      "image": "https://cf.shopee.vn/file/00abddcb858204dba8d7843333f3fe74_tn",
      "price": 149000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7a",
      "id": "318224a8-7c68-4267-b187-d6f8dd33c47d",
      "title": "Áo sơ mi Đen Cổ Vest ngắn tay form rộng unisex nam nữ vải lụa",
      "image": "https://cf.shopee.vn/file/a16bce6a715e2fdae9cfd97a8f4769d4_tn",
      "price": 210000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7b",
      "id": "101f268b-341a-486a-a6b7-00acd2e147a4",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] (TRỢ GIÁ) Sơ Mi Nam Cao Cấp Chất Vải Lụa Mềm Mại Thoáng Mát - Hàng Xuất Khẩu SM00009",
      "image": "https://cf.shopee.vn/file/7e6caf6d532217ec4e84ae6173822610_tn",
      "price": 99000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7c",
      "id": "c5ead47d-3f3d-42cc-a4b3-a09a7cc55968",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo sơ mi nam trơn không nhăn LADOS-523",
      "image": "https://cf.shopee.vn/file/b903fa2d85911d10d53469cfb5b2f6a8_tn",
      "price": 179000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7d",
      "id": "d25a68df-ff77-4ac8-8b49-1c35d5b5393e",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun trơn Unisex N7 Basic Tee 12 màu nam nữ phom rộng",
      "image": "https://cf.shopee.vn/file/e10c9a39830f2908c8dd72599432f7fe_tn",
      "price": 145000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7e",
      "id": "35fc9533-4f13-409a-b963-e700b5e0195e",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Combo 3 Đôi Vớ Nam - Tất Nam Nữ hàng Nhật Cotton - TN03 ( Giao Ngẫu Nhiên )",
      "image": "https://cf.shopee.vn/file/3b5d0727e39591eb84060c5ad1b9ded1_tn",
      "price": 50000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec7f",
      "id": "9747dfef-fb92-4ffa-8c50-da59b7915023",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo Khoác Bóng Chày Dày Dặn Thêu Chữ Phong Cách Retro",
      "image": "https://cf.shopee.vn/file/c8f12326522a898946e5b3f7d6eaa1dd_tn",
      "price": 265000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec80",
      "id": "8551a0ae-354f-4dd8-909d-5e9d01da1e5a",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Cà vạt nam bản nhỏ 5cm - cavat hàn quốc - cavat học sinh sinh viên ( sỉ và lẻ)",
      "image": "https://cf.shopee.vn/file/1a7f2ef1a9575f30aac26424b4302770_tn",
      "price": 8250,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec81",
      "id": "183d7aec-33ed-405e-be44-85ff09b74451",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Miếng Dán Hình Xăm Emoji Phong Cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/cc942aec2b13d2939af78e61aafedd15_tn",
      "price": 7000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec82",
      "id": "802ad638-f658-4eab-8e96-7ae25ec516e6",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Dây chuyền mặt robot mini phong cách hip hop thời trang",
      "image": "https://cf.shopee.vn/file/04894bfbb84c11a77aec4b9b0bd30c7c_tn",
      "price": 9054,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec83",
      "id": "de05677c-e720-4e2a-85a8-47ebf5506bb2",
      "title": "[Mã FASHIONG10 giảm 10k đơn từ 50k] Túi Đeo Hông Đeo Bụng Chạy Bộ 55k",
      "image": "https://cf.shopee.vn/file/8076dc0c80b97a310659f97d6680fd92_tn",
      "price": 25000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec84",
      "id": "16ddff94-aa0e-48ac-8c52-2383684583c2",
      "title": "[Giá sỉ] Áo blouse, áo choàng bác sĩ, dược sĩ, phòng thí nghiệm nam nữ cộc tay",
      "image": "https://cf.shopee.vn/file/887e3294d16b2975368afc3b7df9eb16_tn",
      "price": 216000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec85",
      "id": "e8399d02-ef52-46d1-ad85-4e810d2571de",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo chống nắng nam,áo khoác đi nắng chất vải kim cương có big size xxl -namdaishop",
      "image": "https://cf.shopee.vn/file/a407684990eb278439a176013ecdfd3c_tn",
      "price": 89000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec86",
      "id": "b5e4f529-9ac3-4d47-bdd6-05982c5983e9",
      "title": "MẮT KÍNH NAM CHÍNH HÃNG CAO CẤP M3 737 FULLBOX TẶNG KÍNH ĐI ĐÊM HOT TREND",
      "image": "https://cf.shopee.vn/file/9b3cb2ebb0a8ae79be42f7baf3a4d744_tn",
      "price": 149000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec87",
      "id": "f22de17a-958d-4673-897c-fa306de1f107",
      "title": "Quần Short Kaki Nam Nữ Basic Unisex co dãn màu đen và be trơn - Leevin Store",
      "image": "https://cf.shopee.vn/file/8365c901d73d8e221c5cad04fcb5388d_tn",
      "price": 178000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec88",
      "id": "be9392ed-fee2-4ab9-b6f8-a8f355235ce0",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] BỘ THỂ THAO NAM, Bộ Quần Áo Thể Thao Nam Mẫu Mới Nhất 2021",
      "image": "https://cf.shopee.vn/file/1731b3ec72ebdb9586090af7c90390c3_tn",
      "price": 172000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec89",
      "id": "b4653e99-c561-45f4-9d7c-ea3838e46424",
      "title": "[CLIP THẬT] Sơmi Vân Mây Cloud Fulltag MENDE | Chuẩn Cao Cấp 1:1 | TẶNG GIẤY THƠM - Sơ mi Lụa 100%",
      "image": "https://cf.shopee.vn/file/ff390ea33800cea313550f1727c8cc03_tn",
      "price": 199000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8a",
      "id": "cc9cb8e8-bc21-41de-ba78-a8b32b7d3ea0",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Kính mát thời trang 💗Kính râm nam nữ Unisex V tây đen giúp bảo vệ mắt đi đường",
      "image": "https://cf.shopee.vn/file/3ea717ec9249716a36370a704ab7dfb1_tn",
      "price": 20000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8b",
      "id": "b7aa91e5-246a-4f8c-8539-eea65fb2efa2",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất Nam, Vớ Nam Cổ Cao Hàn Quốc Thoáng Khí, Chống Hôi Chân (3 Màu)",
      "image": "https://cf.shopee.vn/file/ced62760a38c7816258a8eb387dbf98d_tn",
      "price": 10000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8c",
      "id": "19bb1b07-f827-4193-932b-0e522c6f99f7",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Combo 3 quần boxer vải sợi Modal (Gỗ sồi) kháng khuẩn Coolmate",
      "image": "https://cf.shopee.vn/file/f70c4ad82f684e29e9fb192d1e5ba6aa_tn",
      "price": 349000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8d",
      "id": "8b53e0e4-1586-4fb2-a5c6-8d8acd4bb6bf",
      "title": "áo đôi nam nữ cá tính trái tim",
      "image": "https://cf.shopee.vn/file/154a7a50dba7ef38d8a92373647a1c45_tn",
      "price": 200000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8e",
      "id": "7c1d66c0-7de7-44e7-b77d-006d37c78256",
      "title": "Áo Thun Nam Nữ Bad Rabbit SOFT TOY Unisex - Kiểu áo phông form rộng tay lỡ Ulzzang hình thỏ Nelly Leevin Store",
      "image": "https://cf.shopee.vn/file/c8172201d23036c7123fcd4be4092713_tn",
      "price": 170000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec8f",
      "id": "4d6e0a31-e0b7-4ba7-8010-cccbfb980ac4",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Áo thun polo nam phối màu xanh trắng, thiết kế đơn giản Basis APL59",
      "image": "https://cf.shopee.vn/file/377d986bf6afc3090ddca8b8ee27b867_tn",
      "price": 419000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec90",
      "id": "203c006e-0caa-4ee1-a00e-dd496303397b",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] Siêu phẩm áo Phông 1997",
      "image": "https://cf.shopee.vn/file/58d68583841f52b3c5fcb5587c67ac10_tn",
      "price": 85000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec91",
      "id": "e297ea72-662e-4f3c-b1b9-e6bb2f8eb6af",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo chống nắng _ Aó khoác nam 2020 , Chất umi dày dặn",
      "image": "https://cf.shopee.vn/file/5765f79958a5d7d2d7bae6403d979c1a_tn",
      "price": 99000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec92",
      "id": "75123b04-ca4b-4b23-8c8d-6f58cf871807",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] HỘP 5 quần lót tam giác xuất nhật - có size lớn cho người 90kg",
      "image": "https://cf.shopee.vn/file/ac6ea6da127a750801685a51e411af4f_tn",
      "price": 84000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec93",
      "id": "aabb1b55-deed-4865-b662-7478b67d2df3",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo thun nam thể thao ba lỗ, sát nách",
      "image": "https://cf.shopee.vn/file/44ea783a6f9b1669f561168d1d91bc98_tn",
      "price": 50000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec94",
      "id": "a5852a73-185d-4d8b-9c18-4d43a5ca1b58",
      "title": "Combo 3 Quần sịp nam Boxer Cotton thiên nhiên Cao cấp Thông hơi thấm hút",
      "image": "https://cf.shopee.vn/file/cf410fe2d39328de09c3292b3de96dda_tn",
      "price": 139000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec95",
      "id": "34d18ccf-6b8d-4854-9b2e-a0a252f9d11b",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Kính V sơn tùng hàng mới có túi sll 9k",
      "image": "https://cf.shopee.vn/file/c9193e9159b4e910623b19b96f6d60f1_tn",
      "price": 13000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec96",
      "id": "5e700339-4edd-40c8-9c89-e41e5d1ebeaf",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Túi Đeo Chéo Nhiều Ngăn Đa Năng QUALITY",
      "image": "https://cf.shopee.vn/file/49b76eb76a978692bc22c48d02fae67c_tn",
      "price": 49000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec97",
      "id": "11239d4f-1a7c-4bde-8a4e-053f2b9afe3b",
      "title": "Quần kaki nam trung niên ống suông",
      "image": "https://cf.shopee.vn/file/89476776dfb3d330f2b421176bf17da2_tn",
      "price": 180000,
      "categoryIds": [
        "42bc9805-e90a-4bc2-914d-84c581e5683a"
      ],
      "quantity": 100,
      "category": "Đồ Trung Niên"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec98",
      "id": "7fbf3836-738d-45a3-828c-6200e0e02c03",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây Chuyền Thép Titan Mặt Tròn 2214 Cá Tính",
      "image": "https://cf.shopee.vn/file/96bc8b6160edfa286eaa2014523f9e8e_tn",
      "price": 87400,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec99",
      "id": "339e19c1-b340-47b3-a100-32d265d83102",
      "title": "( BÁN LẺ GIÁ SỈ)Quần Xịp Nam Cao Cấp❤️FREESHIP❤️ Chất Coton Thoáng Mát, Thoải Mái Vận Động, Màu Sắc Nam Tính",
      "image": "https://cf.shopee.vn/file/079cd11dd2bdfe80e7ebfd52cedb3021_tn",
      "price": 11000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9a",
      "id": "374ae908-0431-41f6-a732-5bf308d17c03",
      "title": "ÁO KHOÁC KAKI NAM FORM SIÊU RỘNG 80KG",
      "image": "https://cf.shopee.vn/file/1a0a84d905a75a28c894f781c9f348a0_tn",
      "price": 119000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9b",
      "id": "d4e174e4-cbcd-47a5-b328-8567337ff317",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Hộp Nhựa Trong Suốt Đựng Trang Sức",
      "image": "https://cf.shopee.vn/file/7ff1b78c11b4ff91c419639b03cd1e48_tn",
      "price": 5338,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9c",
      "id": "b7b22aac-e007-403d-85fb-b787172aced5",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần short,Quần ngố nam vải đũi mềm mịn thoáng mát",
      "image": "https://cf.shopee.vn/file/aaa18be5a9d6a0d5897efeb7848615ab_tn",
      "price": 130000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9d",
      "id": "24386725-be65-4e8d-9e88-b09ee11c246e",
      "title": "QUẦN LOT NAM BOXER - HỘP 4 CHIẾC - QUẦN SỊP ĐÙI THÔNG HƠI GIÃN 4 CHIỀU - HÀNG CAO CẤP - CÓ SIZE LỚN - MLQ02",
      "image": "https://cf.shopee.vn/file/d2855d988d297dea6a1151a0aae704b0_tn",
      "price": 115000,
      "categoryIds": [
        "2ef38370-4d9b-4d33-9b31-84e8bcec7640"
      ],
      "quantity": 100,
      "category": "Đồ lót"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9e",
      "id": "0d78656b-9a20-45bc-8c4d-85f7866af3fb",
      "title": "Áo sơ mi nam họa tiết FEAER vải Lụa thoáng mát, không nhăn form suông Cowboy |new arrival 2021|",
      "image": "https://cf.shopee.vn/file/721ccaa68aa79332078e7c18764da624_tn",
      "price": 300000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ec9f",
      "id": "70ff6f42-75eb-4e8c-8fb1-c15b177d1579",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] KÍNH LÃO DÀNH CHO NGƯỜI TRÊN 40 TUỔI GỌNG TITAN MẶT KÍNH CÓ HỘP ĐỰNG KHĂN LAU KÍNH",
      "image": "https://cf.shopee.vn/file/3d794c7f2cb11062013f50ce3e51d996_tn",
      "price": 65000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca0",
      "id": "3148caa7-cb31-4457-9622-20f511752bf2",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần Short Nam Thể Thao PPP QN199",
      "image": "https://cf.shopee.vn/file/90478ca0db3cf8fe0df5b451058a804c_tn",
      "price": 180000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca1",
      "id": "041e51ec-e9e9-44d3-93c3-8cb4c8ad872f",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần đùi, sooc nam_ short thể thao nam- khóa chống nước (46-90kg mặc vừa)",
      "image": "https://cf.shopee.vn/file/a091b3cbd9c0fc23283ffe6c030fcac6_tn",
      "price": 69000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca2",
      "id": "8500b511-dbf9-4f82-8c70-e8e7f34816f7",
      "title": "Mắt kính đổi màu ngày đêm A2001 👓 Kính mát thời trang",
      "image": "https://cf.shopee.vn/file/e368669342a6caa4e74d2d0f847eb54e_tn",
      "price": 189000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca3",
      "id": "7e1c5927-c7ab-444b-b663-3b23768f44e2",
      "title": "Quần Short Kaki Nam [𝐅𝐑𝐄𝐄 𝐒𝐇𝐈𝐏] Quần đùi nam trơn co giãn bigsize thoáng mát, hợp dáng dễ dàng phối đồ - Q01",
      "image": "https://cf.shopee.vn/file/d7c77033ed2de01a4d6753c13ca4bcaa_tn",
      "price": 195000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca4",
      "id": "461bfd18-14ed-401e-8962-7eb1bcc64f7c",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo Sơ Mi Nam Cổ Tàu Dáng Ôm Body Hàn Quốc Vải Mịn Mát, Áo Sơ Mi Cổ Trụ Không Nhăn",
      "image": "https://cf.shopee.vn/file/0523cd23ca899b401539aacc671bef7b_tn",
      "price": 150000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca5",
      "id": "6642ab26-e6fa-4ce0-aeb4-ae70c38c1b07",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo thun nam không tay in hình thời trang Hàn Quốc",
      "image": "https://cf.shopee.vn/file/fa9d888839b911eb1a455788f6ec4dce_tn",
      "price": 106000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca6",
      "id": "7130d135-ef41-4570-aa5a-f0f4ec54ff87",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần đùi ngủ đập tan cái nóng cho cả nam và nữ chất liệu cotton 100% cực mát cực mịn",
      "image": "https://cf.shopee.vn/file/043d0f5812ca6595c5ecf599db426b2a_tn",
      "price": 38000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca7",
      "id": "7e327ad0-eebf-46da-883a-a889811165b0",
      "title": "Áo Chống Nắng Nam Cao Cấp, Chống Tia UV - CN01 - Kèm Túi Pocket",
      "image": "https://cf.shopee.vn/file/c11c3add8ab96be9ff06470d237f448e_tn",
      "price": 130000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca8",
      "id": "ef43a930-bd18-4d44-8ee4-85fd0a1336f0",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Nhẫn thép titan cảm biến đo nhiệt độ kỹ thuật số",
      "image": "https://cf.shopee.vn/file/5b6a24581ebb5b84af30e91d0130a6fb_tn",
      "price": 13500,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04eca9",
      "id": "885d7a71-6864-4804-adce-d6930941dad2",
      "title": "Quần kaki nam màu mới nam tính, chất liệu kaki nhung cao cấp Basis QK01",
      "image": "https://cf.shopee.vn/file/475e39e4c4e87e58e067531f18006642_tn",
      "price": 299000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecaa",
      "id": "137ea117-8fc8-42ce-9a23-7866e28d8972",
      "title": "Kính mát Uniex thời trang cao cấp giá tốt D2004 👓 Freeship Xtra 👓 chống tia UV400",
      "image": "https://cf.shopee.vn/file/206bf4daa0436374ad3414de4274f414_tn",
      "price": 149000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecab",
      "id": "e4ec50af-2667-464f-80af-ae4a8c422606",
      "title": "[Mã FASHIONHOT27 giảm 10K]Bộ Đũi Nam Vải Đũi Cao Cấp Bền Đẹp Thời Trang WhiteColour",
      "image": "https://cf.shopee.vn/file/acf3051df70625ec078916d7ce66704b_tn",
      "price": 160000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecac",
      "id": "4f6b7b8e-fd59-4a3f-bd05-356a782c5e6e",
      "title": "Ví Đựng Thẻ Nhiều Màu, Bảo Hành 1 đổi 1 Ví Mini Hàng Cao Cấp - VMN02 - 𝑫𝒊𝒈𝒂𝑺𝒕𝒐𝒓𝒆",
      "image": "https://cf.shopee.vn/file/0e26c616061b4de719ea0144265dc995_tn",
      "price": 15000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecad",
      "id": "651d4199-6dc3-4467-8a9f-d224a408030d",
      "title": "ÁO THUN TRƠN ĐEN TRẮNG NAM NỮ CỔ TRÒN TAY NGẮN",
      "image": "https://cf.shopee.vn/file/4cf9146cac87b787d7ff4ef8bf20341d_tn",
      "price": 70000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecae",
      "id": "c6c1af95-42bd-4214-b259-36d7c024424d",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] 1 chiếc bông tai tròn cá tính thời trang phong cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/cbac97c523956183c0a3d6abdccd838c_tn",
      "price": 12156,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecaf",
      "id": "fca3c92f-778e-4496-9eae-3957dc2462d9",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] ĐỒ BỘ NAM 🚚 FREESHIP 🚚 ĐỒ BỘ THỂ THAO IN HÌNH CON MÈO ĐEO MẮT KÍNH SIÊU NGẦU",
      "image": "https://cf.shopee.vn/file/6c573bcfe2e17b6912cdb5e25b1576a6_tn",
      "price": 100000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb0",
      "id": "883ef519-691b-426c-b807-673b3910364d",
      "title": "[Mã FASHIONHOT27 giảm 10K][GIÁ TẠI XƯỞNG] Ví da thời trang PU kiểu ngang – CM002 - BH 12 tháng - Nobox",
      "image": "https://cf.shopee.vn/file/39154cf25bcf13379471cc80b15bbf88_tn",
      "price": 7000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb1",
      "id": "6e14a5de-f504-4e2a-ac62-fc6aa6b59753",
      "title": "Quần đùi nam - Quần ngủ nam kẻ sọc mặc nhà dạo phố đủ size đủ màu đủ size từ 40kg đến 100kg",
      "image": "https://cf.shopee.vn/file/4ec813103ca0613f2a73fbcc62cc0217_tn",
      "price": 2850,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb2",
      "id": "0d13601e-e6ad-4727-9a55-a51f0654c37f",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khuyên Tai Nam Châm Dấu Chấm Tròn (1 Chiếc- Không cần xỏ lỗ) - Bim's House",
      "image": "https://cf.shopee.vn/file/93cecf507831fed0c879c87793df8f6e_tn",
      "price": 25000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb3",
      "id": "b05a6338-c2ef-4845-8e7c-c3b0e59ae176",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khuyên Môi hoặc tai các cỡ ngắn dài",
      "image": "https://cf.shopee.vn/file/8f4c5e9edc44ffde0253c37180dd39e2_tn",
      "price": 10000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb4",
      "id": "06090dde-402b-49b8-9055-a500744d8f2f",
      "title": "[Mã FASHIONHOT27 giảm 10K]40-100kg áo nam nữ unisex bigsize co giãn thời trang",
      "image": "https://cf.shopee.vn/file/51f05b77fc8b3b6361505d6d734e4881_tn",
      "price": 110000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb5",
      "id": "4e7d614e-d583-4862-93cd-9fa6ad7ec2eb",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng chuỗi 108 hạt kiểu dáng Phật giáo xinh xắn",
      "image": "https://cf.shopee.vn/file/fdea0217d04566085d9aeccf85ae9066_tn",
      "price": 16257,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb6",
      "id": "68c5fc8c-67b6-4a0a-81f6-64215ec2685e",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tờ Hình Xăm Dán Tattoo Xăm Nước Tha Thu-Giao mẫu ngẫu nhiên",
      "image": "https://cf.shopee.vn/file/e3c6d595b280f79905b948e335057712_tn",
      "price": 1200,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb7",
      "id": "0d234954-238a-4280-aa01-1ce7135def54",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Tất nam 10 đôi cổ ngắn T&T hàng Việt Nam xuất khẩu ngăn ngừa hôi chân",
      "image": "https://cf.shopee.vn/file/73575a84be9bda1bc259c2c3de7f63be_tn",
      "price": 79000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb8",
      "id": "2883c4ec-8631-48f9-8782-bb49d726326b",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Lót Giày Hương Quế Khử Mùi Hôi Hiệu Quả",
      "image": "https://cf.shopee.vn/file/79d56c2275963586e47c596532216406_tn",
      "price": 4600,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecb9",
      "id": "03a5f437-839d-4b11-b9a9-34ede15e4990",
      "title": "bộ quần áo sơ mi đũi nam",
      "image": "https://cf.shopee.vn/file/45bf85bb30451acf5f079089ae268fa4_tn",
      "price": 270000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecba",
      "id": "c5e829d3-74d2-49cf-9e26-a5608738f48b",
      "title": "Dây chuyền thép titan phong cách hip hop DC02",
      "image": "https://cf.shopee.vn/file/deeb49b3baf9863de75c16ef956f9593_tn",
      "price": 52000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecbb",
      "id": "69a6dbb6-e073-418d-a082-b00b6d4c6565",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun nam nữ tay lỡ YINXX, áo phông form rộng ATL193",
      "image": "https://cf.shopee.vn/file/58db87a4e154a7ab18948b937083f374_tn",
      "price": 80000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecbc",
      "id": "c08f394d-bd57-42e0-bd9d-b3f64ed59d3d",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo giữ nhiệt nam thể thao dài tay nhiều màu size từ 45 đến 90kg AT28",
      "image": "https://cf.shopee.vn/file/1b6e80debdd283a9c63f0cc664ec2ea7_tn",
      "price": 80000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecbd",
      "id": "96e15de6-e68f-4983-8e36-66013071b65b",
      "title": "[Mã FASHIONHOT27 giảm 10K]Cà vạt nam nữ sinh viên học sinh - cà vạt 5cm kỷ yếu phi bóng tp hcm",
      "image": "https://cf.shopee.vn/file/24f4f33fef6124b945cebcdb58e128c7_tn",
      "price": 13500,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecbe",
      "id": "f7eda848-7ffd-4342-ab4b-fdfd40b01b6b",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] Áo gile unisex form rộng Basic nam nữ phong cách ulzzang Wind",
      "image": "https://cf.shopee.vn/file/97e8d8927c30a045c10485548d1a1b1c_tn",
      "price": 139000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecbf",
      "id": "9b400faa-8716-4e91-af07-9cad52ab8713",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Tất vớ trơn nam nữ cổ ngắn len tăm GENZ phong cách vintage Hàn Quốc nhiều màu",
      "image": "https://cf.shopee.vn/file/fe998530284580f346d2b483f988cb66_tn",
      "price": 10000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc0",
      "id": "1e969990-62f1-4d05-9631-4e84eb5a6f02",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Ví Da Nam Mini Chất Da Lộn Sang Nhỏ Gọn Bỏ Túi Nhiều Ngăn Dáng Đẹp",
      "image": "https://cf.shopee.vn/file/9a302c5d4da6bf29f0a26e865c781e86_tn",
      "price": 18000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc1",
      "id": "b7d97204-0525-4091-9429-07204ce33dff",
      "title": "[Freeship] Quần Jogger 3 Line Phối Chữ NUTRENT Nam Nữ Đều Mang Được Phong Cách Thể Thao[ HOT TREND ]",
      "image": "https://cf.shopee.vn/file/b369825251c8e17bb30854520624b5e8_tn",
      "price": 105000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc2",
      "id": "d8ba0eaf-472e-48c4-b737-2314e11f7d7e",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Túi Colkids Club Phản Quang Mini Bag [ Ảnh Thật Tặng Tag + Giấy Thơm ]",
      "image": "https://cf.shopee.vn/file/b0c2d6b0181bc3413e4d2de368608bf2_tn",
      "price": 169000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc3",
      "id": "5900d022-180f-4431-b7f5-a3c95d4f2e7a",
      "title": "[Mã FASHIONG10 giảm 10K đơn 50K] ( Ảnh Thật - Video Thật ) BỘ ĐŨI NAM Quần Dài Áo Cộc ( Mát - Nhẹ Như Không)",
      "image": "https://cf.shopee.vn/file/3e0318ba51a019d8c3f1e365c2b29e9e_tn",
      "price": 179000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc4",
      "id": "de23b529-afbf-45e1-81d4-235e69ff0cce",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Ví nam chất đẹp dùng ok (ảnh thật 100% ko kèm hộp )",
      "image": "https://cf.shopee.vn/file/e238d350b0a09b5b0b42320b92981c85_tn",
      "price": 8000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc5",
      "id": "d2d8ef96-471a-46ef-bc84-519486384428",
      "title": "Kính mát nam A2034 🕶 Kính mát thời trang chống chói bảo vệ mắt",
      "image": "https://cf.shopee.vn/file/d40d45bc607911d14eb8ecb9892ef419_tn",
      "price": 159000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc6",
      "id": "3ba42a9e-0fc7-4eb9-b806-181877406bbe",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần Lót Nam - cao cấp Nhật Bản MILMUMU - Kháng khuẩn cực tốt",
      "image": "https://cf.shopee.vn/file/e8a33ef48e7ed5e0fcf4ccdf6fb9f35a_tn",
      "price": 100000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc7",
      "id": "068a7db5-2f01-4614-8e08-b842418f1bbe",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần âu nam Hàn Quốc dáng ôm công sở quần tây nam vải co giãn nhẹ chống nhăn chống xù",
      "image": "https://cf.shopee.vn/file/04fb275b22d0abb24895021ab8afe189_tn",
      "price": 130000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc8",
      "id": "198d8f6a-6815-41c7-8528-281052de9ee2",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] 30 Tờ Hình Xăm Dán Tattoo Xăm Nước Tha Thu",
      "image": "https://cf.shopee.vn/file/791388c5f6a166711eb3e7472d0dec07_tn",
      "price": 15000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecc9",
      "id": "3f76d8df-18a8-4df2-8877-f550884b450e",
      "title": "Áo Ba Lỗ Nam, Áo tank top tập gym nam chất liệu thun co giãn 4 chiều thấm hút mồ hôi ABL01",
      "image": "https://cf.shopee.vn/file/8dec3c83f31baee2980cfcccb22af397_tn",
      "price": 39000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecca",
      "id": "1c3aefd9-bbc4-4d43-b74e-8aa9dd341bc6",
      "title": "[Mã FASHIONHOT27 giảm 10K]Cà vạt nam bản nhỏ - cavat 5cm hàng tp hcm sản xuất",
      "image": "https://cf.shopee.vn/file/d4f0ad830c255f60a3880c75bd0d33f3_tn",
      "price": 17000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04eccb",
      "id": "dc5e6a9d-d074-4e8b-9990-657e310e451b",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] MŨ LƯỠI TRAI CÁ TÍNH NỈ GÂN [ VẢI NHẬP]",
      "image": "https://cf.shopee.vn/file/9aba76874309658bc570a7bf7e2ccb4c_tn",
      "price": 39000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04eccc",
      "id": "bcff4c98-5417-424e-80a4-548fd626a4b3",
      "title": "[HÀNG HIỆU] Thắt Lưng Da Nam Khóa Tự Động Cao Cấp Dây Nịt Nam Da Bò 100% Chính Hãng Baellerry Mạ Vàng Bạc Nam Tính GG-9K",
      "image": "https://cf.shopee.vn/file/8421b60570b2e3ded25af3c7c40f8ed4_tn",
      "price": 53000,
      "categoryIds": [
        "846008d4-784a-41a5-8182-f9f515bb588e"
      ],
      "quantity": 100,
      "category": "Thắt Lưng"
    },
    {
      "_id": "606f3d359aff6f3d4f04eccd",
      "id": "ffa838ff-5e24-4ce7-9b21-ec735827c0af",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng Đeo Tay Tự Cột Phong Cách Jungkook V Kim Tae Hyung Của Nhóm Nhạc KPOP BTS",
      "image": "https://cf.shopee.vn/file/ed462e1fda24439e6195e62ff3bb8d82_tn",
      "price": 33000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecce",
      "id": "e1d478e9-b856-4e06-b7b5-643ffb262e91",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Roselife S925 Silver Bike Crown Umbrella Fish Bone Stud Earrings Korean Jewelry",
      "image": "https://cf.shopee.vn/file/2d463914e120b5ed2c752ee98f3b06a2_tn",
      "price": 9000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04eccf",
      "id": "53a27892-34a9-4a0d-a915-a4da3eff5c99",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Combo 2 Đôi Tất Viền Chống Thối Kháng Khuẩn VICERO",
      "image": "https://cf.shopee.vn/file/af8c812e7a4ee3d238531cd71d4bcb00_tn",
      "price": 38000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd0",
      "id": "3a1b347a-8ff7-45dc-b26c-2ce70c25e4a3",
      "title": "Áo Khoác Nam Vải Dù Nón Rộng Thời Trang KATUSCO - A2015 (Size 48-75kg)",
      "image": "https://cf.shopee.vn/file/6cf6a7e11260213a2bac255eb29b7f36_tn",
      "price": 280000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd1",
      "id": "31b6b18a-92ae-4e23-8e52-711837caeeee",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Quần jogger nam kaki VICERO phong cách năng động trẻ trung",
      "image": "https://cf.shopee.vn/file/b896efd55c1942aac91b5393b092e621_tn",
      "price": 178000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd2",
      "id": "b5d6b78c-d037-4716-b572-cb8e96b01ae2",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Nhẫn thiết kế hình thánh giá phong cách harajuku hip hop cá tính cho cả nam và nữ",
      "image": "https://cf.shopee.vn/file/73969d003245d9d9b9f5c189e8e26c2a_tn",
      "price": 43400,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd3",
      "id": "80ebd408-7e3d-4f90-ba07-eb80c4547d8e",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Khuyên tai hình hoa phong cách Hàn Quốc dành cho nữ",
      "image": "https://cf.shopee.vn/file/2c1cc29d1a785739ea15baf64ce91dc7_tn",
      "price": 11000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd4",
      "id": "80b746cf-7b09-40cf-8cec-2c48fbcf3fc6",
      "title": "Áo Haori Hoàng Thượng ôm Cá Siêu Độc, hàng cao cấp, mã SK09 ( có ảnh thật )",
      "image": "https://cf.shopee.vn/file/a0fa135cfbbd4429209b1f7e34edb050_tn",
      "price": 175000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd5",
      "id": "ed125acc-de23-49a1-8b16-5be35abd485f",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Ví nam da bò 4U sang trọng F108 (đen - nâu)",
      "image": "https://cf.shopee.vn/file/509ba7918428bf7b87bf409cd1385252_tn",
      "price": 225000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd6",
      "id": "c606f574-c0c5-43d4-8ec7-8ae862036ccb",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Bộ Thể Thao Nam ROUGH CoolFit Chất Thun Tencel",
      "image": "https://cf.shopee.vn/file/f286cda90590e1c7315fb6ad0c66010c_tn",
      "price": 258000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd7",
      "id": "4b34548f-12d0-4b68-827d-9f254694424b",
      "title": "(nhập fashionfree10 giảm 10k đơn 20k) Nơ chú rể, đeo cổ bồi bàn, bưng quả, bê lễ, bưng tráp nhà hàng phục vụ",
      "image": "https://cf.shopee.vn/file/023009602614abc6d9fc9f2b1579c76e_tn",
      "price": 4600,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd8",
      "id": "9ef17e8c-84cb-4135-9c32-a337c9b1b637",
      "title": "Áo đôi nam nữ tình yêu bạn thân đẹp giá rẻ ❤️KINGSPORT❤️ Đồ đôi nam nữ gia đình đáng yêu vải thun mềm mịn thoáng mát",
      "image": "https://cf.shopee.vn/file/e4aa67fedff2ebde66fc4e33ad9222ec_tn",
      "price": 33000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecd9",
      "id": "d0916ba7-d337-4c12-86bc-c80fc190144a",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] ÁO BOMBER NỈ PHỐI TAY DA",
      "image": "https://cf.shopee.vn/file/0bafe1d5e89423a6de197d3b96919795_tn",
      "price": 35000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecda",
      "id": "d1a7749e-b3cb-4b05-988e-60d242826b0b",
      "title": "[Giảm giá 50%] - Áo thun nam POLO thiết kế sọc ngang vải cá sấu cotton cao cấp ngắn tay cực sang trọng",
      "image": "https://cf.shopee.vn/file/b748bff3373e02d67c069a2c0950a923_tn",
      "price": 198000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecdb",
      "id": "e2803373-f633-4f74-b9ab-eede56e0722d",
      "title": "[Mã FASHIONHOT27 giảm 10K][Có VIDEO + ẢNH THẬT] Áo sweater - Áo nỉ bông tay dài UNISEX NT134",
      "image": "https://cf.shopee.vn/file/b5ca3777f355d4519dd42f9ae58d2165_tn",
      "price": 120000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecdc",
      "id": "8e2e3981-7c02-465b-8f91-bb64d53645e5",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền phối mặt dây hình bươm bướm/ chúa Jesus",
      "image": "https://cf.shopee.vn/file/cc67708953341ae70ea0a1603c49d2af_tn",
      "price": 36300,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecdd",
      "id": "ab6be225-6f5b-44db-9688-4509d13c185f",
      "title": "Túi Xách Nam Đeo Chéo Năng Động Hàn Quốc 2020 Đeo Được Ngang Hông Chất Da Bò Hai Ngăn Riêng Biệt Size Mini Nhỏ Gọn PB031",
      "image": "https://cf.shopee.vn/file/dd31aef1e7a3ea7034491287d69032a4_tn",
      "price": 18000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecde",
      "id": "23dad436-87ae-48e1-830b-cbb2cdbf9ce9",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Áo Sweater Cổ Tròn Dáng Rộng Thời Trang Thu Đông Cho Nam",
      "image": "https://cf.shopee.vn/file/80bb0203ffe363336e9dbb570ce0e19e_tn",
      "price": 200000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecdf",
      "id": "d2a5704c-7ed7-412a-be60-73fac29a1658",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Mũ rộng vành màu trơn thời trang mũ lưỡi trai nữ 57cm",
      "image": "https://cf.shopee.vn/file/9d0cbdbe8b31e352ec7e37ae48114193_tn",
      "price": 100000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece0",
      "id": "72055cb1-bfcf-4386-9b67-27451d41ac9e",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Dây chuyền nhiều lớp kiểu dáng thời trang dành cho nam và nữ",
      "image": "https://cf.shopee.vn/file/cc0ad1ac663637f80a0d659af63594fe_tn",
      "price": 26400,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece1",
      "id": "ff265397-465e-4361-bb8f-e7c75e6ba46b",
      "title": "MAMK140 GIẢM NGAY 10K CHO ĐƠN 0Đ  Áo thun nam trơn tay ngắn,cổ tròn dáng unisex tay ngắn Basic Tee",
      "image": "https://cf.shopee.vn/file/0779f6f0b0dfddbf737874c08e342959_tn",
      "price": 180000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece2",
      "id": "21be2103-ec53-4d55-a7e9-d09519ecc13a",
      "title": "Áo Thun Phản Quang Gấu XX Cotton 75% Form Rộng Unisex Nam Nữ Đẹp",
      "image": "https://cf.shopee.vn/file/fb42a4c29a8eb190010e093344525cb7_tn",
      "price": 150000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece3",
      "id": "d080e4c0-24d2-4e65-970a-f99066de8284",
      "title": "Quần tây nam phong cách Hàn Quốc vải chống nhăn ,quần baggy nam co giãn nhẹ, phù hợp đi học, đi làm",
      "image": "https://cf.shopee.vn/file/3445eba03382743b50cf3757d50b6e0b_tn",
      "price": 150000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece4",
      "id": "c47fe906-a0f6-4629-a0c5-de1149a869c8",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] MẮT KÍNH V NHỎ NHIỀU MÀU THỜI TRANG NAM NỮ AH129",
      "image": "https://cf.shopee.vn/file/f53ab9c3dfcd83bbf8bea94f266447e7_tn",
      "price": 13000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece5",
      "id": "61c9cb5c-8bb2-4285-b4cf-2ab5cdc31fa2",
      "title": "Quần Kaki Nam Chất Cao Cấp Siêu nhẹ Dáng Âu Vicero Phong Cách Công Sở",
      "image": "https://cf.shopee.vn/file/082e7dd944f3d3185d40632f586f8c1c_tn",
      "price": 318000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece6",
      "id": "13833d2f-38bb-4e3d-b3af-bc9a90bf9ea5",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần Âu Nam Đẹp KOREA vải mịn co dãn màu ghi nhạt, ghi đậm, đen, xanh đen",
      "image": "https://cf.shopee.vn/file/d503d20c1b5f171626277dad4da71619_tn",
      "price": 130000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece7",
      "id": "29a949ed-7288-4abf-9a82-2132d34acfc5",
      "title": "Áo sơ mi ngắn tay Nam Nữ Cổ Vest TRƠN trắng và đen - Kiểu sơ mi tay ngắn form rộng Leevin Store",
      "image": "https://cf.shopee.vn/file/d8f46ff9918876a5dc1eab29051c7b1f_tn",
      "price": 210000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece8",
      "id": "0c14328f-d886-419b-b4f6-c86b43d88f99",
      "title": "Túi đeo chéo 🎁 FREESHIP 🎁 Unisex Shoulder Bag Degrey Freestyle Màu Đen Hồng Tím chất liệu da PU bóng sáng 120GR",
      "image": "https://cf.shopee.vn/file/2e3b1d12b06804b73a3f5528868efb38_tn",
      "price": 119000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ece9",
      "id": "2c7bcd0c-f16f-410f-99fc-201716320a68",
      "title": "Balo phản quang Colkids Club SS3 Trắng và Đen [ Full Tag + GIấy thơm ]",
      "image": "https://cf.shopee.vn/file/253b1fd41911aed0c8b88ed026440c68_tn",
      "price": 199000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecea",
      "id": "a0e7448f-ac57-43a1-a574-2c821dcefd3d",
      "title": "Áo khoác jean nam LECHAU AKJ01 trơn đơn giản,cá tính",
      "image": "https://cf.shopee.vn/file/115baa120f46f36765d2a971495b5661_tn",
      "price": 169000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04eceb",
      "id": "ed8ef520-559a-4a86-aeef-9d4d413d459d",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo len nam cổ lọ FAVITI mẫu mới nhất 2020 AL59",
      "image": "https://cf.shopee.vn/file/8eb06a09fff6af941b613e3ec8bf2a35_tn",
      "price": 200000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecec",
      "id": "0ad95b1d-4cd7-41d1-ade7-b58fd39a87a0",
      "title": "[Mã FASHIONHOT27 giảm 10K]FS50K - Quần jogger nam nữ thun da cá/nỉ bigsize thể thao/gym",
      "image": "https://cf.shopee.vn/file/5afb4bd8b23a68d1d067a68ea3938f92_tn",
      "price": 80000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04eced",
      "id": "4f234d24-f2e9-4642-ac87-499780cf22fa",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Kính GM south side cao cấp [ có khắc chữ ]",
      "image": "https://cf.shopee.vn/file/66618b9f91a10ecea56a1cf43935e063_tn",
      "price": 75000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecee",
      "id": "de98b514-5834-4d1e-bcc9-ade3b1aca0c2",
      "title": "< FREESHIP > ÁO KHOÁC KAKI HỘP NAM NỮ HÌNH THẬT CÓ TÚI TRONG HÀNG BAO ĐẸP, BAO CHẤT FORM 80KG",
      "image": "https://cf.shopee.vn/file/cbba95c1fff6bf3ad86f413ddd711e75_tn",
      "price": 150000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecef",
      "id": "2023f13b-a429-4a0d-b999-3f2802b7f355",
      "title": "Túi đeo chéo [ 1hitshop ] Túi đeo chéo nam /nữ RỘNG, CHẮC CHẮN, THỜI TRANG phù hợp nam lẫn nữ [ 1hitshop ]",
      "image": "https://cf.shopee.vn/file/ca7f107ad790ecdf030be7f11c932df5_tn",
      "price": 18000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf0",
      "id": "c3af59c2-4f74-49b4-8cad-5caa034d76c3",
      "title": "[CLIP THẬT] Sơmi Mèo Crayon Fulltag MENDE (tag cổ + 2 tag giấy + tag tay) | Chuẩn Cao Cấp 1:1 | Sơ mi Lụa CNK 100%",
      "image": "https://cf.shopee.vn/file/8c61046eb02bad47e63a692bcc77a5f2_tn",
      "price": 229000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf1",
      "id": "aeb017b1-9dd3-4cd6-9a71-f975b4e08ef3",
      "title": "Khuyên tai tròn K-Pop [3 MÀU]",
      "image": "https://cf.shopee.vn/file/3f69573bb5d26085754aee12aecae2ba_tn",
      "price": 3800,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf2",
      "id": "6d5a084f-cb90-41c2-a16a-c819a09daec0",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo đông xuân cộc tay Hanosimex",
      "image": "https://cf.shopee.vn/file/a2aebee4dc544308a420162d94d32aad_tn",
      "price": 70000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf3",
      "id": "79154209-2fff-4944-a962-796af4d1cec6",
      "title": "Ví nam chất đẹp thời trang cao cấp Bóp da PU nhiều ngăn phong cách trẻ sành điệu gu nam tính nhập khẩu chính hãng",
      "image": "https://cf.shopee.vn/file/310bdc4af5b365a61562120e90a54182_tn",
      "price": 29000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf4",
      "id": "fa95b6d6-8071-45b9-aa8d-25a4d319fefe",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo thun tay dài THE 1992 Giữ nhiệt thể thao nam 2C",
      "image": "https://cf.shopee.vn/file/0d19a5f5a1755f541b1e46faca9dd8f0_tn",
      "price": 58000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf5",
      "id": "a25cbdcb-1acf-42e4-9b6b-280302d9f47a",
      "title": "Áo khoác sơ mi uniex dù form rộng, cardigan nam nữ ulzzang Wind",
      "image": "https://cf.shopee.vn/file/c6f9aa933306619a327a2f3112fb9540_tn",
      "price": 120000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf6",
      "id": "89d92c8d-aaaf-4975-b0b2-cf8449764355",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Vòng Cổ Mặt Trái Tim Phong Cách Cổ Điển Cá Tính",
      "image": "https://cf.shopee.vn/file/9c6b36b5a58766b05294ddb55d5e0d17_tn",
      "price": 15714,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf7",
      "id": "545757c9-0b18-4c3b-9e6d-e86ca49d3641",
      "title": "Kính mát thời trang nữ E023 🎇 Kính chống tia UV bảo vệ mắt",
      "image": "https://cf.shopee.vn/file/2641873e79d28c7493e8e814c487ad42_tn",
      "price": 139000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf8",
      "id": "594a2bcf-4428-4fbd-9be6-4cd27825050a",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Khăn trùm - Khăn khẩu trang Nija",
      "image": "https://cf.shopee.vn/file/22a2aa56f20d92863754129a29c792a0_tn",
      "price": 25000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecf9",
      "id": "8e31e968-7949-4139-82a8-5ce325010638",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Túi Đeo Chéo Nam Nữ Phong Cách Hàn Quốc HARAS HR147",
      "image": "https://cf.shopee.vn/file/8448718cdf8d17a1364dffa7cdbf0e61_tn",
      "price": 69000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecfa",
      "id": "8aa66be2-6a9f-432d-b828-e3736d9620cd",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Ví nam đẹp kiểu ví ngang Hàn Quốc nhiều ngăn có ngăn kéo MSP 3088-1",
      "image": "https://cf.shopee.vn/file/46c32ba68386e4b63d15c48abaab7eb6_tn",
      "price": 115000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecfb",
      "id": "09ad0929-ff6a-4c94-b992-5a79962c1e82",
      "title": "[Mã FASHIONHOT27 giảm 10K]Dây đai chữ y - đai quần chữ y",
      "image": "https://cf.shopee.vn/file/92774df65969b7f15dddec632b9e19b3_tn",
      "price": 25000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecfc",
      "id": "2ae8a539-1aa9-4ea4-bdec-d9f4f1d8bddd",
      "title": "Áo khoác Hoodie Basic cao cấp nam nữ ( 4 size M, L, XL,XXL)",
      "image": "https://cf.shopee.vn/file/5cc9b6820d6ad659940ffc618ce57347_tn",
      "price": 150000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecfd",
      "id": "2c4c291b-936f-4668-a87e-6354553fb78f",
      "title": "BALO NAM VẢI CHỐNG NƯỚC CAO CẤP 💎 BALO/CẶP ĐI HỌC CỰC CHẤT 💎FREESHIP",
      "image": "https://cf.shopee.vn/file/ab66ec213f71dd8a6b9adb6b220a2a78_tn",
      "price": 243000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecfe",
      "id": "c9320c23-a239-492d-8e4b-a7ab389bd1b0",
      "title": "Áo thun nam tay ngắn đẹp có cổ polo cao cấp mới logo nổi Riooshop RSP039",
      "image": "https://cf.shopee.vn/file/8f75713183a982f837b3f7bceaa1eef2_tn",
      "price": 210000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ecff",
      "id": "e3bfd4ba-740b-4bde-894f-c58d1d9c32ad",
      "title": "[ẢNH THẬT]Bộ Đồ Nam, Bộ Hè Nam Chất Đẹp ( Mẫu Mới ) BB36",
      "image": "https://cf.shopee.vn/file/2ad85ef1cb819f948758863e7aee9b93_tn",
      "price": 99000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed00",
      "id": "c40c4373-64a5-4189-8816-f7353959cb59",
      "title": "{giá sỉ} Áo nhóm đồng phục lớp team du lịch gia đình giá rẻ vô địch",
      "image": "https://cf.shopee.vn/file/0c3e140c793a67a2524ff2f81d205ef6_tn",
      "price": 19000,
      "categoryIds": [
        "b748c82d-a7ef-49d0-9bc6-2f98d78d61a9"
      ],
      "quantity": 100,
      "category": "Đồ đôi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed01",
      "id": "091262d1-9b59-4d5e-afe3-8d5739cafa36",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Vòng Tay Kim Loại Dạng Dây Chuỗi Thiết Kế Đơn Giản Cho Nam Và Nữ",
      "image": "https://cf.shopee.vn/file/f3fba79b7e24b6222ec50e889c2d0fab_tn",
      "price": 66600,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed02",
      "id": "45c56572-e252-4a5d-90af-6fd631507dec",
      "title": "Áo sơ mi trắng nam, sơ mi nam xanh và đen chất cotton dày mịn, mềm gấp hộp cực xịn của MMANS",
      "image": "https://cf.shopee.vn/file/279b9b555b0e8f676f2abc29fe2a16d6_tn",
      "price": 145000,
      "categoryIds": [
        "1e668c79-b669-480d-b52f-871bd03b8c3c"
      ],
      "quantity": 100,
      "category": "Áo sơ mi"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed03",
      "id": "3b8f0c79-8a51-4551-874b-84b314057a94",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Bông tai tròn bằng thép không gỉ thời trang",
      "image": "https://cf.shopee.vn/file/7965c047c87467b0edc1046eef1ff62d_tn",
      "price": 37500,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed04",
      "id": "aaa088b5-a4cb-4279-9f15-a0bfd06352fb",
      "title": "ÁO KHOÁC NAM ĐẸP LG3 -Áo Khoác Dù nam",
      "image": "https://cf.shopee.vn/file/63b7934fddfe7a1874be520059cb8aef_tn",
      "price": 180000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed05",
      "id": "200bedce-d015-4d64-a337-66fd21692168",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo Thun Trơn Thời Trang Cao Cấp - La mode",
      "image": "https://cf.shopee.vn/file/9a2d88f4688bb09b37175d6f35937ee5_tn",
      "price": 35000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed06",
      "id": "9b7669ed-dc12-44b9-a7a9-00e365437e9c",
      "title": "[Mã FASHIONHOT27 giảm 10K]HD022 - ÁO HOODIE BASIC",
      "image": "https://cf.shopee.vn/file/83fb5550fda72d103fda5ea03b523925_tn",
      "price": 80000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed07",
      "id": "7c74b06e-1ea5-4fcc-ba20-8930876b1f4f",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo Thun Nam Thể Thao SỌC NHUYỄN GUGOSTAR G370, Chất Thun Lạnh, Co Giãn 4 Chiều",
      "image": "https://cf.shopee.vn/file/dbb43807629cd93ee391b982521b18e2_tn",
      "price": 95000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed08",
      "id": "6e062071-9c03-4ceb-b4c2-415f48ba01db",
      "title": "[DA BÒ THẬT] Ví Nam Mini, Ví Nam Nhỏ Gọn",
      "image": "https://cf.shopee.vn/file/975de98edb3a5bde558e9be549b2010f_tn",
      "price": 295000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed09",
      "id": "fa7a2c9e-b31a-44ee-bb60-d5a29bb72e98",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo Thun Nam Thể Thao Dập Vân CT AN298",
      "image": "https://cf.shopee.vn/file/86900c5b8c6ef91ae268ca81b8dcb6a0_tn",
      "price": 59000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0a",
      "id": "a7e6ef5c-d1a2-489d-849f-fb2c11f5c923",
      "title": "[Mã FASHIONG10 giảm 10K đơn 50K] Quần âu nam Ikemen chất vải tuyết mưa ,co giãn 4 chiều dáng ôm body chống nhăn",
      "image": "https://cf.shopee.vn/file/85e453a562e2c5248393c623cd0386d1_tn",
      "price": 180000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0b",
      "id": "f1c17f2c-25b5-49e3-b04d-f0cd5d997d40",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Dây chuyền kim loại kiểu dáng cá tính",
      "image": "https://cf.shopee.vn/file/67d521a9d13a89e3a651b48d070839c5_tn",
      "price": 32000,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0c",
      "id": "5c37c549-bc15-4eea-a02c-722022269c42",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] MŨ BUCKET THÊU - IT SO NICE",
      "image": "https://cf.shopee.vn/file/d0598bd52a86f1fff8d1c98a7b61a261_tn",
      "price": 25000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0d",
      "id": "4fc2f68f-24cd-4be4-938a-12f52ed8736c",
      "title": "[Hàng Full Box] Bộ Đũi Cộc Nam chất liệu đũi cao cấp Ngon - Bổ - Rẻ nhất thị trường đũi atb.shop 2021",
      "image": "https://cf.shopee.vn/file/41c53cb36714f77231337875be4c2f4f_tn",
      "price": 129000,
      "categoryIds": [
        "708f404f-e628-4084-ae63-9d9616b0b7cb"
      ],
      "quantity": 100,
      "category": "Đồ bộ Đồ mặc nhà"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0e",
      "id": "5e78696a-da7a-449c-a413-a311d80be6b6",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Gọng Kính Kim Loại Shady G275 (Nhiều Màu)",
      "image": "https://cf.shopee.vn/file/308dcc97c5b384edbd53606f02a1cb0c_tn",
      "price": 160000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283"
      ],
      "quantity": 100,
      "category": "Mắt kính"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed0f",
      "id": "99118d85-d610-4e94-bab3-49856724ee0d",
      "title": "[Mã FASHIONHOT27 giảm 10K]Combo 3 đôi tất hoa cúc thời trang co giãn",
      "image": "https://cf.shopee.vn/file/debf00b1839e87277c8a9bd0662becee_tn",
      "price": 36000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed10",
      "id": "0dd20937-a04b-4c71-948e-6eceda369eae",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Mũ Len Hàn Quốc  Beanie Nhiều Màu ( Sỉ Tận Gốc )",
      "image": "https://cf.shopee.vn/file/265eead55e8a72f54df7ebb8cc843123_tn",
      "price": 8500,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed11",
      "id": "c008dc75-736a-4716-bc00-ef416318c7e9",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần tây nam đẹp (đen,xám) dáng ôm cao cấp phong cách thời trang nam Hàn Quốc",
      "image": "https://cf.shopee.vn/file/3783c16150ec039551a1216880482eda_tn",
      "price": 180000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed12",
      "id": "c81ca5e5-e977-4ecb-a528-02fd5bfa9e9d",
      "title": "Quần âu nam chất lượng cao cấp màu ghi, xanh than và đen dáng body Hàn Quốc",
      "image": "https://cf.shopee.vn/file/f04d731e06fe9bfb2e2caa75bf70f739_tn",
      "price": 139000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed13",
      "id": "34965291-c307-4c4f-9276-2fddf0307102",
      "title": "[Sản phẩm bán chạy] Quần Jean Nam FOXSEVENTY, Chất Jean Co Dãn, Màu Đen, Dáng Quần Ôm, Cam Kết Không Phai Màu (Đổi/Trả)",
      "image": "https://cf.shopee.vn/file/7cd396537283ef7b3c587c2e2cd12536_tn",
      "price": 319000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed14",
      "id": "a8834b8e-dc1f-4056-9912-4fd10ab29ae1",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] ✔️ Túi Đeo Hông Nhiều Ngăn Nhỏ Gọn Tiện Lợi",
      "image": "https://cf.shopee.vn/file/d58110841e6eebdbacc54ce016c79433_tn",
      "price": 45000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed15",
      "id": "6263b63c-a452-430e-a735-c63429642bf5",
      "title": "[FreeShip] Dây Nịt Nam - Thắt Lưng Nam Thời Trang Cao Cấp Phong Cách Sang Trọng (DN-006) 🔥MUA NHIỀU GIẢM GIÁ 🔥",
      "image": "https://cf.shopee.vn/file/5e3f32099fae48743749741372f00273_tn",
      "price": 69000,
      "categoryIds": [
        "846008d4-784a-41a5-8182-f9f515bb588e"
      ],
      "quantity": 100,
      "category": "Thắt Lưng"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed16",
      "id": "b9c67bae-bb48-4ab8-8cc2-b89a569a7ad0",
      "title": "Áo Phao Nam 5S (5 màu), Chần Bông Cao Cấp, Siêu Nhẹ, Siêu Ấm, Phom Ôm Trẻ Trung (A1)",
      "image": "https://cf.shopee.vn/file/7d59916842bd4a15049c05f064be3faa_tn",
      "price": 959000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed17",
      "id": "7fb3cdc6-9779-4549-b5c2-dd7598c104f4",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Balo Hàn Quốc cao cấp HARAS-HR008",
      "image": "https://cf.shopee.vn/file/b5be964686efc6aceba91d4569cf07ea_tn",
      "price": 199000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed18",
      "id": "73cfe758-8adf-42fe-a297-2fb912d9446b",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo khoác gió nam nữ super nam nữ Bảo Đăng",
      "image": "https://cf.shopee.vn/file/5126e8e8e4dca15e8f0b807f939cedc8_tn",
      "price": 150000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed19",
      "id": "1b8de03a-fd1f-4a1d-925c-42c4bd333e6e",
      "title": "Quần Âu Nam Dáng Côn Đẹp, Vải Tuyết Mưa Co giãn, Chống nhăn và không bai xù - REBEDE",
      "image": "https://cf.shopee.vn/file/40e130b9d6905face1e48feec36037d0_tn",
      "price": 180000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1a",
      "id": "4d5bfaf4-c1cf-4cb9-9a77-e4df8322fbaf",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần Sịp Nam Boxer LAC Dư Xịn LAC01A",
      "image": "https://cf.shopee.vn/file/accbe99e7db45b6f1b8e4a0bb88ec9cd_tn",
      "price": 110000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1b",
      "id": "044b0ffb-83e1-41bc-b3c4-7cb2c963ceeb",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] [ Ảnh Thật ] Ví nam da đẹp chất, kiểu dáng thời trang hàn quốc Mã SWM99K",
      "image": "https://cf.shopee.vn/file/23db0b00c1a5bcaecf22dbc7f394e63d_tn",
      "price": 190000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1c",
      "id": "ac285577-b4d0-41c3-875f-aedc2a65fefe",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần đùi nam chất  thun cotton mặc ngủ cực thoải mái",
      "image": "https://cf.shopee.vn/file/84df55fd273b2cfe89243a1a72ab849c_tn",
      "price": 40000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1d",
      "id": "8880759b-7293-4192-9376-a412d5e46b6d",
      "title": "[Mã FASHIONHOT27 giảm 10K đơn 0Đ] [TIỀN NÀO CỦA NẤY ] Áo khoác Nam, Áo Blazer Nam phong cách Hàn Quốc",
      "image": "https://cf.shopee.vn/file/dc97a763fdfc1db2bfbb90113f24f899_tn",
      "price": 320000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1e",
      "id": "2bba7c8a-ce68-483b-b6f1-3e080efa9281",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần âu nam Kojiba dáng ôm co giãn nhẹ",
      "image": "https://cf.shopee.vn/file/3ef958a8a6786248b917f07a87921d9c_tn",
      "price": 170000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed1f",
      "id": "8c7ed49a-0c5f-4fad-a655-34bbfd2a785e",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Quần short 40-100kg nam nữ thời trang ullzzang bigsize",
      "image": "https://cf.shopee.vn/file/e1e7f8bcf5639bee9a4efb6c2c14a7c4_tn",
      "price": 90000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed20",
      "id": "6aae736b-3388-4a3e-849a-922de543da02",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần Simple Pant 2 loại (rút và ko rút)",
      "image": "https://cf.shopee.vn/file/e481910f4ffc97f6abbc04b8a810387a_tn",
      "price": 149000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed21",
      "id": "993fe165-56b2-4985-93e7-095602ce50fa",
      "title": "( VIDEO THẬT ) ÁO GIÓ 2 MẶT 2 LỚP - THOÁNG MÁT THÍCH HỢP CHO NAM NỮ",
      "image": "https://cf.shopee.vn/file/db85a18d4beb307b519e4e32d24222e3_tn",
      "price": 199000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed22",
      "id": "ba2a0a2d-0e45-4088-9f5e-dab09017a7c4",
      "title": "Hình xăm giả cực đẹp cá tính mã X-01 (1 tấm)",
      "image": "https://cf.shopee.vn/file/5a7eb78e8aa9d8b5382b60ee052d9f16_tn",
      "price": 1000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed23",
      "id": "bddf44d6-32f8-4ef4-ae6f-57ff26544eb1",
      "title": "[Mã FASHIONHOT27 giảm 10K]Áo Hoodie Trơn ❤️/Nam nữ unisex/FREESHIP 99K",
      "image": "https://cf.shopee.vn/file/9f708f940efebad5970d823234cb5157_tn",
      "price": 160000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed24",
      "id": "375563fd-45ed-424e-b5f6-6e548590ed84",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] QUẦN SHORT KAKI NAM CO GIÃN - HÌNH THẬT",
      "image": "https://cf.shopee.vn/file/0dd73bc5a40b16518b7bdbaa97424f9b_tn",
      "price": 120000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed25",
      "id": "0e75ab9e-70c1-438d-a223-9c314da12057",
      "title": "Áo thun nam có cổ polo cao cấp, màu kem nâu tanin phối viền sang trọng, Basis APL177",
      "image": "https://cf.shopee.vn/file/e4a77630620999321c30e3e5ecbbecd0_tn",
      "price": 310000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed26",
      "id": "00d2b9f5-1c71-4327-8bce-37e6c336cb31",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo khoác gió nam chống nước Áo dù thể thao 5 màu kèm túi đựng G-01",
      "image": "https://cf.shopee.vn/file/57e51bf29006a585c09cd6ca5f130d56_tn",
      "price": 150000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed27",
      "id": "9d4457ad-2766-4acb-bb7c-355c0410fe70",
      "title": "[Mã FASHIONCBMA giảm 15K đơn bất kỳ] Nhẫn Thép titan trơn nam nữ vớt cạnh cá tính không gỉ siêu bền",
      "image": "https://cf.shopee.vn/file/906f224d3cf4bb23740f45468b008507_tn",
      "price": 12800,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed28",
      "id": "06ced8c8-9039-45ec-a77c-43120e687af7",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Túi đeo chéo nam vải bố thời trang",
      "image": "https://cf.shopee.vn/file/0fa98da2deb4f3476bdb1245198f3b6d_tn",
      "price": 93000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed29",
      "id": "aff6ae60-08a2-4842-b7e9-915ed1742232",
      "title": "Áo COTTON POLO",
      "image": "https://cf.shopee.vn/file/c84ad50ed1cd06e4d78c21eff7f10345_tn",
      "price": 160000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2a",
      "id": "2e958c9e-7534-4608-b18b-88499ccf5f3a",
      "title": "[HỘP 4 CÁI] quần sịp nam , quần lót thun lạnh cao cấp",
      "image": "https://cf.shopee.vn/file/ea7c319d9b723ae105c810a01a838cb4_tn",
      "price": 104000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2b",
      "id": "a08c6c4f-7941-40ae-a4d0-4f685d88fdd7",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] [ FREE SHIP 50k ] ÁO GIÓ 2 LỚP- CHỐNG NƯỚC- CHỐNG GIÓ",
      "image": "https://cf.shopee.vn/file/b0ba11dff44dd17b57ab89f5e6448013_tn",
      "price": 99000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2c",
      "id": "beb2007b-e00c-448e-ba68-8aebb7586813",
      "title": "Quần Jean Nam Chất Bò Cao Cấp AD5678TG Xanh Sáng Trẻ Trung Thời Trang TG",
      "image": "https://cf.shopee.vn/file/9a06b4714e509b5e25425e12ca4dc26b_tn",
      "price": 250000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2d",
      "id": "645dca41-6f2e-4b05-8514-b5180e0af572",
      "title": "[Mã FASHIONHOT27 giảm 10K][Full Size] Áo vest nam body kiểu Hàn Quốc đơn giản phong cách",
      "image": "https://cf.shopee.vn/file/def0a9fdfc55227be423d2197bf3cfeb_tn",
      "price": 300000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2e",
      "id": "52317d18-fb12-4fc0-9583-165a3d865fd8",
      "title": "[Mã FASHIONXANH273 hoàn 10% tối đa 50K xu đơn 300k] Balo nam hàn quốc HARAS HR238",
      "image": "https://cf.shopee.vn/file/e0a804e0d1bce77a325c7b44e55eca33_tn",
      "price": 300000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed2f",
      "id": "cac7c61d-1787-4aec-9590-23f5cb52d3fd",
      "title": "[Mã FASHIONHOT27 giảm 10K]Quần Thun Thể Thao Nam 3 Sọc Quần Nam Thu Đông Co Giãn Ống Suông QT42",
      "image": "https://cf.shopee.vn/file/3cf949050d73884aa131ed56494e882a_tn",
      "price": 140000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed30",
      "id": "0f58003b-35cd-45f8-a0ff-fb5da649d7f6",
      "title": "Áo Khoác Kaki Jean mềm min cực chất",
      "image": "https://cf.shopee.vn/file/a710bbb68871a8a44a67f10314b7672e_tn",
      "price": 105000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed31",
      "id": "a8ebcc29-32f9-4b04-9c6c-9da55ba87870",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Áo thun nam dài tay cổ tròn mặc thu đông, giữ nhiệt, chất cotton co giãn, dáng ôm",
      "image": "https://cf.shopee.vn/file/1acade05a38efb90436d01bde9ca0c36_tn",
      "price": 150000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed32",
      "id": "bddd7306-9fba-429e-a2b2-c8577a48cea6",
      "title": "Ví Nam Mini Siêu Nhỏ Gọn Mỏng Nhẹ Bỏ Túi Quần Tiện Lợi Để Vừa Chứng Minh Thư, Nhiều Ngăn Đề Thẻ",
      "image": "https://cf.shopee.vn/file/b7f5d9ceb7dc15fa171a4edd3111075c_tn",
      "price": 18000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed33",
      "id": "6e5936f6-1fe2-4a0d-b54d-1657c8b67445",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo thun nam dài tay, áo giữ nhiệt nam co dãn 4 chiều-namdaishop",
      "image": "https://cf.shopee.vn/file/5dffee7663857008c6182ae5a5d3482e_tn",
      "price": 80000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed34",
      "id": "c080238c-f1f1-4983-a0cd-4f26c5e412b3",
      "title": "[Mã FASHIONCBT3 giảm 20k đơn 50k] Huy hiệu cài áo hình chiếc lá đính ngọc thời trang",
      "image": "https://cf.shopee.vn/file/2474f2e86e98de4185fb14699d037113_tn",
      "price": 85800,
      "categoryIds": [
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 100,
      "category": "Trang Sức Nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed35",
      "id": "8998d696-2a15-43d1-a5b5-e9eae76b8d25",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] Áo Thun Nam Nữ Trơn Giá Rẻ Nhiều Màu",
      "image": "https://cf.shopee.vn/file/b09a2b491b989fe62343149a83771eee_tn",
      "price": 19000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed36",
      "id": "8f186a07-b1e7-468a-a31c-290bae70a410",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] [HOT] Mũ lưỡi trai trơn đủ màu đơn giản mà cực cá tính",
      "image": "https://cf.shopee.vn/file/d8d55fc3dd1019ea9557d0127d083243_tn",
      "price": 12000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed37",
      "id": "68a4c4d8-be8a-4975-bd28-dee07e708d83",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] áo thun nam , áo phông nam - nữ Tay ngắn cổ tròn 2 màu đen - trắng logo thương hiệu",
      "image": "https://cf.shopee.vn/file/a7d8af6c40f2ee901ec3f44a11853705_tn",
      "price": 39800,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed38",
      "id": "322a7a0e-d2ba-471e-8301-ecb365759a49",
      "title": "Áo thun trơn tay lỡ Gấu 194 Unisex From rộng phong cách Ulzzang vải coton dày dặn, co dãn",
      "image": "https://cf.shopee.vn/file/215c17e6c5c0d3c4c690d2975b8faffa_tn",
      "price": 138000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed39",
      "id": "302ed7a8-0a34-4942-b14f-5ceebf34c8fe",
      "title": "Áo thun nam [ĐỔI SIZE THOẢI MÁI] áo phông nam tay ngắn polo cao cấp BASIC cực đẹp -  TATCS048",
      "image": "https://cf.shopee.vn/file/b7cbe9b9f10f37d395ca25f2d302367a_tn",
      "price": 180000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3a",
      "id": "79b2b85d-e832-499f-887e-293601331c89",
      "title": "Quần Jogger kaki co giãn - Thiết kế khoá kéo lưng thun",
      "image": "https://cf.shopee.vn/file/e176e1244875ae0a9737c289dbd038cc_tn",
      "price": 296000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3b",
      "id": "40106b06-c545-44aa-a1b3-f83a1cfb7a13",
      "title": "[Mã FASHIONHOTMA hoàn 15 % đơn 150k] (50kg-95kg)Thun Lạnh, Co Giãn 4 Chiều, Logo Phản Quang, Áo Thun Nam,",
      "image": "https://cf.shopee.vn/file/8c68913605dc0e2e68fd2d098c54a916_tn",
      "price": 55000,
      "categoryIds": [
        "281f2116-0d62-4ff3-a2d0-382063785327"
      ],
      "quantity": 100,
      "category": "Áo thun"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3c",
      "id": "ad53a5d7-3f4b-4c11-9bbf-5e68b5226af7",
      "title": "<FREE SHIP> ÁO HOODIE NỈ NGOẠI BAO ĐẸP, BAO CHẤT (cv)",
      "image": "https://cf.shopee.vn/file/8cbfc070b9a214ee5cec63f82f2b06d1_tn",
      "price": 180000,
      "categoryIds": [
        "0a86c892-9cfc-405e-9c5d-0efc68bb2290"
      ],
      "quantity": 100,
      "category": "Áo khoác  Áo vest"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3d",
      "id": "38f7c1aa-a054-4db3-93d1-96e0c034b6b2",
      "title": "[Mã FASHIONHOT27 giảm 10K]COMBO 5 Chiếc Quần Lót Boxer Nam QN244 (Đai ngẫu nhiên)",
      "image": "https://cf.shopee.vn/file/af8cb23e5adfb672651223846b8bacb9_tn",
      "price": 218000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3e",
      "id": "5712d95c-9285-4da8-8c66-f5bdc949da0f",
      "title": "[Mã FASHIOND10 giảm 10K đơn 50K] Quần short nam Q32 MĐ trắng xanh cào rách",
      "image": "https://cf.shopee.vn/file/1a61f8329e3221a63c6ca5dcf377eb64_tn",
      "price": 150000,
      "categoryIds": [
        "6d527105-519d-4353-8fbc-9e72e36d9b21"
      ],
      "quantity": 100,
      "category": "Quần"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed3f",
      "id": "07ef553e-c0c6-4cc5-b553-52bb7ed76ad7",
      "title": "NÓN KẾT LƯỠI TRAI TRƠN RẺ ĐỦ MÀU NAM NỮ",
      "image": "https://cf.shopee.vn/file/af7ffbb9108ff434968170abaf09fe46_tn",
      "price": 30000,
      "categoryIds": [
        "b005ddfe-5365-44f8-bba4-8d28aec80790"
      ],
      "quantity": 100,
      "category": "Phụ kiện nam"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed40",
      "id": "6613aa89-4913-40e9-aebd-011afd8dda57",
      "title": "Ví Nam Da Bò Thật 100% Đốt Không Cháy (Ví Ngang)",
      "image": "https://cf.shopee.vn/file/9c5f2a1a11a76e45817890f1fd31f8a4_tn",
      "price": 250000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed41",
      "id": "390bb25f-5435-4e3d-be8f-71e6ff938098",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Túi đeo chéo nam Fortune Mouse classic KQ195 (màu đen)",
      "image": "https://cf.shopee.vn/file/9ff021320ee982d98bff64660a3218c2_tn",
      "price": 79000,
      "categoryIds": [
        "8d196faf-1584-4883-989e-dcda9db13ff1"
      ],
      "quantity": 100,
      "category": "Balo Túi Ví"
    },
    {
      "_id": "606f3d359aff6f3d4f04ed42",
      "id": "2bacb2b4-8395-4f2d-a919-75e5e70687d9",
      "title": "[Mã FASHIONFREE10 giảm 10K đơn 20K] Áo thun ba lỗ nam cao cấo GABOFASHION",
      "image": "https://cf.shopee.vn/file/c93778e5229b686dcd022aeaf2f760bc_tn",
      "price": 49000,
      "categoryIds": [
        "70d78106-50d6-421b-ba7a-1908cc712517"
      ],
      "quantity": 100,
      "category": "Áo nỉ Áo len"
    },
    {
      "_id": "60b6f93190a5df001a14c199",
      "id": "28a5d064-6cd9-47b6-b353-421d29fac556",
      "title": "abc",
      "image": "https://i.imgur.com/fqFnldV.png",
      "price": 120000,
      "categoryIds": [
        "1545409e-b977-42b7-a5d0-9c8ad63bd283",
        "e8a95ad3-a037-4dd3-b841-7b2e49f29015"
      ],
      "quantity": 123,
      "category": "Mắt kính,Trang Sức Nam"
    }
  ]
}
