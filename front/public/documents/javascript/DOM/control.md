<!-- title=DOMの操作について -->

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