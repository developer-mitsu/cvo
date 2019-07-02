<!-- title=Yarn/Webpack -->

## yarn
javascriptのパッケージマネージャー。
javascript(node.js)で作成されたパッケージやツールを導入し、管理することができる。
パッケージ管理には他にもnpmがあるが、使用方法はほぼ変わらないので、より高速なyarnを習得しよう。

## webpack
散乱する複数のjavascriptモジュール(ファイル)を一つにまとめるためのツール。
詳しく学習することで、画像やCSSをまとめることもできる。
webpackもyarnで管理されるパッケージの一つなので、まずはyarnの使用方法から見ていこう。

# yarnの導入

**mac**

①xcodeをインストール

https://itunes.apple.com/jp/app/xcode/id497799835

②以下のコマンドをターミナルより入力し、コマンドラインツールをインストールする。

```
xcode-select --install
```

③以下のサイトにアクセスし、指示に従いhomebrewをインストール。

https://brew.sh/index_ja.html

##### ※homebrewは、macにおけるパッケージのインストールをサポートするパッケージ管理ツール。

④以下のコマンドをターミナルで入力し、yarnをインストール。
```
brew install yarn
```

**windows**

①以下のサイトから各自のOSに合ったNode.jsをインストールする。

https://nodejs.org/en/

②以下のサイトからインストーラーをダウンロードし、インストール。

https://yarnpkg.com/lang/ja/docs/install/#windows-stable



# yarnの使用方法

まずは、作業用のディレクトリを作ろう。

次に、ターミナルで作成したディレクトリまでcdコマンドで移動し、
以下のコマンドを入力してみよう。

```
yarn init
```

すると、以下のように、対話形式でyarnの初期設定が始まる。

()内はデフォルトの値。
特に変更せず、enterキーを押して進もう。

```
❯ yarn init
yarn init v1.7.0
question name (practice): 
question version (1.0.0): 
question description: 
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
✨  Done in 23.35s.
```

initが完了すると、package.jsonが作成される。

```js
// package.json

{
  "name": "practice",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

package.jsonが作成されたことを確認したら、実際にパッケージを追加してみよう。

今回は例として、jQueryを追加する。
追加する際はaddコマンドを使用。

```
yarn add jquery
```

実行すると以下のようになる。

```
❯ yarn add jquery
yarn add v1.7.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...

success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ jquery@3.3.1
info All dependencies
└─ jquery@3.3.1
✨  Done in 2.52s.
```

追加が完了したらpackage.jsonを見てみよう。
dependenciesにjQueryが追加されているはず。

```js
{
  "name": "practice",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "jquery": "^3.3.1",
  },
}
```

実際に導入したライブラリはnode_modulesディレクトリの中にインストールされる。
確認してみよう。




# webpack

webpackとは何かについて知る前に、従来のjavascriptのファイルの読み込みについて考えて見よう。
例えばjQueryを用いた開発を行う際、以下のようにscriptタグを用いてファイルを読み込む。

```html
<script src="jquery-3.1.1.min.js">
<script src="main.js">
```

この際、jqueryライブラリ→自作のスクリプトファイルの順番で読み込んでいるが、この順番を逆にした場合、正しく実行できない。
main.js内でjqueryを使用しているため、jqueryのライブラリを先に読み込まない限り、jqueryを参照出来ず、エラーとなってしまう。
また、ファイルの数が多くなるにつれ、考慮しなければならない依存関係は増えていく。

この問題を解決するのがモジュールバンドラー。モジュールバンドラーを使用することで、以下の恩恵が受けられる。

**・依存関係の解決**

どのファイルがどのファイルを参照しているのか自動で判断し、一つのファイルにまとめてくれる(バンドル)。
HTML側では一つのファイルを読み込めば良いので、順番を意識する必要がなくなる。

**・転送の効率化**

一つのファイルにリソースをまとめる事ができるので、リクエストの回数を減らす事ができる。
リクエスト回数を抑えることで、転送を効率化し、表示速度の改善が見込める。




## モジュール

既述のように、モジュールバンドラーとは、モジュール(ファイル)をバンドルするのがその主要な目的であり、機能である。
実際にモジュールバンドラ(webpack)を使用する前に、モジュールの基礎について理解しよう。

javascriptにおいて、モジュールで管理するための仕様が最近まで標準化されておらず(!)、複数存在する。
但し、仕様策定により、ES6(ECMAScript2015)からモジュール仕様が標準化されたため、基本的にはその記法を用いてモジュールを使用する。

<hr>

```js
// lib.js
const hello = 'Hello'

// 外部で使用したいメンバにexportをつける。
export let arg = 'Module'

export function greet(arg) {
  console.log(hello+ ', ' +arg);
}
```

別モジュールのメンバを指定してインポート。
但し、exportされていないメンバは参照できない。

```js
import { arg, greet } from './lib.js';

以下のようにエクスポートされていないメンバにアクセスしようとするとエラー発生。
import { arg, greet, hello } from './lib.js';

greet(arg);
```

<hr>

また、仮にexportされているメンバでも、importしなければ使用できない。

```js
import { greet } from './lib.js';

console.log(args);
```

<hr>


exportされているすべてのメンバをimportする際は、以下のように記述。
但し、その際はインポートするモジュールに名前をつける必要がある。

```js
import * as lib from './lib.js';

