<!-- title=基礎文法 -->

##  変数

>変数とは？


旧型(~ES5)

```javascript
var x;
var x,y;
var z = 1;
```

ES6

```javascript
let x;
let x, y;
let z = 1;
```
<div style="page-break-before:always"></div>

## データ型

**基本型**
変数に値そのものが格納される

- 数値

整数・少数・8進数・16進数・2進数、様々なリテラルがある。
- 文字列('もしくは"で囲む)

```javascript
var str1 = "文字列"
var str2 = '文字列'
```

- 真偽(true, false)
- シンボル
- null/undefined
    - null...空の状態

    - undefined...そもそも定義されていない、値の存在を期待されていない
    - 空であることを意図的に明示したい時にnullを使用する

**参照型**
変数には値そのものではなく、値を格納しているメモリ上のアドレスが格納される

- 配列
- オブジェクト

```javascript
var sample = { a:1, b:2, c:3 };
console.log(sample.a); //結果：1
```
- 関数

<div style="page-break-before:always"></div>

## 演算子
### 前置演算・後置演算
```js
//前置演算
var x = 3;
var y = ++x; //y=4 加算してから代入

//後置演算
var x = 3;
var y = x++; //y=3 代入してから加算
```
### 定数の再代入
基本形は完全にエラー
参照型において注意(もっとも、定数ほぼ基本形だから留めとくくらいで)

```js
const data = [ 1, 2, 3 ];
data = [ 4, 5, 6 ]; //エラー
data[0] = 100; //エラーじゃない
```
### 比較演算子
- 等価演算子==では、データ型が異なってもどうにか等価と見なせないか演算する
- 同値演算子===では、データ型をしっかり確認する

### falsyな値
- 空文字列
- 0, NaN(not a number)
- null, undefined

### 演算子の優先順位
覚えない。複雑な条件式の場合は()をつける。

<div style="page-break-before:always"></div>

## 制御構文

### if文

```js
if (条件式1) {
//条件式1がtrueのとき実行
}else if (条件式2){
//条件式2がtrueのとき実行
}else if (条件式3){
//条件式3がtrueのとき実行
}
...
}else{
//すべての条件式がfalseのとき実行
}
```

### switch文

```js
switch(式) {
    case 値1:
        //式=値1のときに実行
        break;
    case 値2:
        //式=値2のときに実行
        break;
    ...
    default :
        case全てに合致しない時実行
}
```
breakをしないと合致した条件全て実行してしまうので、明示的に脱出する。

### while文・do while文

```js
while (条件式) {
//命令
}

do {
//命令
} while (条件式);
```
### for文

```js
for (初期化式; 継続条件; 増減式) {
//命令文
}

for (let x = 0; x < 10; x++) {
    console.log(x);
}
```
他にも、for ... in文、for ... of文など、
配列、連想配列の繰り返し処理に適した構文もある

<div style="page-break-before:always"></div>


