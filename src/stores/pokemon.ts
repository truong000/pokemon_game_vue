import { reactive, readonly } from 'vue'

interface Card {
  id: number
  imageUrl: string
  isFlipped: boolean
}

interface CounterFlippedCards {
  counter: number
}

interface GameState {
  cards: Card[]
  flippedCards: Card[]
  counter: CounterFlippedCards
  counterMatch: number
  isCompleted: boolean
  timeElapsed: number
  timerId?: number
}

const initialState: GameState = {
  cards: [
    {
      id: 1,
      imageUrl: '/src/assets/images/1.png',
      isFlipped: false
    },
    {
      id: 2,
      imageUrl: '/src/assets/images/2.png',
      isFlipped: false
    },
    {
      id: 3,
      imageUrl: '/src/assets/images/3.png',
      isFlipped: false
    },
    {
      id: 4,
      imageUrl: '/src/assets/images/4.png',
      isFlipped: false
    },
    {
      id: 5,
      imageUrl: '/src/assets/images/5.png',
      isFlipped: false
    },
    {
      id: 6,
      imageUrl: '/src/assets/images/6.png',
      isFlipped: false
    },
    {
      id: 7,
      imageUrl: '/src/assets/images/7.png',
      isFlipped: false
    },
    {
      id: 8,
      imageUrl: '/src/assets/images/8.png',
      isFlipped: false
    },
    {
      id: 9,
      imageUrl: '/src/assets/images/9.png',
      isFlipped: false
    },
    {
      id: 10,
      imageUrl: '/src/assets/images/10.png',
      isFlipped: false
    },
    {
      id: 11,
      imageUrl: '/src/assets/images/11.png',
      isFlipped: false
    },
    {
      id: 12,
      imageUrl: '/src/assets/images/12.png',
      isFlipped: false
    },
    {
      id: 13,
      imageUrl: '/src/assets/images/13.png',
      isFlipped: false
    },
    {
      id: 14,
      imageUrl: '/src/assets/images/14.png',
      isFlipped: false
    },
    {
      id: 15,
      imageUrl: '/src/assets/images/15.png',
      isFlipped: false
    },
    {
      id: 16,
      imageUrl: '/src/assets/images/16.png',
      isFlipped: false
    },
    {
      id: 17,
      imageUrl: '/src/assets/images/17.png',
      isFlipped: false
    },
    {
      id: 18,
      imageUrl: '/src/assets/images/18.png',
      isFlipped: false
    },
    {
      id: 19,
      imageUrl: '/src/assets/images/19.png',
      isFlipped: false
    },
    {
      id: 20,
      imageUrl: '/src/assets/images/20.png',
      isFlipped: false
    },
    {
      id: 21,
      imageUrl: '/src/assets/images/21.png',
      isFlipped: false
    },
    {
      id: 22,
      imageUrl: '/src/assets/images/22.png',
      isFlipped: false
    },
    {
      id: 23,
      imageUrl: '/src/assets/images/23.png',
      isFlipped: false
    },
    {
      id: 24,
      imageUrl: '/src/assets/images/24.png',
      isFlipped: false
    },
    {
      id: 25,
      imageUrl: '/src/assets/images/25.png',
      isFlipped: false
    },
    {
      id: 26,
      imageUrl: '/src/assets/images/26.png',
      isFlipped: false
    },
    {
      id: 27,
      imageUrl: '/src/assets/images/27.png',
      isFlipped: false
    },
    {
      id: 28,
      imageUrl: '/src/assets/images/28png',
      isFlipped: false
    },
    {
      id: 29,
      imageUrl: '/src/assets/images/29.png',
      isFlipped: false
    },
    {
      id: 30,
      imageUrl: '/src/assets/images/30.png',
      isFlipped: false
    },
    {
      id: 31,
      imageUrl: '/src/assets/images/31.png',
      isFlipped: false
    },
    {
      id: 32,
      imageUrl: '/src/assets/images/32.png',
      isFlipped: false
    },
    {
      id: 33,
      imageUrl: '/src/assets/images/33.png',
      isFlipped: false
    },
    {
      id: 34,
      imageUrl: '/src/assets/images/34.png',
      isFlipped: false
    },
    {
      id: 35,
      imageUrl: '/src/assets/images/35.png',
      isFlipped: false
    },
    {
      id: 36,
      imageUrl: '/src/assets/images/36.png',
      isFlipped: false
    }
  ],
  flippedCards: [],
  counter: { counter: 0 },
  counterMatch: 0,
  isCompleted: false,
  timeElapsed: 0
}

const state = reactive<GameState>({ ...initialState })

function flipCard(cardId: number) {
  const cardToFlip = state.cards.find((card) => card.id === cardId)
  if (cardToFlip && !cardToFlip.isFlipped) {
    cardToFlip.isFlipped = true
    state.flippedCards.push(cardToFlip)
  }
}

function checkMatch() {
  if (state.flippedCards.length === 2) {
    state.counter.counter++
    const [card1, card2] = state.flippedCards
    if (card1.imageUrl !== card2.imageUrl) {
      setTimeout(() => {
        card1.isFlipped = false
        card2.isFlipped = false
        state.flippedCards = []
      }, 500)
    } else {
      state.counterMatch++
      state.flippedCards = []
      checkComplete()
    }
  }
}

function startTimer() {
  if (state.timerId) clearInterval(state.timerId)

  state.timerId = setInterval(() => {
    state.timeElapsed++
  }, 1000)
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId)
  }
}

function selectMapGame(rows: number, columns: number) {
  const totalPairs = (rows * columns) / 2
  const availableCards = initialState.cards.slice(0, totalPairs)
  const cards: Card[] = []

  availableCards.forEach((card) => {
    const cardPair1: Card = { id: card.id * 2 - 1, imageUrl: card.imageUrl, isFlipped: false }
    const cardPair2: Card = { id: card.id * 2, imageUrl: card.imageUrl, isFlipped: false }
    cards.push(cardPair1, cardPair2)
  })
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  state.isCompleted = false
  startTimer()
  Object.assign(state, {
    ...initialState,
    cards: cards
  })
}

function checkComplete() {
  const totalPairs = state.cards.length / 2
  if (state.counterMatch === totalPairs) {
    stopTimer()
    state.isCompleted = true
  }
}

function resetGame() {
  location.reload()
}

export const gameStore = {
  state: readonly(state),
  flipCard,
  checkMatch,
  resetGame,
  selectMapGame
}
