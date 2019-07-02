<!-- title=JavaScriptまとめ -->

# 基礎文法

##  変数

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

# オブジェクト
連想配列と構文は同じ、しかし、意味が異なる

- 連想配列...個々の要素が主体
- オブジェクト...個々の要素はオブジェクトを表現するための属性情報に過ぎない

## 留意点

- 原則インスタンス化して使用する。

```js
var 変数名 = new オブジェクト名(引数)
変数名.プロパティ名
変数名.メソッド名(引数)
```
- 勿論クラスメソッド、クラスプロパティも存在(= 静的メソッド/静的プロパティ)

```js
オブジェクト名.プロパティ名
オブジェクト名.メソッド名(引数)
```

- String, Array, Date等組み込みオブジェクト

<div style="page-break-before:always"></div>

# 関数
## 概要
- 戻り値あるときreturn必須
- 戻り値無い際は不要、undefinedを返す
- return以降は実行されない
- 関数名はなるたけcamelCase
- 呼び出し時に()は省略不可
- return直後で改行しない


## 定義方法
### function命令

```js
function 関数名(引数, ...) {
    //処理内容
    return 戻り値;
}
```
##### 留意点
- function命令において、コンパイルのタイミングで関数が登録されている。
コード上は宣言前に実行されていても、問題なく動作する。

### 関数リテラル
```js
let 変数名 = function(仮引数, ...) {
    //処理内容
    return 戻り値;
}
```
##### 留意点
- 関数リテラル(無名関数/匿名関数)を定義し、変数に代入している。
- function命令と異なり、実行時に評価される。(定義文より先に呼び出したらだめ)

<div style="page-break-before:always"></div>


### アロー関数(es6)

- 基本形
```javascript
let 変数名 = (仮引数, ...) => {
    //処理内容
    return 戻り値;   
};
```

- 本体が1文のみの場合
```js
let 変数名 = (仮引数, ...) => //処理内容(return命令も省略可) 
```

- さらに、引数が一つのみ
```js
let 変数名 = 仮引数 => //処理内容

//引数がない場合は、()の省略は不可
let 変数名 = () => //処理内容
```

## スコープ

- var省略→グローバル変数とみなされる
- ローカル変数は関数の先頭で宣言する(巻き上げを誘発する)

<div style="page-break-before:always"></div>

# DOM

## DOM概要
- 要素・属性・テキストなど→ノード
- DOMでは、htmlドキュメントをノードで構成されたツリー構造として解釈する。
- DOMとは、このノードを抽出したり、追加したり、置き換えたり、削除するためのAPI(関数やオブジェクトの集合)

## DOM操作基礎

### 要素の取得

- idより取得

```javascript
document.getElementById(id)
// id: 取得したい要素のid
```

- タグ名より取得

```js
document.getElementsByTagName(name)
// name: タグ名
// 複数合致する可能性あり、戻り値はHTMLCollectionオブジェクト
// 複数合致した場合はitem(i)メソッド・namedItem(name)メソッドで取り出す。
```

- name属性より取得

```js
document.getElementsByName(name)
// name: name属性の値
// 複数合致する可能性あり、戻り値はNodeListオブジェクト(HTMLCollectionとほぼ同じ)
```

- class属性より取得

```js
document.getElementsByClassName(clazz)
//clazz: クラス名(複数指定可)

// (例)
document.getElementsByClassName(class1 class2)
//この場合、class1,class2両方が指定された要素を取得する。
```

- selector式より取得

```js
document.querySelector(selector)
document.querySelectorAll(selector)
// selector: セレクター式
```
※querySelectorメソッドはget◯◯メソッドより低速。複雑な時だけ使用する。

- ノードウォーキング

あるノードを起点として、相対的に取得する。
コードに無駄がなくなり、パフォーマンス向上を見込める。

```js
var parent = document.getElementByID('parent');
var children = parent.childNodes;
//childrenにはNodeListオブジェクトが入るが、
//その中には、要素ノードだけでなく、改行文字などのテキストノードも入っている。
//nodeTypeプロパティによって必要なノードを絞る。

var child1 = parent.firstChild;
//最初の子ノード取得

var child2 = parent.lastChild;
//最後の子ノード取得

var child3 = parent.firstElementChild;
//最初の子要素取得(要素ノードに限定)

var child4 = parent.lastElementChild;
//最後の子要素取得(要素ノードに限定)

```

<div style="page-break-before:always"></div>


## イベント

