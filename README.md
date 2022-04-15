# is-graph-pointer

Check what a graph pointer is pointing at

In an `if` condition:

```typescript
import type { GraphPointer } from 'clownface'
import type { NamedNode } from '@rdfjs/types'
import { isNamedNode } from 'is-graph-pointer'

let pointer: GraphPointer

if (isNamedNode(pointer)) {
  const term: NamedNode = pointer.term
}
```

To filter arrays:

```typescript
import type { MultiPointer } from 'clownface'
import type { Literal } from '@rdfjs/types'
import { isLiteral } from 'is-graph-pointer'

let pointer: MultiPointer

const literals: MultiPointer<Literal> = pointer.filter(isLiteral)
```
