<!-- title=スコープ -->

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