### イベント一覧
|カテゴリー|イベント|内容|
|:---|:---|:---|
|読み込み|abort|画像読み込み中断時|
||load|ページ・画像読み込み完了時|
||unload|ページ移動時|
|マウス|click|クリックしたとき|
||mousedown|マウスボタン押下時|
||mouseup|マウスボタンを離した時|
||mousemove|マウスポインター移動時|
||mouseover|マウスポインターが要素に乗った時|
||mouseout|マウスポインターが要素から外れた時|
||mouseenter|マウスポインターが要素に乗った時|
||mouseleave|マウスポインターが要素から外れた時|
|キーボード|keydown|キーボードを押した時|
|keypress|キーを押している間||
||keyup|キーから指が離れた時|
|フォーム|change|内容が変更された時|
||reset|リセットボタンを押した時|
||submit|サブミットボタンを押した時|
|その他|focus|フォーカスされたとき|
||scroll|スクロールされたとき|

#### 補足
mouseover/mouseoutは子要素に出入りしたときも発生する。

<div style="page-break-before:always"></div>

## イベント処理一覧

### イベントハンドラー
1. 属性として宣言

    ```html
    <img src="image.jpg" alt="画像" onload="eyecatchLoaded()">
    ```

    ```js
    function eyecatchLoaded() {
        window.alert('アイキャッチのロードが完了しました。');
    }
    ```
    - イベントハンドラーは「on+イベント名」で表現する。


1. 特定要素のプロパティとして宣言

    ```html
    <button id="btn" type="button">ボタン</button>
    ```

    ```js
    // ページがロードされたら実行される。
    window.onload = function() {
        //ボタンがクリックされると実行される。
        document.getElementById('btn').onclick = function() {
            window.alert('ボタンが押下されました。');
        }
    }
    ```
    - 原則onload配下で使用


### イベントリスナー

1. addEventListenerを用いる

```js
//対象の要素.addEventListener(イベントの種類, 処理, イベントの方向)

//onload→画像のロードも待つ。
//DOMContentLoaded→画像のロードは待たない。

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('btn').addEventListener('click', function(){
        window.alert('クリックされました。');
    }, false);
}, false);
```

<div style="page-break-before:always"></div>

## 属性の取得

1. プロパティで取得
    ```html
    <a href="https://www.google.co.jp/">google</a>
    ```

    ```js
    anker = document.getElementsByTagName('a')[0];
    url = anker.href //取得
    anker.href = "https://www.yahoo.co.jp/"

    //殆どのプロパティは属性名と同じ。
    //(ただしcssのclassはclassName)
    ```

1. メソッドを用いて取得

    ```js
    anker.getAttribute('href');
    anker.setAttribute('href','https://www.yahoo.co.jp/');
    ```
## テキストの取得

innerHTMLプロパティ(HTMLはエスケープされない)

```js
document.getElementById('link').innerHTML = 'テキスト';
```

textContentプロパティ(HTMLはエスケープされる)

```js
document.getElementById('link').textContent = 'テキスト';
```

特殊な理由がなければtextContentプロパティを使用。
クロスサイトスクリプティング(XSS)脆弱性を防ぐため。

- XSS脆弱性とは... 管理者の意図しないコードがユーザーの環境で実行されてしまう可能性があること。

## フォームの値の取得

```html
<input id="form" name="form" type="text" />
<input id="submit_btn" name="subnmit_btn" type="button" value="送信" />
```

```js
document.getElementById('submit_btn').addEventListener('click', function(){
    var name = document.getElementById('form');
    window.alert(name.value)
}, false);

//入力値はvalueプロパティを用いて取得する。値の設定時も同様。
```

## ノードの追加・削除

```html
<ul id="list">
    <li>aaaaa</li>
    <li>bbbbb</li>
    <li>ccccc</li>
    <li>ddddd</li>
</ul>

    <input id="add_btn" type="button" value="push!">
    <input id="rm_btn" type="button" value="delete!">

```

```js
document.addEventListener('DOMContentLoaded', function(){
        
        count1 = 0;
        list = document.getElementById('list')

        document.getElementById('add_btn').addEventListene('click', function(){
            ++count1;

            //①createElementメソッドを用いてli要素ノードを作成。
            new_li = document.createElement('li');

            //②setAttributeメソッドを用いてnew_liにidを追加
            new_li.setAttribute('id', 'li'+count1);

            //③createTextNodeメソッドを用いてnew_liのテキスト用意(この段階では①のli要素とテキストノードはバラバラ)
            text = document.createTextNode(`${count1}つめのli要素`);

            //④appendChildメソッドを用いて、①で作成したli要素ノードに③で作成したテキストノードをli要素の子ノードとして追加
            new_li.appendChild(text);

            //⑤appendChildメソッドを用いて、ulの最後の子ノードとして、完成したli要素を追加
            list.appendChild(new_li);
        }, false);

        document.getElementById('rm_btn').addEventListener('click', function(){
            --count1;

            //removeChildメソッドを用いてlistの最後の子要素を削除
            //(引数として削除するノードを渡す。)
            list.removeChild(list.lastChild);
        }, false);

    }, false);
```

