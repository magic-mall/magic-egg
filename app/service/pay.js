'use strict';

const {
  Service,
} = require('egg');
const Alipay = require('alipay-mobile').default; // 这里是一个issue: https://github.com/Luncher/alipay/issues/49

class PayService extends Service {
  /* ************************ 支付宝相关服务 ************************ */
  async ali(orderData) {
    return new Promise((resolve, reject) => {
      // 实例化 alipay
      const service = new Alipay(this.config.pay.ali.options);
      // 获取返回的参数
      service.createPageOrderURL(orderData, this.config.pay.ali.basicParams)
        .then(result => {
          console.log(result);
          resolve(result.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  // 验证异步通知的数据是否正确 params 是支付宝post给我们服务器的数据
  async payMoney(params) {
    const service = new Alipay(this.config.pay.ali.options);
    return service.makeNotifyResponse(params);
  }
}

module.exports = PayService;
