## Sorting

---

**Sorting** is the process of arranging data in a particular order—usually ascending (small to large) or descending (large to small). It’s a fundamental operation in computer science that helps in optimizing search operations, organizing data meaningfully, and preparing datasets for algorithms that require ordered input (e.g., binary search).

### **Types of Sorting:**

**Internal Sorting:** Sorting is done entirely in main memory. Used when data fits in RAM. Ex. _Quick Sort, Merge Sort, Bubble Sort._

**External Sorting:** Used when data is too large to fit into memory and needs disk-based sorting. _Ex. External Merge Sort._

**Stable vs. Unstable Sorting:**

- **Stable**: Maintains the relative order of equal elements.
- **Unstable**: May change the order of equal elements.

**Comparison-based vs. Non-comparison-based**

- **Comparison-based**: Relies on comparing elements. _Ex. Merge Sort, Quick Sort, Bubble Sort_
- **Non-comparison-based**: Uses techniques like counting or hashing. _Ex. Counting Sort, Radix Sort, Bucket Sort._

### Common Sorting Algorithms

| **Algorithm**      | **Time (Avg)** | **Space** | **Stable** | **Summary (How It Works)**                                                            |
| ------------------ | -------------- | --------- | ---------- | ------------------------------------------------------------------------------------- |
| **Bubble Sort**    | O(n²)          | O(1)      | ✅ Yes     | Repeatedly swaps adjacent elements if they are in the wrong order.                    |
| **Selection Sort** | O(n²)          | O(1)      | ❌ No      | Selects the smallest element and places it at the correct position one by one.        |
| **Insertion Sort** | O(n²)          | O(1)      | ✅ Yes     | Inserts each element into its correct position in a growing sorted part of the array. |
| **Merge Sort**     | O(n log n)     | O(n)      | ✅ Yes     | Recursively divides the array and merges sorted halves.                               |
| **Quick Sort**     | O(n log n)     | O(log n)  | ❌ No      | Picks a pivot, partitions elements around it, and recursively sorts subarrays.        |
| **Heap Sort**      | O(n log n)     | O(1)      | ❌ No      | Builds a max heap and repeatedly extracts the maximum element.                        |
| **Counting Sort**  | O(n + k)       | O(k)      | ✅ Yes     | Counts the frequency of each element and uses it to place elements in order.          |
| **Bucket Sort**    | O(n + k)       | O(n + k)  | ✅ Yes     | Distributes elements into buckets, sorts each bucket, then concatenates them.         |

### Sorting Array vs Linked List

Sorting an array:

✅ Easy to access any element instantly.

✅ Swapping elements is trivial (no structure breaks).

✅ Many fast algorithms (Quick Sort, Heap Sort) work best with arrays.

⚠️ Sorting needs care with large arrays.

Sorting an Linked List:

❌ Random access is expensive (no jumping to middle).

❌ Swapping values is inefficient (rewiring links is tricky).

✅ However, **merging two lists** (Merge Sort) is very efficient (only pointer changes).

Algorithms Comparison:

| **Algorithm**        | **Array** | **Linked List**  | **Notes**                                  |
| -------------------- | --------- | ---------------- | ------------------------------------------ |
| Bubble Sort          | ✅        | ✅ (but slow)    | Simple, but O(n²).                         |
| Selection Sort       | ✅        | ✅               | Simple, but not ideal for large datasets.  |
| Insertion Sort       | ✅        | ✅               | Good for small or nearly sorted data.      |
| Quick Sort           | ✅ Best   | ❌ Bad           | Needs random access, bad for linked lists. |
| Merge Sort           | ✅        | ✅ Best          | Perfect for linked lists (easy merging).   |
| Heap Sort            | ✅        | ❌ Not practical | Heap needs array-like structure.           |
| Counting/Bucket Sort | ✅        | ❌               | Needs direct indexing (arrays only).       |
