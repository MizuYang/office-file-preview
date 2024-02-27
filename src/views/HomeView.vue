<script setup>
import { ref, nextTick } from 'vue'

// 引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
// 引入相关样式
import '@vue-office/docx/lib/index.css'

import html2canvas from 'html2canvas' // eslint-disable-line

// 设置文档网络地址，可以是相对地址
const docx = ref('http://static.shanhuxueyuan.com/test6.docx')

function rendered () { // eslint-disable-line
  nextTick(() => {
  // 獲取VueOfficeDocx元素
    const element = document.getElementById('vueOfficeDocx')
    console.log('element', element)

    // 創建一個新的canvas元素
    const canvas = document.createElement('canvas')
    console.log('canvas', canvas)
    const context = canvas.getContext('2d')
    console.log('context', context)

    // 設置canvas尺寸
    canvas.width = 100
    canvas.height = 100
    // canvas.width = element.offsetWidth
    // canvas.height = element.offsetHeight

    // 將VueOfficeDocx元素內容繪製到canvas上
    context.drawImage(element, 0, 0, 100, 100)

    // 將canvas轉換為圖片格式
    const imageData = canvas.toDataURL('image/png')
    console.log('imageData', imageData)

    // 創建一個新的圖片元素
    // const image = new Image()

    // 設置圖片源為canvas轉換的圖片資料
    // image.src = imageData

    // 將圖片元素加入到DOM中，或者進行其他後續處理
    // document.body.appendChild(image)
  })
}

</script>

<template>
  <button type='button'
          class='btn btn-primary'
          @click='generateImg'>
    下載
  </button>

  <VueOfficeDocx
      :src="docx"
      style="width:100vw;height:100vh;"
  />

</template>

<style lang='scss' scope></style>
