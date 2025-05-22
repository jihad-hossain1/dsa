### Linked List

---

A **Linked List** is a **linear data structure** where each element (called a **node**) points to the **next node** in the sequence.

Unlike arrays, **elements are not stored in contiguous memory locations**. Each node contains:

- **Data** (value)
- **Pointer (or reference)** to the next node

**Types of Linked Lists**

| **Type**                 | **Description**                              | **Visual**              |
| ------------------------ | -------------------------------------------- | ----------------------- |
| **Singly Linked List**   | Each node points to the next one.            | A → B → C → null        |
| **Doubly Linked List**   | Each node points to both previous and next.  | null ← A ↔ B ↔ C → null |
| **Circular Linked List** | The last node points back to the first node. | A → B → C → A (loop)    |

**Operations:**

| **Operation**           | **Description**                    | **Time Complexity**               |
| ----------------------- | ---------------------------------- | --------------------------------- |
| **Traversal**           | Go through all nodes (e.g., print) | O(n)                              |
| **Insertion at Head**   | Add new node at the beginning      | O(1)                              |
| **Insertion at Tail**   | Add node at the end                | O(n) (unless tail pointer exists) |
| **Insertion at Middle** | Insert at given index              | O(n) (find position first)        |
| **Deletion by Value**   | Find and remove a node             | O(n)                              |
| **Deletion at Head**    | Remove first node                  | O(1)                              |
| **Search**              | Find value in nodes                | O(n)                              |
| **Access by Index**     | No direct access like arrays       | O(n)                              |