lib.greet(lib.arg);
```

<hr>

また、メンバそれぞれに別名をつけることもできる。

```js
import { arg as a, greet as g } from './lib.js';

g(a);
```




## webpack
実際にwebpackを使用してみよう。

```
yarn add webpack webpack-cli --dev
```

package.jsonにwebpack, webpack-cliのバージョンが記録される。

```
~1.1.2 = 1.1.2 <= version < 1.2.0
~1.1 = 1.1.x
~1 = 1.x

^1.2.3 := 1.2.3 <= version < 2.0.0
^0.2.3 := 0.2.3 <= version < 0.3.0
^0.0.3 := 0.0.3 <= version < 0.0.4
```

参照の順番は次のようになっていることを確認しよう。
**index.html(呼び出すhtmlファイル)→index.js(モジュールを参照しているjsファイル)→ライブラリ**

webpackの設定ファイルを作成しよう。
プロジェクトディレクトリ直下に、webpack.config.jsという名前でファイルを用意しよう。

デフォルトでは、エントリーポイントはindex.js、出力先はmain.jsになっている。
以下のように設定してみよう。

```js
module.exports = {
  // エントリーポイントエントリー(バンドルを行う際にモジュールの解析を開始する場所)
  entry: "./src/index.js",
  output: {
    // バンドル後のファイル名を記述
    filename: "main.js",
    // バンドル先のファイルパスを記述
    //__dirnameには、現在実行中のソースコード(webpack.config.js)が格納されているディレクトリの絶対パスが格納されている。outputパスには絶対パスを指定しなければならないため、以下のように記述しよう。
    path: __dirname + "/dist"
  }
}
```


以下のコマンドを実行し、
バンドルされたファイルがdist内に入っていることを確認しよう。

```js
// webpack.config.jsを設定ファイルとし、webpackを実行する。
yarn run webpack --config webpack.config.js
```

上記のコマンドでwebpackの実行は可能ではあるが、長くて手が疲れる。
自作のコマンドを定義してみよう。

package.jsonに以下の記述を追加してみよう。

```json
{
  ...(省略)
  "scripts": {
	  "build": "webpack --config webpack.config.js"
  },
}
```

上のように記述することで、以下のコマンドでビルドすることが可能となる。

```js
yarn build
```

短くはなったが、webpackを実行する際に毎回コマンドを打ち込まなければならず、面倒。
コードの変更を監視し、自動でビルドするため、webpack-dev-serverを導入しよう(part2)。

```js
yarn add webpack-dev-server --dev
```

webpack.config.jsに以下の記述を追加しよう。

```js
module.exports = {
  // ...(略)
  devServer: {
    // サーバーの基底パスを記述
    contentBase: './dist'
  },
}
```

以下のコマンドでサーバーを起動する事ができる。

```js
yarn run webpack-dev-server
```

これもコマンドを定義しておこう。
openオプションを追加することで、サーバー起動時にブラウザを自動で起動する・

```js
//package.json
{
//...(略)
"script": {
    "build": "webpack --config webpack.config.js",
    "start": "webpack-dev-server --open"
  }
}
```

これで以下のコマンドでサーバーが起動し、ブラウザが開く。

```js
yarn start
```

**※注意**
開発サーバーのビルド結果はファイルとして出力されない。
メモリ上に出力されるので、ファイルとして出力する場合にはbuildコマンドを使用しよう。
(buildコマンドを用い、webpack本体の--watchオプションで監視することもできる。こちらは、ビルド結果がファイルに出力される。)

<hr/>

**mode**

webpackには、productionモードとdevelopmentモードの二種類が存在する。
ソースマップ(ビルド前後のコードの場所をマッピングしたファイル。エラー発生時ビルド前のコード内のエラー発生箇所を確認する事ができる。)の有無などに違いがある。

- production
  
  改行や空白・コメントなどが削除され、ファイルサイズが圧縮される。
  ソースマップは作成されない。

- development

  改行や空白・コメントなどは削除されず、ソースマップが作成される。

webpack.config.js内でmodeを指定しよう。(指定しないと警告が出る。)

```js
//webpack.config.js

module.exports = {
  mode:'production',
  // ...(略)
}
```



# 様々なローダー

webpackの第一目的は、jsのモジュール化とそのバンドルである。
しかし、webpackが凄いのは、jsだけでなくcssや画像といったリソースもモジュール化し、バンドルしてしまうところにある。
ただし、そのためには、それぞれのリソースをモジュール化するための**ローダー**が必要。
いろいろなローダーについて見ていこう。

**※おまけではなく、むしろここからが本番です**

## css-loader/style-loader

まずはyarn addから。

```
yarn add webpack webpack-cli webpack-dev-server css-loader style-loader --dev
```

webpack.config.js内にmoduleパラメータを追加しよう。

```js
module.exports = {
  // ...(略)
  module: {
    rules: [
      {
        //正規表現でモジュールを適用するファイルを指定
        test: /\.css$/,
        use: [
          //使用するmoduleの指定(逆順で実行される！)
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```

dist内にindex.html、srcディレクトリ内に適当なcssファイルを用意し、バンドルを実行してみよう。
サーバーを起動し、検証ツールで確認してみよう。
headタグ内にstyleタグが動的に挿入されていることが確認できる。

<hr/>

<div class="page"></div>


