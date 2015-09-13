//  配置
var config = {
  // 地图设置
  blocksNum: 3,
  // block设置
  blockSize: 50, // 方块大小 单位px
  blockMargin: 5, // 边距 单位px
  blockOptionStyles: { //方块的风格
    'background-color': '#CCC',
  },
  black: '●',
  white: '○'
};

var state =  {
  isWhite: true,
  cheesemanCount: 0
};

var eles = {
  game: document.getElementById('game'), // 放置游戏内容的元素
  blocks: null // 放置方块元素
};

//////////////// 文档载入完成后执行
function load() {
  settingUpGame(eles.game, config);

  for (var i = 0; i < config.blocksNum; i++) {
    for (var j = 0; j < config.blocksNum; j++) {
      var block = createBlock(config.blockSize,
                              config.blockMargin,
                              config.blockOptionStyles);
      block.position = [i, j];
      game.appendChild(block);
    }
  }

  eles.blocks = eles.game.childNodes;

}
window.onload = load;

/////// 封装后的工具方法

//初始化一些配置
function settingUpGame(gameEle, config) {

  var blockSpaceWidth = // 每个方块占用的空间
    (config.blockMargin * 2) + config.blockSize;
  var gamePanelWidth = // 每个方块占用的空间乘以方块数量
    blockSpaceWidth * config.blocksNum;
  // 防止因为屏幕缩小导致游戏方块被推下
  gameEle.style['min-width'] = gamePanelWidth + 'px';
  // 下推元素以排列成3*3的网格
  gameEle.style.width = gamePanelWidth + 'px';
  // 切掉多余的元素
  gameEle.style.height = gamePanelWidth + 'px';
}

// 创建放置游戏用的方块
function createBlock(size, margin, styles) {
  var block = document.createElement('div');

  // 设置block的样式
  block.className = 'block';
  block.style.height = size + 'px';
  block.style.width = size + 'px';
  block.style.margin = margin + 'px';
  block.style['line-height'] = size + 'px';
  extend(block.style, styles);

  // 设置功能
  block.onclick = dropCheeseman;
  block.onmouseenter = onMouseEnterBlock;
  block.onmouseleave = onMouseLeaveBlock;

  return block;
}

// 放置棋子事件
function dropCheeseman() {
  // 判断是否已有棋子
  if(this.innerText){
    alert('此处已放置棋子');
    return;
  }

  // 放置棋子
  if(state.isWhite){
    this.innerText = config.white;
  } else {
    this.innerText = config.black;
  }

  // 判断胜负
  if(isWin(this)){
    var thisCheeseman = state.isWhite? '白旗':'黑棋' ;
    alert(thisCheeseman + '获胜！');
    resetGame();
    return;
  }

  // 判断是否超出棋盘
  state.cheesemanCount++;
  isMaxCheesemanCount();

  // 切换黑白棋子
  state.isWhite = !state.isWhite;
}

function onMouseEnterBlock(){
  this.style['background-color'] = '#EEE';
}
function onMouseLeaveBlock(){
  this.style['background-color'] = config.blockOptionStyles['background-color'];
}

// 判断胜负
function isWin(that){
  var cheeseman = that.innerText;
  if (match3x3Pattern(cheeseman)){
      return true;
  }
  return false;
}

// 临时算法,如果有时间可以改进 穷举8种情况
function match3x3Pattern(cheeseman){
  // 测试是否为3x3
  if(config.blocksNum!= 3){
    alert('此数量的block不能使用此算法');
    resetGame();
  }

  var winPosition = [
    [[0,0], [0,1], [0,2]], // 匹配横向的三种情况
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],

    [[0,0], [1,0], [2,0]], // 匹配纵向的三种情况
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],

    [[0,0], [1,1], [2,2]], // 匹配对角线的两种情况
    [[0,2], [1,1], [2,0]]
  ];
  for(var posIndex in winPosition){
    var posArray = winPosition[posIndex];

    if(match3Position(cheeseman, posArray)){
      return true;
    }
  }
  return false;
}

// 匹配三个位置 example: matchPosition(black, [[1,1], [1,2], [1,3]])
function match3Position(cheeseman, poses){
  var mp = matchPosition;
  if (mp(cheeseman, poses[0])
      & mp(cheeseman, poses[1])
      & mp(cheeseman, poses[2])){
        return true;
  }
  return false;
}

// 匹配单个位置
function matchPosition(cheeseman, pos){
  var block = eles.blocks[getCheeseIndex(pos)];

  return block.innerText === cheeseman;
}

// 根据坐标算出棋子的位置
function getCheeseIndex(pos){
  var index = pos[0] * config.blocksNum + pos[1];
  return index + 1; // offset 1
}

// 判断棋子是否已满
function isMaxCheesemanCount(){
  var maxCheesemanCount = config.blocksNum * config.blocksNum;
  state.maxCheesemanCount = maxCheesemanCount;
  if(state.cheesemanCount >= maxCheesemanCount){
    alert('棋盘已满，游戏结束');
    resetGame();
  }
}

function resetGame(){
  for(i=0; i<state.maxCheesemanCount; i++){
    eles.blocks[i+1].innerText = '';
  }
  state.cheesemanCount = 0;
  state.isWhite = true;
}

////// helper方法

// 简单实现用于扩展目标对象的属性的函数
function extend(target, options) {
  for (var name in options) {
    target[name] = options[name];
  }
  return target;
}
