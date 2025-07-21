<template>
  <div ref="mapViewEl" class="absolute top-[64px] bottom-[65px] left-0 right-0" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
const mapViewEl = ref<HTMLDivElement | null>(null)
onMounted(() => {
  if (!mapViewEl.value) return
  const map = new Map({
    basemap: 'streets-navigation-vector'
  })

  if (mapViewEl.value) {
    const view = new MapView({
      container: mapViewEl.value,
      map,
      center: [105.85, 21.02],
      zoom: 12
    })
  }
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
