import { Enemy, Pellet } from "./types"
import { getRandomInt, readAloud } from "./utils"
import { words } from "./words"

const MAX_VISIBLE_WORDS = 1

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

const padding = 3

const towerWidth = 12
const towerHeight = 12
const towerX = (canvas.width - towerWidth) / 2
const towerY = canvas.height - towerHeight

let enemyId = 0
const enemyApproxHeight = 14

const pelletRadiusX = 5
const pelletRadiusY = 9
const pelletVelocity = 5
const pelletAngVelocity = 0.2


const pellets: Pellet[]  = []

let level = 1
let isOpening = true
let isGameover = false
const enemies: Enemy[] = []
const minDy = 0.8

const tryAgainButtonWidth = 100
const tryAgainButtonHeight = 40
const tryAgainButtonX = (canvas.width - tryAgainButtonWidth ) / 2
const tryAgainButtonY = 160

let score = 0
let correctTypes = 0
let startTime = new Date()
let typos = 0


document.addEventListener("keydown", keyDownHandler, false)

document.addEventListener('click', clickHandler, false)

function sortEnemies(e1: Enemy, e2: Enemy) {
  return e1.y - e2.y
}

function keyDownHandler(event: KeyboardEvent) {
  let enemy = undefined
  const sortedEnemies = enemies.sort(sortEnemies)
  for (let i = 0; i < enemies.length; i++) {
    const currentEnemy = sortedEnemies[i]
    if (!currentEnemy.visible || currentEnemy.text.length === 0) {
      continue
    }
    if (currentEnemy.focus) {
      enemy = currentEnemy
      break
    }
    if (currentEnemy.text[0].toLocaleLowerCase() === event.key) {
      enemy = currentEnemy
    }
  }
  if (enemy === undefined) {
    return 
  }
  if (enemy.text[0] === undefined) {
    console.log(enemy)
    console.log(enemy.text)
  }
  if (enemy.text[0].toLocaleLowerCase() === event.key) {
    pellets.push({
      x: (canvas.width - (pelletRadiusX + pelletRadiusY) / 2) / 2,
      y: towerY - (pelletRadiusX + pelletRadiusY) / 2 / 2,
      rotation: getRandomInt(180),
      visible: true,
      target: enemy.id,
      key: event.key
    })
    enemy.text = enemy.text.slice(1)
    enemy.focus = true
    return
  } 
}

function clickHandler(event: MouseEvent) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  if (!isGameover) {
    return
  }
  if (x > tryAgainButtonX
    && x < tryAgainButtonX + tryAgainButtonWidth
    && y > tryAgainButtonY
    && y < tryAgainButtonY + tryAgainButtonHeight
    ) {
      isGameover = false
      console.log('clicked')
      return
    }
    console.log('not clicked')

}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawTower() {
  ctx.beginPath()
  ctx.rect(towerX, towerY, towerWidth, towerHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function drawPellets() {
  for (let i = 0; i < pellets.length; i++) {
    const pellet = pellets[i]
    if (!pellet.visible) {
      continue
    }
    const enemy = enemies.find(function(e) {
      return e.id === pellet.target
    })
    if (enemy === undefined) {
      console.warn(pellet, 'does not have corresponding target enemy')
      continue
    }
    const textMetrics = ctx.measureText(enemy.text)
    const enemyWidth = textMetrics.width
    const dx = (enemy.x - enemyWidth / 2) - canvas.width / 2
    const dy = (enemy.y + enemyApproxHeight / 2) - (canvas.height - towerHeight / 2)
    const vx = pelletVelocity * dx / Math.sqrt(dx ** 2 + dy ** 2)
    const vy = pelletVelocity * dy / Math.sqrt(dx ** 2 + dy ** 2)
    if (!pellet.visible) {
      continue
    }
    ctx.beginPath()
    ctx.ellipse(pellet.x, pellet.y, pelletRadiusX, pelletRadiusY, pellet.rotation, 0, 2 * Math.PI)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
    pellet.x += vx
    pellet.y += vy
    pellet.rotation += pelletAngVelocity
  }
}

function detectCollision() {
  for (let i = 0; i < pellets.length; i++) {
    const pellet = pellets[i]
    if (!pellet.visible) {
      continue
    }
    const enemy = enemies.find(function(enemy) {
      return enemy.id === pellet.target
    })
    if (enemy === undefined) {
      console.warn(pellet, 'does not have corresponding target enemy')
      continue
    }
    if (!enemy.visible|| !pellet.visible) {
      continue
    }
    if ( enemy.y + enemyApproxHeight > pellet.y &&
      enemy.y < pellet.y) {
        pellet.visible = false
        enemy.visibleText = enemy.visibleText.slice(1)
        if (enemy.visibleText.length === 0) {
          enemy.visible = false
          enemy.focus = false
          score++
        }
    }
  }
}

function drawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i]
    if (!enemy.visible) {
      continue
    }
    ctx.textAlign = "end";
    let visibility = 0
    if (enemy.y < 50) {
      visibility = 0
    }
    if (enemy.y < 200) {
      visibility = (enemy.y - 50) / 150
    } else if (enemy.y > 200) {
      visibility = 1.0
    }
    ctx.fillStyle = enemy.focus ? "#DD9500" : `rgba(0, 149, 221, ${visibility})`  // #0095DD == rgba(0, 149, 221, 100)
    ctx.font = "24px monospace";
    const enemyWidth = getWidth(enemy.text)
    if (enemyWidth + padding > enemy.x) {
      // 文字が画面からはみ出るのを防止
      enemy.x = enemyWidth + padding
    }
    ctx.fillText(enemy.visibleText, enemy.x, enemy.y);  
    ctx.font = "14px Ariel";
    const jaWidth = getWidth(enemy.japanese)
    if ( jaWidth + padding > enemy.x) {
      enemy.x = jaWidth + padding
    }
    ctx.fillStyle = enemy.focus ? "#DD9500" : '#0095DD'
    ctx.fillText(enemy.japanese,    enemy.x, enemy.y + enemyApproxHeight + 10);  
    enemy.y += enemy.dy

    // 最下部に到達したらゲームオーバー
    if (enemy.y > canvas.height && enemy.text.length > 0) {
      enemy.visible = false
      isGameover = true
    }
  }
}

