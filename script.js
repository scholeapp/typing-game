const words = [
  {text: 'event', japanese: 'イベント'},
  {text: 'if', japanese: 'もし'},
  {text: 'else', japanese: 'その他'},
  {text: 'pass', japanese: 'パス'},
  {text: 'break', japanese: '壊す'},
  {text: 'continue', japanese: '続く'},
  {text: 'integer', japanese: '整数'},
  {text: 'variable', japanese: '変数'},
  {text: 'function', japanese: '関数'},
  {text: 'define', japanese: '定義する'},
  {text: 'list', japanese: 'リスト'},
  {text: 'dictionary', japanese: '辞書'},
  {text: 'while', japanese: '〜の間'},
  {text: 'type', japanese: 'タイプ'},
  {text: 'undefined', japanese: '定義されてない'},
  {text: 'default', japanese: 'デフォルト'},
  {text: 'class', japanese: 'クラス'},
  {text: 'method', japanese: 'メソッド'},
  {text: 'get', japanese: '取る'},
  {text: 'set', japanese: 'セット'},
  {text: 'super', japanese: 'スーパー'},
  {text: 'True', japanese: '真'},
  {text: 'False', japanese: '偽'},
  {text: 'append', japanese: '追加する'},
  {text: 'item', japanese: 'アイテム'},
  {text: 'string', japanese: 'ひも・文字列'},
  {text: 'insert', japanese: '差し込む、はめ込む'},
  {text: 'key', japanese: '鍵・キー'},
  {text: 'value', japanese: '値・価値'},
  {text: 'index', japanese: '索引・順番の数'},
  {text: 'remove', japanese: '削除する・取り除く'},
  {text: 'count', japanese: '数える'},
  {text: 'sort', japanese: '並べ替える'},
  {text: 'reverse', japanese: '逆順にする'},
  {text: 'pop', japanese: '飛び出す・飛び出させる'},
  {text: 'print', japanese: '印刷する'},
  {text: 'input', japanese: '入力'},
  {text: 'exception', japanese: '例外'},
  {text: 'error', japanese: 'エラー'},
  {text: 'trace', japanese: '追跡する、さかのぼって調べる'},
  {text: 'read', japanese: '読む'},
  {text: 'write', japanese: '書く'},
  {text: 'load', japanese: ' 読み込む'},
  {text: 'module', japanese: 'モジュール'},
  {text: 'import', japanese: '輸入・インポート'},
  {text: 'name', japanese: '名前'},
  {text: 'open', japanese: '開く'},
  {text: 'close', japanese: '閉じる'},
  {text: 'comment', japanese: 'コメント'},
  {text: 'data', japanese: 'データ'},
  {text: 'loop', japanese: 'ループ・輪・繰り返し'},
  {text: 'pair', japanese: 'ペア'},
  {text: 'random', japanese: 'ランダム'},
  {text: 'choice', japanese: '選択'}
]

const MAX_VISIBLE_WORDS = 1

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")

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

const pellets = []

ctx.font = "24px monospace";

const lasers = []
const enemies = []
let score = 0

document.addEventListener("keydown", keyDownHandler, false)

function sortEnemies(e1, e2) {
  return e1.y - e2.y
}

function keyDownHandler(event) {
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
      target: enemy.id
    })
    enemy.text = enemy.text.slice(1)
    enemy.focus = true
    return
  } 
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
    ctx.fillStyle = enemy.focus ? "#DD9500" : "#0095DD"
    ctx.font = "24px monospace";
    const textMetrics = ctx.measureText(enemy.text)
    const enemyWidth = textMetrics.width
    if (enemyWidth + padding > enemy.x) {
      // 文字が画面からはみ出るのを防止
      enemy.x = enemyWidth + padding
    }
    ctx.fillText(enemy.visibleText, enemy.x, enemy.y);  
    ctx.font = "12px monospace";
    ctx.fillText(enemy.japanese,    enemy.x, enemy.y + enemyApproxHeight + 10);  
    enemy.y += enemy.dy
    if (enemy.y > canvas.height && enemy.text.length > 0) {
      enemy.visible = false
      gameover()

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
  const dy = Math.max(Math.random(), 0.02)

  ctx.font = "24px monospace";
  const textMetricsEn = ctx.measureText(word.text)
  ctx.font = "12px monospace";
  const textMetricsJa = ctx.measureText(word.japanese)
  const enemyWidth = Math.max(textMetricsEn.width, textMetricsJa.width)
  if (enemyWidth + padding > x) {
    // 文字が画面からはみ出るのを防止
    x = enemyWidth + padding
  }
  
  enemies.push(
    {id: enemyId,
      x: x,
      y: 0,
      text: word.text,
      dy: dy,
      visibleText: word.text,
      visible: true,
      japanese: word.japanese,
      focus: false,
    }
  )
  readAloud(word.text)
  enemyId++
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function readAloud(text) {
  const msg = new SpeechSynthesisUtterance(text)
  msg.pitch = 1
  window.speechSynthesis.speak(msg)
}

function drawScore() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095DD"
  ctx.textAlign = "start";
  ctx.fillText(`スコア: ${score}`, 8, 20)
}

function gameover() {
  alert("GAME OVER. スコア: " + score.toString())
  document.location.reload()
}


function draw() {
  clear()
  drawTower()
  drawPellets()
  drawEnemies()
  detectCollision()
  addEnemyIfNeccesary()
  drawScore()
  requestAnimationFrame(draw)
}
draw()
