// copygame02_01
// 2019/6/18
// 概要 海賊版業者の導入
// copygame_agentのクラスの定義
// 初期化
// gb 長さ600の配列
//   use count を使用することに 1 増加する
//   5 回に達したら消去
// copygame02_01 ルール
// エージェントは2タイプ
//  type 1 creator
//    ep 初期値 = 4
//    1%の確率で行う。
//    エネルギーが 2 以上なら自分をauthorとして記録する
//    エネルギーは 1 減らす
//  type 2 consumer
//   Author が登録されている場合
//     author のエネルギーを +1 増加する
//     ジャンプする
//   マークされていない場合
//     自由運する
//  type 3 pirates
//     もしst=1ならインデックスを自分に書き換える
//     エネルギーは減らさない
// 

// class definition : game_cell
// ゲームのます目の定義
function game_cell(x1,y1) {
  this.x=x1;
  this.y=y1;
  this.st = 0; // status = 0
  this.author = null;    // copy game agent marking here
  this.ucount = 0;  // use count
}

game_cell.prototype.show=function(){
   // rect を描画
    // y 座標を整数に変換してから描画する    
    var x1,y1,h1;
    x1 = Math.floor(this.x);
    y1 = Math.floor(this.y);
    c1.beginPath();
    h1 = this.st*5;
    if(this.st==1){
      c1.fillStyle = 'rgb(0,0,128)'; // 黄色
    }else{
      c1.fillStyle = 'rgb(128,255,255)'; // 水色
    }
    c1.rect(x1,350, 5,5);
    c1.fill();
}

game_cell.prototype.use=function(){
  // このゲームセルのコンテンツを使う
  author1 = this.author;
  author1.ep = author1.ep + 1;
  this.ucount = this.ucount + 1;
  if (this.ucount >=5) {
    this.author = null;
    this.st = 0;
    this.ucount=0;
  }

}

// (ix,iy)は (x.y)の整数値
// 初期化により x,vx はランダムに
// 10<x<580, -25<x<25
// y, vyは0に初期化

function copygame_agent(aid1,gb1,ty1) {
  this.aid=aid1;
  this.gb = gb1;    // game board
  this.type = ty1;    // agent type = 2
  this.x = Math.random() * 570 + 10;
  this.y = 0;
  this.vx = Math.random() * 50 - 25;
  this.vy = 0;
  this.ep = 4;  //  energy point = 0
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
    if(this.iy==0 && this.ep>0){
      // エネルギーが残っており、iy=0の場合
      var rr=Math.random();
      if (rr < 0.02){
        // 2% の確率でエネルギーを減らす
        this.ep = this.ep - 1;
      }
      if (rr < 0.01){
        // 1%の確率で作品を残す
        this.gb[this.ix].st = 1;
        this.gb[this.ix].author=this;
      }
    }
  }
  else if(this.type==2) {
    if (this.iy==0) {
      if (this.gb[this.ix].st==1) {
        var author1;
        // マーク済の位置にあれば、ジャンプ
        this.y = 1;
        this.vy = this.ep; // エネルギー分ジャンプ
        
        gb[this.ix].use();
        // author1 = gb[this.ix].author;
        // author1.ep = author1.ep + 1;
        this.ep = this.ep + 1;
      }
      else {
        // マークがなければそのままの位置でマーク

      }
    }
  }
  else if(this.type==4){
    // pirate type
    if (this.iy==0) {
      if (this.gb[this.ix].st==1) {
        var author1;
        // マーク済の位置にあれば、マークを自分に変更
        gb[this.ix].author = this;
      }
      else {
        // マークがなければそのままの位置でマーク

      }
    }
  }

}
copygame_agent.prototype.move = function() {
  // consumer type
  if(this.ix < 0 || this.ix>=600) {
    console("heelo")
  }
  if (this.x < 10  || this.x > 580) {
      this.vx = - this.vx;
  }    // gravity
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
    c1.arc(x1,330-y1, this.ep, 0, Math.PI * 2);
    if(this.type==1){
      c1.fillStyle = 'rgb(0,255,128)'; // 紺色
    }else if (this.type == 2){
      c1.fillStyle = 'rgb(0,128,255)'; // 紺色
    }else{
      c1.fillStyle = 'rgb(255,128,128)'; // 紺色
    }
    c1.shadowColor = 'rgb(0,0,0)';   // 影
    c1.shadowOffsetX = 5;
    c1.shadowOffsetY = 5;
    c1.shadowBlur = 5;
    c1.fill();
}