function addEnemyIfNeccesary() {
  const visibleEnemies = enemies.filter(function(e) {
    return e.visible
  })
  if (visibleEnemies.length >= MAX_VISIBLE_WORDS) {
    return
  }
  const ix = getRandomInt(words.length - 1)
  let x = getRandomInt(canvas.width)
  const word = words[ix]
  const dy = Math.max(Math.random(), minDy)

  ctx.font = "24px monospace";
  const textMetricsEn = ctx.measureText(word.text)
  ctx.font = "12px monospace";
  const textMetricsJa = ctx.measureText(word.japanese)
  const enemyWidth = Math.max(textMetricsEn.width, textMetricsJa.width)
  if (enemyWidth + padding > x) {
    // 文字が画面からはみ出るのを防止
    x = enemyWidth + padding
  }

  const newEnemy: Enemy = {id: enemyId,
    x: x,
    y: 0,
    text: word.text,
    dy: dy,
    visibleText: word.text,
    visible: true,
    japanese: word.japanese,
    focus: false,
  }
  
  enemies.push(
    
  )
  for (let i = 0; i < 3; i++) {
    readAloud(word.text)
  }  
  enemyId++
}

function drawScore() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.textAlign = "start";
  ctx.fillText(`スコア: ${score}`, 8, 20)
}

function gameover() {
  if (!isGameover) {
    return
  }
  ctx.font = "24px Arial"
  const gameoverWidth = getWidth('GAME OVER')
  
  ctx.fillText('GAME OVER', (canvas.width - gameoverWidth) / 2, 120)
  ctx.font = "16px Arial"
  ctx.fillText(`スコア: ${score}`, 100, 250)
  ctx.roundRect(tryAgainButtonX, tryAgainButtonY, tryAgainButtonWidth, tryAgainButtonHeight, 8)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.fillStyle = "#FFF"
  const textMetrics = ctx.measureText('もういちど')
  const textWidth = textMetrics.width
  ctx.fillText('もういちど', (canvas.width - textWidth) / 2, tryAgainButtonY + 28)
}

function getWidth(text: string) {
  const textMetrics = ctx.measureText(text)
  const textWidth = textMetrics.width
  return textWidth
}

function drawOpening() {
  
}

function draw() {
  if (!isGameover) {
    clear()
    drawTower()
    drawPellets()
    drawEnemies()
    detectCollision()
    addEnemyIfNeccesary()
    drawScore()
    gameover()
  }
  
  requestAnimationFrame(draw)
}
draw()
