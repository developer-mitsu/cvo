<!-- title=DOM基礎 -->

## DOMとは？
DOMとは、ブラウザがhtmlを解釈したものです。
この概念を理解し、用意された様々な機能群(オブジェクト・メソッド・プロパティ)を使用することで、ページ上の要素や、ブラウザの機能などを自在に操ることが可能となります。

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

<!-- - ノードウォーキング

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

<div style="page-break-before:always"></div> -->