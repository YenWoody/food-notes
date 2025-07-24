<template>
  <div ref="mapViewEl" class="absolute top-[64px] bottom-[65px] left-0 right-0" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import { ElLoading } from 'element-plus'
import { whenOnce } from '@arcgis/core/core/reactiveUtils'

const mapViewEl = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!mapViewEl.value) return

  // 👉 Loading với custom progress
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    background: 'rgba(255,255,255,0.8)'
  })
  // 👉 Tạo % nằm giữa spinner xoay
  const percentText = document.createElement('div')
  percentText.id = 'loading-percent-text'
  percentText.style.position = 'absolute'
  percentText.style.top = '50%'
  percentText.style.left = '50%'
  percentText.style.transform = 'translate(-50%, -50%)'
  percentText.style.fontSize = '12px'
  percentText.style.fontWeight = 'bold'
  percentText.style.color = '#409EFF'
  percentText.innerText = '0%'

  // 👉 Gắn vào spinner
  loadingInstance.$el.querySelector('.el-loading-spinner')?.appendChild(percentText)

  // 👉 Cập nhật phần trăm giả định
  let percent = 0
  const interval = setInterval(() => {
    percent = Math.min(percent + Math.random() * 10, 95)
    const textEl = loadingInstance.$el.querySelector('#loading-percent-text') as HTMLElement | null
    if (textEl) textEl.innerText = `${Math.round(percent)}%`
  }, 200)

  // 👉 ArcGIS Map setup
  const map = new Map({
    basemap: 'streets-navigation-vector'
  })

  const view = new MapView({
    container: mapViewEl.value,
    map,
    center: [105.85, 21.02],
    zoom: 12
  })

  view.when(async () => {
    try {
      // Đợi tất cả layers load xong
      const layerPromises = view.map?.layers.map((layer) => layer.when()) || []
      await Promise.all(layerPromises)

      const viewPromises = view.map?.layers.map((layer) => view.whenLayerView(layer)) || []
      await Promise.all(viewPromises)

      console.log('Map and all layers fully loaded')
    } catch (err) {
      console.error('Lỗi khi tải bản đồ hoặc lớp:', err)
    } finally {
      // 👉 Đợi khi bản đồ render xong
      await whenOnce(() => view.updating === false)

      // Hoàn tất loading
      clearInterval(interval)
      const textEl = loadingInstance.$el.querySelector(
        '#loading-percent-text'
      ) as HTMLElement | null
      if (textEl) textEl.innerText = `100%`

      setTimeout(() => {
        loadingInstance.close()
      }, 200)
    }
  })
})
</script>

<style scoped>
:deep(.esri-view .esri-view-surface),
:deep(.esri-view .esri-view-surface:focus),
:deep(.esri-view .esri-view-surface:focus-visible) {
  outline: none !important;
  box-shadow: none !important;
}
</style>
