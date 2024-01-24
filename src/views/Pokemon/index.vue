<script setup lang="ts">
import MapSreen from '@/components/Pokemon/MapSreen.vue'
import { ref } from 'vue'

const isShowIntro = ref(true)
const mapSelect = ref(0)

const clickSelectMap = (map: number) => {
  mapSelect.value = map
  isShowIntro.value = false
}

const mapGame = [
  { id: 1, name: '2x2', row: 2, text: 'Very Easy' },
  { id: 2, name: '4x4', row: 4, text: 'Easy' },
  { id: 3, name: '6x6', row: 6, text: 'Normal' }
]
</script>

<template>
  <div class="map-game" v-if="isShowIntro">
    <h1>POKE MEMORIES</h1>
    <p class="text">Select mode to start game</p>
    <div class="map_list">
      <div class="map-options" v-for="map in mapGame" :key="map.id">
        <div class="map-option" @click="clickSelectMap(map.row)">
          <h2>{{ map.name }}</h2>
          <p>{{ map.text }}</p>
        </div>
      </div>
    </div>
    <p class="footer">This game by <span>Xuan Truong</span></p>
  </div>
  <MapSreen v-else :map="mapSelect" />
</template>

<style scoped>
@import './styles.scss';
.map_list {
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}
</style>
