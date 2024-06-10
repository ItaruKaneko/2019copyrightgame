// copygame_agentのクラスの定義
// 初期化
// gb 長さ600の配列
// copygame01_01 ルール
// エージェントが 高さ0の位置の場合のみ状態が変換する
//   マークされている場合
//     エネルギーが増える
//     エネルギー分ジャンプする
//   マークされていない場合
//      マークする
//   高さ0以外の場合
//     自由運動する



// (ix,iy)は (x.y)の整数値
// 初期化により x,vx はランダムに
// 10<x<580, -25<x<25
// y, vyは0に初期化

function copygame_agent(gb1) {
  this.gb = gb1;    // game board
  this.x = Math.random() * 570 + 10;
  this.y = 0;
  this.vx = Math.random() * 50 - 25;
  this.vy = 0;
  this.ep = 0;  //  energy point = 0
  this.ix=Math.floor(this.x);
  this.iy=Math.floor(this.y);
}

// move : 移動
// 一番上（iy=0) 
//   gb[this.ix]=0 なら gb[this.ix]を1に
//   gb[this.ix]=1 なら
// y座標を1, vyを10にする

copygame_agent.prototype.move = function() {
  this.ix=Math.floor(this.x);
  this.iy=Math.floor(this.y);
//  if (this.iy==0) this.gb[this.ix]=0;
  if (this.x < 10  || this.x > 580) {
    this.vx = - this.vx;
  }

  if (this.iy==0) {
    if (this.gb[this.ix]==1) {
      // マーク済の位置にあれば、ジャンプ
      this.y = 1;
      this.vy = this.ep; // エネルギー分ジャンプ
      this.gb[this.ix] = 0;
      this.ep = this.ep + 1;  // エネルギー増加
    }
    else {
      // マークがなければそのままの位置でマーク
      this.gb[this.ix] = 1;
    }
  }
  // gravity
  if (this.y > 0) {
    this.vy -= 1;
  }
  // motion
  this.x += this.vx;
  this.y += this.vy;
  // collision with ground
  if (this.y<0) {
    this.y=0;
    this.vy=0;
  }
}

// show : 表示
copygame_agent.prototype.show = function() {
  // 円を描画
    // y 座標を整数に変換してから描画する    
    var x1,y1;
    x1 = Math.floor(this.x);
    y1 = Math.floor(this.y);
  
    
    c1.beginPath();
    c1.arc(x1,y1, 10, 0, Math.PI * 2);
    c1.fillStyle = 'rgb(0,128,255)'; // 紺色
    c1.shadowColor = 'rgb(0,0,0)';   // 影
    c1.shadowOffsetX = 5;
    c1.shadowOffsetY = 5;
    c1.shadowBlur = 5;
    c1.fill();
}

