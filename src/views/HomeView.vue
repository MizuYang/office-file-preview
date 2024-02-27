<script setup>
import { ref, nextTick } from 'vue'

// 文檔預覽套件
import VueOfficeExcel from '@vue-office/excel'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficePdf from '@vue-office/pdf'
import '@vue-office/excel/lib/index.css'
import '@vue-office/docx/lib/index.css'
// 螢幕截圖套件
import html2canvas from 'html2canvas'

// 设置文档网络地址，可以是相对地址
const fileData = ref({
  docx: 'http://static.shanhuxueyuan.com/test6.docx',
  xlsx: '',
  pdf: ''
})
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
function uploadFile (e) {
  // 取得副檔名
  const fileExtension = e.target.files[0].name.split('.').at(-1)
  const file = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)

  fileReader.onload = () => {
    // 初始化
    fileDataInit()

    fileData.value[fileExtension] = fileReader.result
  }
}
function fileDataInit () {
  Object.keys(fileData.value).forEach(keyName => {
    fileData.value[keyName] = ''
  })
}

</script>

<template>
  <input type="file"
         @change="uploadFile">

  <img :src='imgUrl' alt='' style="width:100px;height:100px;">

  <div id="vueOfficeDocx"
       class="position-absolute"
       style="width:50%;height:30%;transform: translate(-999999px, -999999px);">
    <template v-if="fileData.docx">
      <VueOfficeDocx
          :src="fileData.docx"
          @rendered="renderedHandler"
          style="width:100vw;height:100vh;"
      />
    </template>
    <template v-if="fileData.xlsx">
      <VueOfficeExcel
          :src="fileData.xlsx"
          @rendered="renderedHandler"
          style="width:100vw;height:100vh;"
      />
    </template>
    <template v-if="fileData.pdf">
      <VueOfficePdf
          :src="fileData.pdf"
          @rendered="renderedHandler"
          style="width:100vw;height:100vh;"
      />
    </template>
  </div>

</template>

<style lang='scss' scope></style>
