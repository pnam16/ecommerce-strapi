"use strict";

const { addListener } = require("strapi-utils/lib/logger");

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = {
  /**
   * Create an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, products, note } = ctx.request.body;

    const order = await strapi.services.order.create({
      address,
      amount,
      note,
    });

    console.log("order", order);

    const orderDetailIds = [];
    products.forEach(async element => {
      const orderDetail = await strapi.services["order-detail"].create({
        order: order.id,
        product: element.id,
        quantity: element.quantity,
      });
      orderDetailIds.push(orderDetail.id);
    });

    const update = await strapi.services.order
      .update(
        { id: order.id },
        {
          ...order,
          order_details: orderDetailIds
        }
      );

    return update;
  },
};
