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
    }
  ],
  flippedCards: [],
  counter: { counter: 0 }
}

// Sử dụng reactive() để tạo một reactive state cho trò chơi
const state = reactive<GameState>({ ...initialState })

// Bạn có thể định nghĩa các hàm để xử lý logic của trò chơi.
function flipCard(cardId: number) {
  const cardToFlip = state.cards.find((card) => card.id === cardId)

  if (cardToFlip && !cardToFlip.isFlipped) {
    cardToFlip.isFlipped = true
    state.flippedCards.push(cardToFlip)
    state.counter.counter++
  }
}

function checkMatch() {
  if (state.flippedCards.length === 2) {
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
      state.flippedCards = []
    }
  }
}
function selectMapGame(rows: number, columns: number) {
  // Tính tổng số cards cần có, mỗi card sẽ có một cặp
  const totalPairs = (rows * columns) / 2
  const cards: Card[] = []
  const cardImages = [...initialState.cards] // Copy cardImages từ initialState

  // Trộn mảng initialState.cards và lấy ra totalPairs số lượng các card để tạo cặp
  for (let i = 1; i <= totalPairs; i++) {
    // Chọn một card ngẫu nhiên từ cardImages
    const randomIndex = Math.floor(Math.random() * cardImages.length)
    const randomCard = cardImages.splice(randomIndex, 1)[0]

    // Thêm cặp card vào mảng cards
    const cardPair1: Card = { ...randomCard, id: cards.length + 1, isFlipped: false }
    const cardPair2: Card = { ...randomCard, id: cards.length + 2, isFlipped: false }

    cards.push(cardPair1, cardPair2)
  }

  // Trộn mảng cards để cặp card không đứng cạnh nhau
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  // Cập nhật trạng thái game với danh sách card mới
  Object.assign(state, {
    ...initialState,
    cards: cards
  })
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
