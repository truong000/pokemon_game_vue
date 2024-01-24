<script setup lang="ts">
import { gameStore } from '@/stores/pokemon'
import { computed, ref } from 'vue'
import EndGameScreen from '@/components/Pokemon/EndGameScreen.vue'

const props = defineProps(['map'])
interface Card {
  id: number
  imageUrl: string
  isFlipped: boolean
}

const isComplete = computed(() => {
  return gameStore.state.isCompleted
})

const cards = computed(() => {
  return gameStore.state.cards
})

const boardStyle = ref({
  gridTemplateColumns: `repeat(${props.map}, 1fr)`
})

const sizeMap = (rows: number, columns: number) => {
  gameStore.selectMapGame(rows, columns)
  boardStyle.value.gridTemplateColumns = `repeat(${columns}, 1fr)`
}

sizeMap(props.map, props.map)

const handleCardClick = (card: Card) => {
  gameStore.flipCard(card.id) // Pass the card's id to the flipCard method
  gameStore.checkMatch() // Check if there is a match after a flip
}
</script>

<template>
  <div v-if="!isComplete" class="game-container">
    <header class="game-header">
      <h1>POKE MEMORIES</h1>
    </header>
    <div class="game-board" :style="boardStyle">
      <div v-for="card in cards" :key="card.id" class="card">
        <img
          :src="card.isFlipped ? card.imageUrl : '/src/assets/images/icon_back.png'"
          :alt="`Card ${card.id}`"
          @click="handleCardClick(card)"
          width="100"
          height="100"
        />
      </div>
    </div>
  </div>
  <EndGameScreen v-else />
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #7e405f;
}

.game-header {
  text-align: center;
}

.game-board {
  display: grid;
  gap: 5px;
  max-width: 800px;
  margin-top: 20px;
}

.card {
  border: solid;
  border-color: #d47fdd;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: #ddbfce;
}
</style>
