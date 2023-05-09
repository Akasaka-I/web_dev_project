function createFruitOrBomb() {
    // 隨機生成一個數，用於判斷生成水果還是炸彈
    const rand = Math.random();
  
    // 如果生成的數小於 0.6，則生成水果
    if (rand < 0.6) {
      const fruit = document.createElement('div');
      fruit.className = 'fruit';
      fruit.style.top = '90%';
      fruit.style.left = `${Math.random() * 90}%`;
      fruit.dataset.type = 'fruit';
      gameContainer.appendChild(fruit);
    }
    // 否則生成炸彈
    else {
      const bomb = document.createElement('div');
      bomb.className = 'bomb';
      bomb.style.top = '90%';
      bomb.style.left = `${Math.random() * 90}%`;
      bomb.dataset.type = 'bomb';
      gameContainer.appendChild(bomb);
    }
}

function cutFruit(event) {
    const element = event.target;
    const type = element.dataset.type;
  
    // 如果被點擊的是水果，則計分，播放音效，然後將水果移除
    if (type === 'fruit') {
      score += 1;
      scoreEl.textContent = score;
      playSound('swoosh');
      element.remove();
    }
    // 否則如果被點擊的是炸彈，則遊戲結束
    else if (type === 'bomb') {
      endGame();
    }
}

function gameLoop() {
    // 隨機生成一個數，用於控制水果和炸彈的生成速度
    const rand = Math.random();
  
    // 如果生成的數小於 0.5，則創建水果和炸彈
    if (rand <0.5) {
        createFruitOrBomb();
        }
        
        // 移動水果和炸彈
        const fruits = document.querySelectorAll('.fruit');
        const bombs = document.querySelectorAll('.bomb');
        moveElements(fruits);
        moveElements(bombs);
        
        // 如果忍者與水果或炸彈重疊，則處理切中事件
        const ninjaRect = ninja.getBoundingClientRect();
        fruits.forEach((fruit) => {
            const fruitRect = fruit.getBoundingClientRect();
            if (rectsOverlap(ninjaRect, fruitRect)) {
                cutFruit({ target: fruit });
            }
        });
        bombs.forEach((bomb) => {
            const bombRect = bomb.getBoundingClientRect();
            if (rectsOverlap(ninjaRect, bombRect)) {
                cutFruit({ target: bomb });
            }
        });
        
        // 如果遊戲未結束，則循環運行遊戲
        if (!gameOver) {
            requestAnimationFrame(gameLoop);
        }
}
  