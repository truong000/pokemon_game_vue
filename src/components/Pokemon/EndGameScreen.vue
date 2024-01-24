<script setup lang="ts">
import { gameStore } from '@/stores/pokemon'

const resetGame = () => {
  gameStore.resetGame()
}
</script>

<template>
  <div class="map-game">
    <h1>✨ Congratulations ✨</h1>
    <h2>🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓</h2>
    <h3>Your Score: {{ gameStore.state.timeElapsed }}s</h3>
    <button @click="resetGame">Start Again</button>
    <p class="footer">This game by <span>Xuan Truong</span></p>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4rem;
}

h3 {
  font-size: 3rem;
  margin-top: 1.5rem;
}

button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background: #7e405f;
  border-color: rgb(228, 148, 51);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgb(231, 194, 194);
  }
}

.footer {
  margin-top: 20rem;
  font-size: 1.5rem;
}
</style>
