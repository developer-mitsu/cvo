<!-- title=Sass -->

## sassとは？

**Syntactically Awesome Style Sheet** の略。

構文的に素晴らしいスタイルシート。

CSSの構文を拡張し、よりメンテナンサブルに、より効率的に記述することができます。
<div class="page"/>


# sassの導入
sassはcssにコンパイル(変換)して使用するため、コンパイルできる環境を構築する必要があります。以下の手順に従い、各自OSごとにセットアップしましょう。

## ①Rubyのインストール
sassをインストールする前に、rubyというプログラミング言語をインストールします。sassはrubyで動いています。


- Windowsの場合

    以下のサイトへアクセスし、「WITH DEVKIT」内太字の安定版をダウンロードして下さい。

    https://rubyinstaller.org/downloads/

    「Rubyの実行ファイルへ環境PATHを設定する」にチェックし、インストールしましょう。

- Macの場合

    MacにはRubyが標準装備されています。次のフェイズに移りましょう。


## ②Sassのインストール

- Windowsの場合

    「Start Command Prompt with Ruby」をスタートメニューから探し、起動します。
    

    起動後、「gem install sass」と入力し、Enterキーを押下します。「1 gem installed」と表示されればインストールは完了です。

- Macの場合

    Controlキー+Spaceキー、もしくはCommandキー+Spaceキーを同時に押し、terminalと入力しEnterキーを押します。
    
    ターミナルが起動したら、「gem install sass」と入力し、Enterキーを押下します。「1 gem installed」と表示されればインストールは完了です。。 

## ③sassのコンパイル方法


まずは作業用フォルダを作成しましょう。いつものようにフォルダを一つ作成し、さらにscssフォルダを作成します。
作成したSCSSフォルダの中に、main.scssという名前でファイルを作成しましょう。構造が以下のようになっているか確認して下さい。

作業用フォルダ----scss
　　　　　　　 

ターミナルを起動し、cdコマンドを用いて作業用フォルダへ移動します。

以下のように入力しましょう。

```bash
> sass sass/style.scss:css/style.css

> sass コンパイルするファイル:出力するファイル
```


また、コードの変更を監視し、自動でコンパイルするには以下のコマンドを実行します。

```
> sass --watch scss:css

> sass --watch {sassのファイル名orディレクトリ名}:{cssのファイル名orディレクトリ名}
```


実際に挙動を確認してみましょう。
<div class="page"/>


# sassの文法

sassには、インデントを多用するsass記法と、cssとよく似たscss記法がある。以下では、より普及しているScss記法について解説する。

## ・入れ子にする
css
```scss
ul {
    padding: 10%;
    background-color: gray;
}

ul li {
    background-color: white;
    padding: 5px;
}

ul li a {
    text-decoration: none;
}

ul li:hover {
    background-color:black;
}

ul li:hover a {
    color: white;
}
```
<div class="page"/>


scss
```scss
ul {
    padding: 10%;
    background-color: gray;

    li {
        padding: 5px;

        a {
            text-decoration: none;
        }

        // 疑似要素等に関しては、&記号を用いる。
        // ここでは、&記号はliを指す。
        &:hover {
            background-color: black;
            a {
                color: white;
            }
        }  
    }
}
```
<div class="page"/>

## ・変数
変数を定義できる。ただし、変数を使用する箇所より上で定義すること。

css
```css
body {
    background-color: #00aa00;
}

.sample {
    color: #00aa00;
}
```

scss
```scss
$base-color: #00aa00;

body {
    background-color: $base-color;
}

.sample {
    color: $base-color;
}
```
<div class="page"/>


## ・mixin

css
```css
.sample1 {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    background-color: yellow;
}

.sample2 {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    background-color: red;
}

.sample3 {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    background-color: green;
}
```

scss
```scss
@mixin sample {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
}

.sample1 {
    @include sample;
    background-color: yellow;
}

.sample2 {
    @include sample;
    background-color: red;
}

.sample3 {
    @include sample;
    background-color: green;
}
```

また、mixinには引数を与えることもできる。
```scss
@mixin sample($color) {
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    background-color: $color;
}

.sample1 {
    @include sample(yellow);
}

.sample2 {
    @include sample(red);
}

.sample3 {
    @include sample(green);
}
```


@extendを用いて、定義済みのスタイルを継承することができる。
```scss
.origin {
    margin-top: 20px;
    padding: 15px;
    background-color: #000;
    p {
        letter-spacing: 5px;
    }
}

.another {
    @extend .origin;
    background-color: red;
}
```

```css
.origin {
    margin-top: 20px;
    padding: 15px;
    background-color: #000;
}

.origin p, .another p {
    letter-spacing: 5px;
}

.another {
    background-color: red;
}
```

メディアクエリをSassを用いて記述すると便利。
```scss
$pc: 1024px; // PC
$tab: 680px; // タブレット
$sp: 480px;  // スマホ

@mixin pc {
  @media (max-width: ($pc)) {
    @content;
  }
}
@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}
@mixin sp {
  @media (max-width: ($sp)) {
    @content;
  }
}
```