# js特有の注意点

## スコープ

以下のように、他言語と異なり、var宣言を用いて変数を宣言した場合、{}はブロックスコープを作らない。

```js
{
  var sample1 = "aaa";
}

if(true){
  var sample2 = "bbb";
}

console.log(sample1); //=> "aaa"
console.log(sample2); //=> "bbb"
```

但し、関数定義の{}においてはブロックスコープが適用される。
よって、スコープを指定したい際に即時関数をしようするテクニックがある。

```js
(function(){

  var a = "aaa";

})();

console.log(a); //=> ?
```

ES6ではlet・constを用いるとブロックをスコープの作成が可能。

```js
{
  let sample1 = "aaa";
}

if(true){
  const sample2 = "bbb";
}

console.log(sample1); //=> ?
console.log(sample2); //=> ?
```




## 変数の巻き上げ

下のコードを読み、挙動を想像してみよう。
```js
var arg = "global";
 
function sample() {
    console.log(arg);    //①
    var arg = "local";
    console.log(arg);    //②
}
 
sample();
```

①、②ではどのようなログが出力されると予想するだろうか。
おそらく、①ではglobal、②ではlocalが出力されるように直感では予想できるだろう。
実際に試し、挙動を確認してみよう。

おそらく、①はundefined, ②はlocalとなったはず。
(ちなみに、let構文で宣言した際の挙動も見てみよう。①でundefinedではなく明示的にエラーが出力される。)

この挙動は、上記のコードが以下のコードと同様の文脈を持つことにより起きる。

```js
var arg = "global";
 
function sample() {
    var arg;
    console.log(arg);    //①
    arg = "local";
    console.log(arg);    //②
}
 
sample();
```

つまり、JavaScriptにおいて、

**関数内で宣言されたローカル変数は、すべてその関数の先頭で宣言されたものとしてみなされる。**
(但し、宣言のみで、値の代入は行われない。)

よって、変数argは、sample関数定義の先頭で宣言されたと見なされ、①、②ともにローカル変数argを参照する形になってしまう。
この性質を、**巻き上げ**というので覚えておこう。


巻き上げに困らされないよう、**関数内のローカル変数は、関数の先頭で宣言する**癖をつけよう。

## オブジェクト指向

他の言語にもオブジェクト指向の概念が存在する。
しかし、javascriptにおけるオブジェクト指向は多言語に比べて若干クセが有る。
オブジェクト指向の概念を抑えながら、js特有の仕様を身につけよう。

```js
var Vehicle = function(type, name, numWheels) {
	this.type = type;
	this.name = name;
	this.numWheels = numWheels;
}

var vehicle1 = new Vehicle('不明', '乗り物A', 5);
```

上のようなコードを突然出されても...といった感じだと思う。
基本的に、オブジェクト指向は以下の手順に従って行う。

①まず、**クラス**[1]という設計書を作成する。
この後生み出されるインスタンスがどのような特性、データを持っているのかをその中で定義できる。

②クラスを元に**インスタンス**[2]を作成する。
その際、クラスの設計にしたがってデータを渡したり、何らかの処理を行うことができる。この定義はあらかじめクラスの中に書いておく(**コンストラクタ**[3])。

踏まえた上で、もう一度見てみよう。

```js
//以下のように単純な関数と区別するため、大文字で始めよう。
//[3]
var Vehicle = function(type, name, numWheels) {
	this.type = type;//プロパティ
	this.name = name;
	this.numWheels = numWheels;
//ここでのthisはインスタンスそのものを指す。
}

//以下のようにインスタンスを作成し使用する。
var vehicle1 = new Vehicle('不明', '乗り物A', 1);//[2]
var vehicle2 = new Vehicle('不明', '乗り物B', 2);
var vehicle3 = new Vehicle('不明', '乗り物C', 10);

//実際にインスタンスを参照してみよう。
console.log(vehicle1);

//インスタンスのメンバを参照することができる。
console.log(vehicle1.numWheels);
```

クラスの


## this

JavaScriptにはthisという概念が存在する。
以下のコードをブラウザで実行し、thisの正体を確認しよう。

```js
function sample() {
    console.log(this)
}
```

結果を見てわかるように、thisをそのまま呼び出すと、グローバルオブジェクト(ブラウザの場合はwindowオブジェクト)が呼び出される。

それでは、以下の場合はどうだろう。ブラウザで確認してみよう。

```js
var sample = function() {
    console.log(this)
}

//sample
var object1 = {
    sample: sample
}

object1.sample();
```

この場合、sampleと結びついた






# 補足
