
let data = [] 

export default function search(index , keyword) {
       
    const regexp = new RegExp(keyword)
    
    if (index === undefined) {

    } else {
        index.forEach(item => {
            if (item.children) {
                search(item.children, keyword)
            } else if (item.title.search(regexp) !== -1) {
                let existFlg = false
                for (var i of data) {
                    if (i['title'] == item.title){
                        existFlg = true
                    }
                }
                if (!existFlg) {
                    let record = {
                        title: item.title,
                        // path: item.parent.match(/public\/(.*)/)[1]+'/'+item.file
                    }
                    data.push(record)
                }
                
                
            } 
        })
    
        console.log (keyword, data)
        return data    
    }
    
}