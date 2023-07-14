<template>
    <div>
        <div v-html="formHtml"></div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
export default {
    setup() {
        const formHtml = ref(`
        <form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=LMktkVMq7IoTM8%2BHyjLDQY3%2FsQM6lCpe44aIUu0gHh4XdcBFiMt7Z4ZxxDLQMrVhSx6LOc8GALXnx0eH3xGTbq0pIDqEuFAbi9RJVdyTbguAHGi6lGAXeSsDdqosZrt4O%2FXzJ9U220%2BIQtepPxPvXTa7qDl%2BHj7CYWhvVygfNJdfMRmvmvErfXKztNVRrroDxPfbmDopC0MqaEhVmB8LXtXINHr2BRvqMBWKJfYsX7NrcT27%2FCi8hycs72halJqs%2B2k3qKh02aw%2FkJz%2BlsjBNt9KEU8P9cpW%2BnEcUB2VTC0QtkL9fwWVydtEDAgkNAf2oZEadJG9RBlKd2pw8ReR0A%3D%3D&return_url=http%3A%2F%2Flocalhost%3A9089%2Falipay%2Fsuccess%7D&notify_url=http%3A%2F%2Flocalhost%3A9089%2Falipay%2Fsuccess&version=1.0&app_id=9021000123608179&sign_type=RSA2&timestamp=2023-07-14+11%3A50%3A05&alipay_sdk=alipay-sdk-java-3.1.0&format=json">
          <input type="hidden" name="biz_content" value="{&quot;body&quot;:&quot;商品描述&quot;,&quot;out_trade_no&quot;:&quot;46206528d51f4078a10921a11d35677d&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;,&quot;subject&quot;:&quot;订单名称&quot;,&quot;total_amount&quot;:&quot;19&quot;}">
          <input type="submit" value="立即支付" style="display:none">
        </form>
        <script>document.forms[0].submit();
</script>
      `);
  
      onMounted(() => {
        const form = document.forms[0];
        form.addEventListener('submit', handleSubmit);
      });
  
      const handleSubmit = () => {
        // 处理表单提交逻辑
        // 可以在这里进行一些额外的处理，例如重定向到成功页面
      };
  
      return {
        formHtml,
      };
    },
  };
  </script>
  
<style scoped>
/* 样式 */
</style>
  