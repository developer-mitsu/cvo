<!-- title=DOMまとめ -->

## DOM概要
- 要素・属性・テキストなど→ノード
- DOMでは、htmlドキュメントをノードで構成されたツリー構造として解釈する。
- DOMとは、このノードを抽出したり、追加したり、置き換えたり、削除するためのAPI(関数やオブジェクトの集合)

## DOM操作基礎

### 要素の取得

- idより取得

```javascript:sample.js
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
