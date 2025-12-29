export default function fuzzySearch(string: string, check : string){
        string = string.toUpperCase()
        check = check.toUpperCase()
        let found = false
        let old_positon = -1
        for(let i = 0; i < check.length; i++){
            const position = string.indexOf(check[i])
            if(position > -1 && position > old_positon){
                found = true
                old_positon = position
            }
            else{
                found = false
                break
            }
        }
        return found
    };