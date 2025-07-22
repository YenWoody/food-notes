<template>
  <div class="relative w-full max-w-md">
    <div class="flex">
      <input
        v-model="query"
        @input="onInput"
        @keydown="onKeydown"
        type="text"
        placeholder="Nhập địa chỉ..."
        class="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        @click="getCurrentLocation"
        class="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        title="Lấy vị trí hiện tại"
      >
        <MdiCrosshairsGps />
      </button>
    </div>
    <ul
      v-if="suggestions.length"
      class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-auto z-50"
    >
      <li
        v-for="item in suggestions"
        :key="item.magicKey"
        @click="select(item)"
        class="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
      >
        <div class="text-base font-medium text-gray-800">
          {{ item.address }}
        </div>
        <div class="text-sm text-gray-500 truncate">
          {{ item.full_address }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import MdiCrosshairsGps from '~icons/mdi/crosshairs-gps'
interface Suggestion {
  address: string
  location: {
    x: number
    y: number
  }
  full_address: string
  magicKey: string
}
const props = defineProps<{
  location: { name: string; lat: number; lng: number }
}>()
const emit = defineEmits<{
  (e: 'update:location', data: { name: string; lat: number; lng: number }): void
}>()

const query = ref(props.location.name || '')
console.log(query.value, 'query')
const suggestions = ref<Suggestion[]>([])

const fetchSuggestions = useDebounceFn(async () => {
  if (!query.value.trim()) {
    suggestions.value = []
    return
  }
  try {
    const url = new URL(
      'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates'
    )
    url.searchParams.set('f', 'json')
    url.searchParams.set('maxLocations', '10')
    url.searchParams.set('outFields', 'Match_addr,Place_addr,Location')
    url.searchParams.set('outSR', '4326')
    url.searchParams.set('SingleLine', query.value)
    url.searchParams.set('searchExtent', '102.14441,8.1952,109.4649,23.3922')
    const res = await fetch(url.toString())
    const data = await res.json()
    console.log('data', data)
    suggestions.value = (data?.candidates || []).map((c: any) => ({
      address: c.address,
      full_address: c.attributes?.Place_addr || 'Không có thông tin',
      location: c.location,
      magicKey: c.location.x + c.location.y || c.address
    }))
  } catch (e) {
    console.error('Lỗi tìm địa chỉ:', e)
    suggestions.value = []
  }
}, 500)

function onInput() {
  console.log('run')
  fetchSuggestions()
}

function select(item: Suggestion) {
  query.value = item.address
  suggestions.value = []
  emit('update:location', {
    name: item.address,
    lat: item.location.y,
    lng: item.location.x
  })
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    console.log('run')
    suggestions.value = []
  }
}
async function reverseGeocodeArcGIS(lat: number, lng: number): Promise<string | null> {
  try {
    const url = new URL(
      'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode'
    )
    url.searchParams.set('location', `${lng},${lat}`)
    url.searchParams.set('f', 'json')

    const res = await fetch(url.toString())
    const data = await res.json()

    return data?.address?.LongLabel || null
  } catch (e) {
    console.error('Lỗi reverse geocoding:', e)
    return null
  }
}

async function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Trình duyệt không hỗ trợ định vị!')
    return
  }
  try {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        const address = await reverseGeocodeArcGIS(lat, lng)

        emit('update:location', {
          name: address || 'Vị trí hiện tại',
          lat,
          lng
        })

        query.value = address || 'Vị trí hiện tại'
        suggestions.value = []
      },
      (err) => {
        if (err.code === 1) {
          // 1 = PERMISSION_DENIED
          console.warn('Người dùng từ chối định vị, có thể vẫn có cache.')
        } else {
          alert('Không lấy được vị trí hiện tại: ' + err.message)
        }
      }
    )
  } catch (e) {
    console.log(e)
  }
}

;(document.activeElement as HTMLElement)?.blur()
</script>
