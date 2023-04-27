import { Word } from "../types.js";

type WordWithEnergy = Word & {energy: number, probability: number}

let z = 0
const defaultEnergy = 0

function boltzmann(e: number, beta: number = 1) {
  return Math.exp(-e/beta)
}


const words: Word[] = [
  // { text: "python", japanese: "パイソン" },
  { text: "code", japanese: "コード（ソースコード）", filename: 'code__us_1.mp3' },
  { text: "hello", japanese: "こんにちは", filename: 'hello__us_2_rr.mp3' },
  { text: "world", japanese: "世界", filename: 'world__us_1.mp3' },
  { text: "print", japanese: "プリント", filename:  'print__us_1.mp3'},
  { text: "input", japanese: "インプット", filename: 'input__us_1.mp3' },
  { text: "name", japanese: "名前", filename: 'name__us_1.mp3' },
  { text: "return", japanese: "リターン、返す", filename: 'return__us_2.mp3' },
  { text: "type", japanese: "タイプ", filename: 'type__us_1.mp3' },
  { text: "strip", japanese: "取り除く", filename: 'strip__us_1.mp3' },
  { text: "upper", japanese: "上の", filename: 'upper__us_2.mp3' },
  { text: "split", japanese: "分割する", filename: 'split__us_1.mp3' },
  { text: "error", japanese: "エラー", filename: 'error__us_2.mp3' },
]



z = words.length * boltzmann(defaultEnergy)

const wordsWithEnergy: WordWithEnergy[] = words.map(w => {
  return (
    {
      ...w,
      energy: defaultEnergy,
      probability: boltzmann(defaultEnergy) / z,
    }
  )
})

function normalizeProbabilities() {
  z = wordsWithEnergy.reduce((p, c) => {
    return p + boltzmann(c.energy)
  }, 0)
  for (let j = 0; j < wordsWithEnergy.length; j++) {
    const w = wordsWithEnergy[j]
    w.probability = boltzmann(w.energy) / z
  }
}


export function getRandomWord(): Word {
  const r = Math.random()
  let temp = 0
  let word: WordWithEnergy|undefined = undefined
  for (let j = 0; j < wordsWithEnergy.length; j++) {
    const w = wordsWithEnergy[j]
    temp += w.probability
    if (r < temp) {
      word = w
      w.energy++
      break
    }
  }
  if (word === undefined) {
    throw new Error('failed to get word')
  }
  normalizeProbabilities()
  return {
    text: word.text,
    japanese: word.japanese,
    filename: word.filename
  }
}

export function resetWords() {
  wordsWithEnergy.forEach(function(w){
    w.energy = defaultEnergy
    w.probability = 1 / wordsWithEnergy.length
  })
}