const fs = require('fs')
const path = require("path")
const dir = './public/documents'; //引数が無いときはカレントディレクトリを対象とする

const execSync = require('child_process').execSync;
execSync('yarn run dsstore');

var walk = function(p, callback){
 var results = [];
  
 fs.readdir(p, function (err, files) {
  if (err) throw err;
 
  var pending = files.length; 
  if (!pending) return callback(null, results); //全てのファイル取得が終わったらコールバックを呼び出す
  
  files.map(function (file) { //リスト取得
   return path.join(p, file);
  }).filter(function (file) {
   if(fs.statSync(file).isDirectory()) walk(file, function(err, res) { //ディレクトリだったら再帰
    results.push({name:path.basename(file), children:res, type: 'DIR'}); //子ディレクトリをchildrenインデックス配下に保存
    if (!--pending) callback(null, results);
    });
   return fs.statSync(file).isFile();
  }).forEach(function (file) {
    results.push(
        {
            parent: path.dirname(file),
            file: path.basename(file),
            title: extractTitle(fs.readFileSync(file, 'utf-8')),
            type: 'FILE'
        }
    );
    
    if (!--pending) callback(null, results);

  });
  
 });
}
 
walk(dir, function(err, results) {
 if (err) throw err;
 var data = {name:'フロントエンド', children:results};
 console.log(JSON.stringify(data)); //一覧出力
});

// ファイルからタイトル抽出
// タイトル
function extractTitle(data) {
    var firstline = data.match(/^.*$/m)[0];
    
    var title = firstline.match(/<!-- title=(.*) -->/)
    return title?title[1]:""
    
}