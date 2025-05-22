| **Operation**       | **Description**                                | **Time Complexity** | **Notes**                                                        |
| ------------------- | ---------------------------------------------- | ------------------- | ---------------------------------------------------------------- |
| **Access**          | Get an element by its index: arr[i]            | O(1)                | Direct memory access via index. Super fast.                      |
| **Update**          | Replace an element at a specific index         | O(1)                | Similar to access — instant overwrite.                           |
| **Insert (End)**    | Add element at the end: arr.push(val)          | O(1)\*              | Amortized O(1); resizing may cost O(n) when capacity is exceeded |
| **Insert (Start)**  | Add element at the beginning: arr.unshift(val) | O(n)                | All elements must shift one index right.                         |
| **Insert (Middle)** | arr.splice(i, 0, val)                          | O(n)                | Everything after index i shifts.                                 |
| **Delete (End)**    | Remove last element: arr.pop()                 | O(1)                | Just removes the last element.                                   |
| **Delete (Start)**  | Remove first: arr.shift()                      | O(n)                | All elements shift left by one.                                  |
| **Delete (Middle)** | arr.splice(i, 1)                               | O(n)                | Elements after index i shift left.                               |
| **Find (by value)** | arr.indexOf(val) or arr.includes(val)          | O(n)                | Linear search. No built-in hashing/index map.                    |
