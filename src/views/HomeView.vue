<script setup>
import { ref, nextTick } from 'vue'

// 引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
// 引入相关样式
import '@vue-office/docx/lib/index.css'

import html2canvas from 'html2canvas'

// 设置文档网络地址，可以是相对地址
const docx = ref('http://static.shanhuxueyuan.com/test6.docx')
const imgUrl = ref('')

// 文檔渲染完成後才透過html2canvas生成圖片
function renderedHandler () {
  generateImg()
}
const generateImg = () => {
  nextTick(async () => {
    const el = document.getElementById('vueOfficeDocx')
    const options = {
      width: el.offsetWidth,
      height: el.offsetHeight,
      useCORS: true, // 是否尝试使用 CORS 从服务器加载图像
      allowTaint: false // 是否允许跨源图像污染画布
    }

    await html2canvas(el, options).then(async (canvas) => {
      imgUrl.value = canvas.toDataURL('image/jpeg') // 转base64
    })
  })
}

</script>

<template>

  <img :src='imgUrl' alt='' style="width:100px;height:100px;">

  <div id="vueOfficeDocx"
       class="position-absolute"
       style="transform: translate(-999999px, -999999px);">
    <VueOfficeDocx
        :src="docx"
        @rendered="renderedHandler"
        style="width:100vw;height:100vh;"
    />
  </div>

</template>

<style lang='scss' scope></style>
