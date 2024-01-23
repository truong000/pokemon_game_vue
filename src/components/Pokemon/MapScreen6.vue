<script setup lang="ts">
import { gameStore } from '@/stores/pokemon'
import { computed } from 'vue'
const pros = defineProps(['map'])
interface Card {
  id: number
  imageUrl: string
  isFlipped: boolean
}

const cards = computed(() => {
  return gameStore.state.cards
})

const sizeMap = (rows: number, columns: number) => {
  gameStore.selectMapGame(rows, columns)
}

sizeMap(pros.map, pros.map)

const handleCardClick = (card: Card) => {
  gameStore.flipCard(card.id) // Pass the card's id to the flipCard method
  gameStore.checkMatch() // Check if there is a match after a flip
}
</script>

<template>
  <div class="game-container">
    <div class="game-board">
      <div class="card" v-for="card in cards" :key="card.id">
        <img
          :src="card.isFlipped ? card.imageUrl : '/src/assets/images/icon_back.png'"
          :alt="`Card ${card.id}`"
          @click="handleCardClick(card)"
          width="125"
          height="125"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 10px;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 10px;
}

.card img {
  max-width: 100%;
  max-height: 100%;
}
</style>
