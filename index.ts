import { AnyPointer, GraphPointer } from 'clownface'
import type { BlankNode, NamedNode, Literal } from '@rdfjs/types'

export function isResource(arg: AnyPointer): arg is GraphPointer<BlankNode | NamedNode> {
  return arg.term?.termType === 'BlankNode' || arg.term?.termType === 'NamedNode'
}

export function isNamedNode(arg: AnyPointer): arg is GraphPointer<NamedNode> {
  return arg.term?.termType === 'NamedNode'
}

export function isBlankNode(arg: AnyPointer): arg is GraphPointer<BlankNode> {
  return arg.term?.termType === 'BlankNode'
}

export function isLiteral(arg: AnyPointer): arg is GraphPointer<Literal> {
  return arg.term?.termType === 'Literal'
}
