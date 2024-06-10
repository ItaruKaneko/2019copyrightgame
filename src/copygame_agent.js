// copygame01_03
// 2019/6/16
// copygame_agentのクラスの定義
// 初期化
// gb 長さ600の配列
// copygame01_03 ルール
// エージェントは2タイプ
//  type 1 creator
//    エネルギーが 10 以上なら、マークする
//  type 2 consumer
//   マークされている場合
//     エネルギーが増える
//     エネルギー分ジャンプする
//   マークされていない場合
//      マークする
//   高さ0以外の場合
//     自由運動する
// 前のバージョンからの変更
//   game_cell を構造体に修正
// 

// class definition : game_cell
// ゲームのます目の定義
function game_cell(x1,y1) {
  this.x=x1;
  this.y=y1;
  this.st = 0; // status = 0
  this.mark = 0;    // copy game agent marking here
}

game_cell.prototype.show=function(){
   // rect を描画
    // y 座標を整数に変換してから描画する    
    var x1,y1;
    x1 = Math.floor(this.x);
    y1 = Math.floor(this.y);
    c1.beginPath();
    c1.rect(x1,y1, 5,1*5*this.st);
    if(this.st==0){
      c1.fillStyle = 'rgb(255,255,128)'; // 黄色
    }else{
      c1.fillStyle = 'rgb(255,128,0)'; // 黄色
    }
    c1.fill();

}

// (ix,iy)は (x.y)の整数値
// 初期化により x,vx はランダムに
// 10<x<580, -25<x<25
// y, vyは0に初期化

function copygame_agent(gb1,ty1) {
  this.gb = gb1;    // game board
  this.type = ty1;    // agent type = 2
  this.x = Math.random() * 570 + 10;
  this.y = 0;
  this.vx = Math.random() * 50 - 25;
  this.vy = 0;
  this.ep = 20;  //  energy point = 0
  this.ix=Math.floor(this.x);
  this.iy=Math.floor(this.y);
}

// move : 移動
// 一番上（iy=0) 
//   gb[this.ix].st=0 なら gb[this.ix].stを1に
//   gb[this.ix].st=1 なら
// y座標を1, vyを10にする

copygame_agent.prototype.progress = function() {
  this.ix=Math.floor(this.x);
  this.iy=Math.floor(this.y);
  if(this.type==1){
    // creator type
    if(this.iy==0){
      if(this.ep>10){
        // まずエネルギーを減らす
        this.ep = this.ep - 10;
        // もし 地面で ip>10
        var rr=Math.random();
        if (rr < 0.1){
          this.gb[this.ix].st = 1;
          this.gb[this.ix].mark=this;
        }
      }
    }
  }
  else if(this.type==2) {
    // consumer type
    if(this.ix < 0 || this.ix>=600) {
       console("heelo")
    }
    if (this.x < 10  || this.x > 580) {
      this.vx = - this.vx;
    }  
    if (this.iy==0) {
      if (this.gb[this.ix].st==1) {
        // マーク済の位置にあれば、ジャンプ
        this.y = 1;
        this.vy = this.ep; // エネルギー分ジャンプ
        this.gb[this.ix].st = 0;
        this.ep = this.ep + 1;  // エネルギー増加
      }
      else {
        // マークがなければそのままの位置でマーク

      }
    }
  }
}
copygame_agent.prototype.move = function() {
  // gravity
  if (this.y > 0) {
    this.vy -= 1;
  }
  // motion
  this.x += this.vx;
  if (this.x <0) this.x=0;
  if (this.x>=600) this.x=599;
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

