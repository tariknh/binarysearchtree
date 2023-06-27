class Node{
    constructor(data){
        this.left = null
        this.right = null
        this.data = data
    }
}
class Tree{
    constructor(array){
        this.root = buildTree(array)
    }
    insert(data, node){
        if(data == node.data){
            return console.log(data + " already exists!")
        }
        if(node === null){
            return new Node(data)
        }
        if(data < node.data){
            this.insert(data, node.left)
            if(node.left == undefined){
                return node.left = new Node(data)
            }
        }
        if(data > node.data){
            if(node.right == undefined){
                return node.right = new Node(data)
            }
            this.insert(data, node.right)
        }
        return node
    }
    find(data,node){
        if(data == node.data){
            return console.log(node.data + " was found!")
        }
        if(data < node.data){
            if(node.left == undefined){
                if(node.right == undefined){
                    return console.log("Not found")
                }
                this.find(data,node.right)
            }
            this.find(data,node.left)
        }
        if(data > node.data){ 
            if(node.right == undefined){
                if(node.left == undefined){
                    return console.log("Not found")
                }
                this.find(data,node.left)
            }
            this.find(data,node.right)
        }
        return node
    }
    levelOrder(node){
        let traversed = []
        let queue = []

        traverse(node)
        function traverse(node){
            if (node == null) return
            traversed.push(node.data)
            queue.push(node?.left)
            queue.push(node?.right)
            while(queue.length){
                
            }
            return node
        }
    }
}
function buildTree(array){
    if(array.length == 0){
        return null
    }



    let halfSort = Math.floor((array.length / 2))
    let rootNode = new Node(array[halfSort])

    let left = array.slice(0, halfSort)
    let right = array.slice(halfSort+1, array.length)

    rootNode.left = buildTree(left)
    rootNode.right = buildTree(right)
    return rootNode
}

//const test = new Tree(sortedArray)
//console.log(test)
//console.log(test)



function mergeSort(arr){
    if (arr.length <= 1){
        return arr
    }
    const middle = Math.floor(arr.length / 2)
    const left = arr.slice(0,middle)
    const right = arr.slice(middle)
    return merge(mergeSort(left),mergeSort(right))
}

function merge(arr1,arr2){
    const newArr = []
    while(arr1.length && arr2.length){
        if (arr1[0] < arr2[0]){
            newArr.push(arr1.shift())
        }else{
            newArr.push(arr2.shift())
        }
    }
    return newArr.concat(arr1.slice()).concat(arr2.slice())
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


const sortedArray = mergeSort([2,4,6,8,10,12,14,16])
let n = sortedArray.length
const test = new Tree(sortedArray)
test.insert(3, test.root)
test.insert(5, test.root)

test.find(200, test.root)
console.log(test.levelOrder(test.root))
console.log(prettyPrint(test.root))
