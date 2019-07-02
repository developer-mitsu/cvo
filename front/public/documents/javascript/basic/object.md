<!-- title=オブジェクト -->

連想配列と構文は同じ、しかし、意味が異なる

- 連想配列...個々の要素が主体
- オブジェクト...個々の要素はオブジェクトを表現するための属性情報に過ぎない

オブジェクトは、以下のように書く。

```js
var object = {
    name: "Taro Yamada",
    email: "sample@sample.sample",
    job: "student",
    age: 20,
}
```

オブジェクトを構成するそれぞれのデータ(ここではname, age等)は**プロパティ**という。

なお、プロパティを呼び出す際は以下のように記述する。二種類の方法が存在する。

```js
//ドット演算子
object.age
//=> 20

//ブラケット公文
object['age']
//=> 20
```

また、Javascriptのオブジェクトでは、プロパティに関数を設定することも出来る。
関数が設定されたプロパティのことを、**メソッド**という。

```js
var object = {
    name: "Taro Yamada",
    email: "sample@sample.sample",
    job: "student",
    age: 20,
    introduce: function(){
        var sentense = "My name is " + name + " I am " + age + " years old."
        return sentense
    }
}
```

メソッドを実行する際は、以下のようにする。

```js
object.introduce()
```


<!-- ## 留意点

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
``` -->
