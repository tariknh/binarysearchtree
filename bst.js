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
        if(data == node?.data){
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
    remove(data,node){
        let foundNode
        findNodeChild(data,node)
        return "Removed!"
        function findNodeChild(data,node){

            if(data === node.right?.data){
                if(node.right.left ==null && node.right.right == null){
                    return node.right = null
                }
                const oldNodeLeftChild = node.right.left
                const replaceNode = node.right.right
                node.right = replaceNode
                replaceNode.left = oldNodeLeftChild
            }
            if(data === node.left?.data){
                if(node.left.left == null && node.left.right == null){
                    return node.left = null
                }
                const oldNodeLeftChild = node.left.left
                const replaceNode = node.left.right
                node.left = replaceNode
                replaceNode.left = oldNodeLeftChild
            }
            if(data < node.data){
                if(node.left == undefined){
                    if(node.right == undefined){
                        return console.log("Not found")
                    }
                    findNodeChild(data,node.right)
                }
                findNodeChild(data,node.left)
            }
            if(data > node.data){ 
                if(node.right == undefined){
                    if(node.left == undefined){
                        return console.log("Not found")
                    }
                    findNodeChild(data,node.left)
                }
                findNodeChild(data,node.right)
            }
            return
        }
    }
    find(data,node){
        let foundNode
        findNode(data,node)
        return foundNode
        function findNode(data,node){
            if(data === node.data){
                return foundNode = node
            }
            if(data < node.data){
                if(node.left == undefined){
                    if(node.right == undefined){
                        return console.log("Not found")
                    }
                    findNode(data,node.right)
                }
                findNode(data,node.left)
            }
            if(data > node.data){ 
                if(node.right == undefined){
                    if(node.left == undefined){
                        return console.log("Not found")
                    }
                    findNode(data,node.left)
                }
                findNode(data,node.right)
            }
            return
        }
    }
    inOrder(node){
        let result = []
        traversal(node)
        function traversal(node){
            if(node.left){
                traversal(node.left)
            }
            result.push(node.data)
            if(node.right){
                traversal(node.right)
            }
            return node
        }
        return result
    }
    postOrder(node){
        let result = []
        traversal(node)
        function traversal(node){
            if(node.left){
                traversal(node.left)
            }
            if(node.right){
                traversal(node.right)
            }
            result.push(node.data)
            return node
        }
        return result
    }
    preOrder(node){
        let result = []
        traversal(node)
        function traversal(node){
            result.push(node.data)
            if(node.left){
                traversal(node.left)
            }
            if(node.right){
                traversal(node.right)
            }
            return node
        }
        return result
    }
    depth(nodeToFind,treeNode){
        let depth = 0
        findNode(treeNode,0)
        return console.log("depth of node ", nodeToFind.data, "is ", depth)
        function findNode(node,number){
            if(nodeToFind == node){
                return depth = number
            }
            number++
            if(node.left){
                findNode(node.left,number)
            }
            if(node.right){
                findNode(node.right,number)
            }
            return
        }
    }
    height(node){
        let highestNumber = 0
        traversal(node,0)
        function traversal(node,number){
            if(!node?.left && !node?.right){
                if(number>highestNumber){
                    return highestNumber = number
                }else{
                    return
                }
            }
            number++
            if(node.left){
                traversal(node.left,number)
            }
            if(node.right){
                traversal(node.right,number)
            }
        }
        return highestNumber
    }
    isBalanced(node){
        if(node == null){
            return true
        }
        let lh = this.height(node.left)
        let rh = this.height(node.right)

        if(Math.abs(lh-rh) <= 1 && this.isBalanced(node.left) == true && this.isBalanced(node.right) == true){
            return true
        }
        return false
    }
    reBalance(node){
        let newTreeArr = mergeSort(this.preOrder(node))
        let newTree = new Tree(newTreeArr)
        return newTree
    }
    levelOrder(node){
        let result = []
        let queue = []
        queue.push(node)
        while(queue.length){
            let subArray = []
            const levelLength = queue.length
            for(let i=0; i<levelLength; i++){
                let currentNode = queue.shift()
                subArray.push(currentNode.data)
                if(currentNode.left){
                    queue.push(currentNode.left)
                }
                if(currentNode.right){
                    queue.push(currentNode.right)
                }
                
            }
            result.push(subArray)
        }

        return result
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


  const randomArray = Array(100).fill().map(() => Math.round(Math.random() * 40))
  const tree = new Tree(randomArray)
  
  //Make it unbalanced
  tree.insert(2900,tree.root)
  tree.insert(200,tree.root)
  tree.insert(500,tree.root)
  tree.insert(10000,tree.root)
  tree.insert(300,tree.root)

  //remove the 300 insert
  tree.remove(300,tree.root)
  
  //Prettyprint unbalanced tree
  prettyPrint(tree.root)
  //Log if it unbalanced
  console.log(tree.isBalanced(tree.root) ? "Tree is balanced!" : "Tree is not balanced..")

  
  
  
  //New Balanced tree
  const newBalancedTree = tree.reBalance(tree.root)
  //Prettyprint
  prettyPrint(newBalancedTree.root)
  //Log if it rebalanced
  console.log(newBalancedTree.isBalanced(newBalancedTree.root) ? "Tree has re-balanced!" : "Tree did not re-balance..")

//Other tests
/*
const sortedArray = mergeSort([4,6,8,10,12,14,16])
let n = sortedArray.length
const test = new Tree(sortedArray)
test.insert(2900,test.root)
test.levelOrder(test.root)
test.inOrder(test.root)
test.preOrder(test.root)
test.postOrder(test.root)
console.log(test.isBalanced(test.root))
console.log(test.height(test.find(10,test.root)))
let four = test.find(4,test.root)
console.log(test.isBalanced(test.root))
test.depth(test.find(4,test.root),test.root)
console.log("Old tree:", prettyPrint(test.root))
const reBalance = test.reBalance(test.root)
console.log("New tree:",reBalance)
console.log("Level-order:",tree.levelOrder(tree.root))
console.log("Pre-order:",tree.preOrder(tree.root))
console.log("Post-order:",tree.postOrder(tree.root))
console.log("In-order:",tree.inOrder(tree.root))*/