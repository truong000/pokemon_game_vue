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
  isCompleted: false
}

// Sử dụng reactive() để tạo một reactive state cho trò chơi
const state = reactive<GameState>({ ...initialState })

// Bạn có thể định nghĩa các hàm để xử lý logic của trò chơi.
function flipCard(cardId: number) {
  const cardToFlip = state.cards.find((card) => card.id === cardId)
  if (cardToFlip && !cardToFlip.isFlipped) {
    cardToFlip.isFlipped = true
    state.flippedCards.push(cardToFlip)
    console.log('state.flippedCards', state.flippedCards)
  }
}

function checkMatch() {
  if (state.flippedCards.length === 2) {
    state.counter.counter++
    const [card1, card2] = state.flippedCards
    if (card1.imageUrl !== card2.imageUrl) {
      // Không khớp, lật lại sau một khoảng thời gian
      setTimeout(() => {
        card1.isFlipped = false
        card2.isFlipped = false
        state.flippedCards = []
      }, 1000)
    } else {
      // Khớp, giữ chúng được lật
      state.counterMatch++
      state.flippedCards = []
      checkComplete()
    }
  }
}
function selectMapGame(rows: number, columns: number) {
  const totalPairs = (rows * columns) / 2
  // Đảm bảo danh sách initialCards đủ để tạo các cặp
  const availableCards = initialState.cards.slice(0, totalPairs)
  const cards: Card[] = []

  // Tạo cặp card với cùng imageUrl nhưng các id khác nhau
  availableCards.forEach((card) => {
    // Tạo cặp card đầu tiên
    const cardPair1: Card = { id: card.id * 2 - 1, imageUrl: card.imageUrl, isFlipped: false }
    // Tạo cặp card thứ hai với id+1
    const cardPair2: Card = { id: card.id * 2, imageUrl: card.imageUrl, isFlipped: false }
    cards.push(cardPair1, cardPair2)
  })
  // Trộn danh sách cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  state.isCompleted = false
  // Cập nhật trạng thái game với danh sách card mới
  Object.assign(state, {
    ...initialState,
    cards: cards
  })
}

function checkComplete() {
  const totalPairs = state.cards.length / 2
  if (state.counterMatch === totalPairs) {
    state.isCompleted = true
  }
}

function resetGame() {
  Object.assign(state, { ...initialState })
  // Khi đặt lại trò chơi, bạn có thể trộn thẻ tại đây nếu cần thiết
}

export const gameStore = {
  state: readonly(state), // Readonly để ngăn không cho state bị thay đổi trực tiếp
  flipCard,
  checkMatch,
  resetGame,
  selectMapGame
}
