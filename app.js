var config = {
  // 地图设置
  blocksNum: 3,
  // block设置
  blockSize: 50, // 方块大小 单位px
  blockMargin: 5, // 边距 单位px
  blockOptionStyles: {  //方块的风格
    'background-color': '#DDD',
  }
};

var eles = {
  game: document.getElementById('game'), // 放置游戏内容的元素
  blocks: null // 放置方块元素
};

// 文档载入完成后执行
function load() {
  settingUpGame(eles.game, config);

  var block = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block2 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block3 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block4 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block5 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block6 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block7 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block8 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block9 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  var block1 = createBlock(config.blockSize,config.blockMargin, config.blockOptionStyles);
  game.appendChild(block);
  game.appendChild(block2);
  game.appendChild(block3);
  game.appendChild(block4);
  game.appendChild(block5);
  game.appendChild(block6);
  game.appendChild(block7);
  game.appendChild(block8);
  game.appendChild(block9);
  game.appendChild(block1);
}

window.onload = load;

/////// 封装后的工具方法

//初始化一些配置
function settingUpGame(gameEle, config){

  var blockSpaceWidth =   // 每个方块占用的空间
          (config.blockMargin * 2) + config.blockSize;
  var gamePanelWidth =          // 每个方块占用的空间乘以方块数量
          blockSpaceWidth * config.blocksNum;
  // 防止因为屏幕缩小导致游戏方块被推下
  gameEle.style['min-width'] = gamePanelWidth + 'px';
  // 下推元素以排列成3*3的网格
  gameEle.style.width =  gamePanelWidth + 'px';
  // 切掉多余的元素
  gameEle.style.height =  gamePanelWidth + 'px';
}

// 创建放置游戏用的方块
function createBlock(size, margin, styles) {
  var block = document.createElement('div');

  // 设置类
  block.className = 'block';
  // 设置block的样式
  block.style.height = size + 'px';
  block.style.width = size + 'px';
  block.style.margin = margin + 'px';
  extend(block.style, styles);

  return block;
}

////// helper方法

// 简单实现用于扩展目标对象的属性的函数
function extend(target, options) {
  for (var name in options) {
    target[name] = options[name];
  }
  return target;
}
