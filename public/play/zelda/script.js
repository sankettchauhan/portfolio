

// Portfolio port: fixed-size stage (room + HUD), scaled up to fit the
// window in whole-ish steps and centered by style.css.
const STAGE_W = 520
const STAGE_H = 520
kaboom({
  global: true,
  width: STAGE_W,
  height: STAGE_H,
  scale: Math.max(0.5, Math.floor(Math.min(innerWidth / STAGE_W, innerHeight / STAGE_H) * 4) / 4),
  clearColor: [0,0,0,1]
})

const MOVE_SPEED = 120

loadRoot('sprites/')
loadSprite('link-going-left', 'link-going-left.png')
loadSprite('link-going-right', 'link-going-right.png')
loadSprite('link-going-down', 'link-going-down.png')
loadSprite('link-going-up', 'link-going-up.png')
loadSprite('left-wall', 'left-wall.png')
loadSprite('top-wall', 'top-wall.png')
loadSprite('bottom-wall', 'bottom-wall.png')
loadSprite('right-wall', 'right-wall.png')
loadSprite('bottom-left-wall', 'bottom-left-wall.png')
loadSprite('bottom-right-wall', 'bottom-right-wall.png')
loadSprite('top-left-wall', 'top-left-wall.png')
loadSprite('top-right-wall', 'top-right-wall.jpg')
loadSprite('top-door', 'top-door.png')
loadSprite('fire-pot', 'fire-pot.png')
loadSprite('left-door', 'left-door.png')
loadSprite('lanterns', 'lanterns.png')
loadSprite('slicer', 'slicer.png')
loadSprite('skeletor', 'skeletor.png')
loadSprite('kaboom', 'kaboom.png')
loadSprite('stairs', 'stairs.png')
loadSprite('bg', 'bg.png')

scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  
  const maps = [
    [
      'ycc)cc^ccw',
      'a        b',
      'a      * b',
      'a    (   b',
      '%        b',
      'a    (   b',
      'a   *    b',
      'a        b',
      'xdd)dd)ddz',
    ],
    [
      'yccccccccw',
      'a        b',
      ')        )',
      'a        b',
      'a        b',
      'a    $   b',
      ')   }    )',
      'a        b',
      'xddddddddz',
    ]

  ]

  const levelCfg = {
    width: 48,
    height: 48,
    'a': [sprite('left-wall'), solid(), 'wall'],
    'b': [sprite('right-wall'), solid(), 'wall'],
    'c': [sprite('top-wall'), solid(), 'wall'],
    'd': [sprite('bottom-wall'), solid(), 'wall'],
    'w': [sprite('top-right-wall'), solid(), 'wall'],
    'x': [sprite('bottom-left-wall'), solid(), 'wall'],
    'y': [sprite('top-left-wall'), solid(), 'wall'],
    'z': [sprite('bottom-right-wall'), solid(), 'wall'],
    '%': [sprite('left-door'), solid(), 'door'],
    '^': [sprite('top-door'), 'next-level'],
    '$': [sprite('stairs'), 'next-level'],
    '*': [sprite('slicer'), 'slicer', { dir: -1 }, 'dangerous'],
    '}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid()],
    '(': [sprite('fire-pot'), solid()],
  }
  addLevel(maps[level], levelCfg)

  add([sprite('bg'), layer('bg')])

  const scoreLabel = add([
    text('0'),
    pos(400, 450),
    layer('ui'),
    {
      value: score,
    },
    scale(2)
  ])

  add([text('level ' + parseInt(level + 1)), pos(400, 485), scale(2)])
  
  const player = add([
    sprite('link-going-right'),
    pos(5, 190),
    {
      // right by default
      dir: vec2(1,0),
    }
  ])

// to solve the problem of player going through solid things
  player.action(() => {
    player.resolve()
  })

  player.overlaps('next-level', () => {
    go("game", {
      level: (level + 1) % maps.length,
      score: scoreLabel.value
    })
  })

  keyDown('left', () => {
    // to change the sprite of player to moving left
    player.changeSprite('link-going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1,0)
  })

  keyDown('right', () => {
    player.changeSprite('link-going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1,0)
  })

  keyDown('up', () => {
    player.changeSprite('link-going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0,-1)
  })

  keyDown('down', () => {
    player.changeSprite('link-going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0,1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }

  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })

  player.collides('door', (d) => {
    destroy(d)
  })

  collides('kaboom', 'dangerous', (k, s) => {
    camShake(4)
    // wait(1, () => {
    //   destroy(k)
    // })
    destroy(s)
    scoreLabel.value++
    scoreLabel.text = scoreLabel.value
  })

  const SLICER_SPEED = 100

  action('slicer', (s) => {
    s.move(s.dir * SLICER_SPEED, 0)
  })

// when the slicer collides wtih wall - its direction reverses
  collides('slicer', 'wall', (s) => {
    s.dir = -s.dir
  })

  const SKELETOR_SPEED = 60

  action('skeletor', (s) => {
    s.move(0, s.dir * SKELETOR_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = - s.dir
      s.timer = rand(5)
    }
  })

  collides('skeletor', 'wall', (s) => {
    s.dir = -s.dir
  })

  player.overlaps('dangerous', () => {
    go('lose', { score: scoreLabel.value})
  })
})

scene("lose", ({ score }) => {
  add([text("GAME OVER", 32), origin('center'), pos(width() / 2, height() / 2 - 60), color(1, 0.35, 0.35)])
  add([text("score " + score, 20), origin('center'), pos(width() / 2, height() / 2)])
  const hint = add([text("press space to play again", 10), origin('center'), pos(width() / 2, height() / 2 + 60)])
  const shownAt = time()
// Ignore presses in the first 0.6s so the jump/kaboom that ended the run
// doesn't instantly restart it.
keyPress('space', () => { if (time() - shownAt > 0.6) go("game", { level: 0, score: 0 }) })
  loop(0.5, () => { hint.hidden = !hint.hidden })
})


start("game", { level: 0, score: 0})