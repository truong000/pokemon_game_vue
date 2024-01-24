<script setup lang="ts">
import MapSreen from '@/components/Pokemon/MapSreen.vue'
import { ref } from 'vue'

const isShowIntro = ref(true)
const mapSelect = ref(0)

function clickSelectMap(map: number) {
  mapSelect.value = map
  isShowIntro.value = false
}
</script>

<template>
  <div class="map-game" v-if="isShowIntro">
    <h1>POKE MEMORIES</h1>
    <p class="text">Select mode to start game</p>
    <div class="map-options">
      <div class="map-option" @click="clickSelectMap(2)">
        <h2>2x2</h2>
        <p>Very Easy</p>
      </div>
      <div class="map-option" @click="clickSelectMap(4)">
        <h2>4x4</h2>
        <p>Easy</p>
      </div>
      <div class="map-option" @click="clickSelectMap(6)">
        <h2>6x6</h2>
        <p>Normal</p>
      </div>
    </div>
    <p class="footer">This game by <span>Xuan Truong</span></p>
  </div>
  <MapSreen v-else :map="mapSelect" />
</template>

<style scoped>
@import './styles.scss';
</style>
