import { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import type { BlankNode, NamedNode, Literal, DatasetCore } from '@rdfjs/types'

export function isGraphPointer(arg: AnyPointer | undefined): arg is GraphPointer {
  return !!arg?.term
}

export function isResource<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | undefined): arg is GraphPointer<BlankNode | NamedNode, D> {
  return arg?.term?.termType === 'BlankNode' || arg?.term?.termType === 'NamedNode'
}

export function isNamedNode<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | undefined): arg is GraphPointer<NamedNode, D> {
  return arg?.term?.termType === 'NamedNode'
}

export function isBlankNode<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | undefined): arg is GraphPointer<BlankNode, D> {
  return arg?.term?.termType === 'BlankNode'
}

export function isLiteral<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | undefined): arg is GraphPointer<Literal, D> {
  return arg?.term?.termType === 'Literal'
}

export default {
  isGraphPointer,
  isResource,
  isNamedNode,
  isBlankNode,
  isLiteral,
}
