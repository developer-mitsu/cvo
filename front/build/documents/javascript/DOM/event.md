<!-- title=イベントについて -->

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

