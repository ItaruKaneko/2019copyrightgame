// プログラム全体で使用する変数
var c1;        // 2d 描画コンテキスト
var copygame_agents;     // 全 copygame_agent を格納する配列
var number_of_copygame_agents; // copygame_agent の数
var gb;        // game bord, sixze 600

// copygame_agent クラスを使ったアニメーションの本体
// 毎秒 30 回実行する関数
function tick1() {
  // 描画領域をいったんクリアする
  c1.clearRect(0, 0, 600, 600);

  // 20個の円についてのループ
  var n;
  for (n = 0; n < number_of_copygame_agents; n++) {
    // copygame_agent を移動し、描画する
    copygame_agents[n].move();
    copygame_agents[n].show();     
  }
}

// 初期化
function draw_canvas() {
  // c1 = 2d コンテキスト、を用意する
  var canv1 = document.getElementById('canvas_tag_1');
  c1 = canv1.getContext('2d');
  if (!canv1 || !canv1.getContext) {
      return false;
  }
  gb = new Array(600); 
  // game bord のクリア
  for (var n=0; n<600; n++) {
    gb[n]=0;
  }
  // copygame_agent数の設定
  number_of_copygame_agents = 20;

  // 全copygame_agentを格納する配列の準備
  copygame_agents = new Array(number_of_copygame_agents);  
  // 全copygame_agentの初期化
  for (var n = 0; n < number_of_copygame_agents; n++) {
    copygame_agents[n]=new copygame_agent(gb);
  }

  // tick1 を毎秒 30 回実行するための設定
  setInterval(tick1, 33);
}