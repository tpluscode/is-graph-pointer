import type { AnyContext, AnyPointer, GraphPointer } from 'clownface'
import type { BlankNode, NamedNode, Literal, DatasetCore } from '@rdfjs/types'

export function isGraphPointer(arg: AnyPointer | null | undefined | unknown): arg is GraphPointer {
  return typeof arg === 'object' && !!arg && 'term' in arg
}

export function isResource<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | null | undefined): arg is GraphPointer<BlankNode | NamedNode, D> {
  return isGraphPointer(arg) && (arg.term.termType === 'BlankNode' || arg.term.termType === 'NamedNode')
}

export function isNamedNode<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | null | undefined): arg is GraphPointer<NamedNode, D> {
  return isGraphPointer(arg) && arg.term.termType === 'NamedNode'
}

export function isBlankNode<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | null | undefined): arg is GraphPointer<BlankNode, D> {
  return isGraphPointer(arg) && arg.term.termType === 'BlankNode'
}

export function isLiteral<D extends DatasetCore>(arg: AnyPointer<AnyContext, D> | undefined, dtOrLang?: NamedNode | string | number): arg is GraphPointer<Literal, D> {
  const itIsLiteral = isGraphPointer(arg) && arg.term.termType === 'Literal'
  if (itIsLiteral && typeof dtOrLang === 'string') {
    return arg.term.language === dtOrLang
  }
  if (itIsLiteral && typeof dtOrLang === 'object') {
    return arg.term.datatype.equals(dtOrLang)
  }

  return itIsLiteral
}

export default {
  isGraphPointer,
  isResource,
  isNamedNode,
  isBlankNode,
  isLiteral,
}
