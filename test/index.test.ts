import { expect } from 'chai'
import { describe, it } from 'mocha'
import clownface, { GraphPointer, MultiPointer } from 'clownface'
import $rdf from 'rdf-ext'
import type * as RDF from '@rdfjs/types'
import { rdf, xsd } from '@tpluscode/rdf-ns-builders'
import graphPointer from '../'

function cf() {
  return clownface({ dataset: $rdf.dataset() })
}

describe('is-graph-pointer', () => {
  Object.entries(graphPointer).forEach(([name, func]) => {
    describe(name, () => {
      it('returns false when empty pointer', () => {
        // given
        const anyPointer = cf()

        // then
        expect(func(anyPointer)).to.be.false
      })

      it('returns false when multi pointer', () => {
        // given
        const anyPointer = cf().node([
          $rdf.blankNode(),
          $rdf.literal('foo'),
          $rdf.namedNode('bar'),
        ])

        // then
        expect(func(anyPointer)).to.be.false
      })

      it('returns false when undefined', () => {
        // then
        expect(func(undefined)).to.be.false
      })
    })
  })

  describe('isGraphPointer', () => {
    it('return true when it is', () => {
      // given
      const anyPointer = cf().literal('foo')

      // then
      expect(graphPointer.isGraphPointer(anyPointer)).to.be.true
    })

    it('return false when it is any pointer', () => {
      // given
      const anyPointer = cf()

      // then
      expect(graphPointer.isGraphPointer(anyPointer)).to.be.false
    })

    it('return false when it is multi pointer', () => {
      // given
      const anyPointer = cf().node(['a', 'b'])

      // then
      expect(graphPointer.isGraphPointer(anyPointer)).to.be.false
    })
  })

  describe('isLiteral', () => {
    it('returns true when pointer is literal node', () => {
      // given
      const anyPointer = cf().literal('foo')

      // then
      expect(graphPointer.isLiteral(anyPointer)).to.be.true
    })

    it('returns false when pointer is literal node but datatype are not equal', () => {
      // given
      const anyPointer = cf().literal('foo')

      // then
      expect(graphPointer.isLiteral(anyPointer, xsd.integer)).to.be.false
    })

    it('returns true when pointer is literal node and datatypes are equal', () => {
      // given
      const anyPointer = cf().literal('foo', xsd.anyURI)

      // then
      expect(graphPointer.isLiteral(anyPointer, xsd.anyURI)).to.be.true
    })

    it('returns true when pointer is literal node and languages are equal', () => {
      // given
      const anyPointer = cf().literal('foo', 'de')

      // then
      expect(graphPointer.isLiteral(anyPointer, 'de')).to.be.true
    })

    it('false true when pointer is literal node and languages are equal', () => {
      // given
      const anyPointer = cf().literal('foo', 'de')

      // then
      expect(graphPointer.isLiteral(anyPointer, 'en')).to.be.false
    })

    it('filters multi pointer', () => {
      // given
      const anyPointer: MultiPointer = cf().node([
        $rdf.namedNode('foo'),
        $rdf.namedNode('bar'),
        $rdf.literal('baz'),
      ])

      // when
      const literal = anyPointer.filter(graphPointer.isLiteral)

      // then
      expect(literal.term).to.deep.eq($rdf.literal('baz'))
    })

    it('separates union term types when filtering', () => {
      // given
      const literal: RDF.Literal = $rdf.literal('foo')
      const blankNode: RDF.BlankNode = $rdf.blankNode()
      const pointers = cf().node([literal, blankNode]).toArray()

      // then
      // eslint-disable-next-line no-unused-vars
      const filtered: GraphPointer<RDF.Literal> | undefined = pointers.filter(graphPointer.isLiteral).shift()
    })
  })

  describe('isNamedNode', () => {
    it('returns true when pointer is named node', () => {
      // given
      const anyPointer = cf().namedNode('foo')

      // then
      expect(graphPointer.isNamedNode(anyPointer)).to.be.true
    })

    it('separates union term types when filtering', () => {
      // given
      const pointers = cf().has(rdf.type).toArray()

      // then
      // eslint-disable-next-line no-unused-vars
      const blank: GraphPointer<RDF.NamedNode> | undefined = pointers.filter(graphPointer.isNamedNode).shift()
    })
  })

  describe('isBlankNode', () => {
    it('returns true when pointer is blank node', () => {
      // given
      const anyPointer = cf().blankNode('foo')

      // then
      expect(graphPointer.isBlankNode(anyPointer)).to.be.true
    })

    it('separates union term types when filtering', () => {
      // given
      const pointers = cf().has(rdf.type).toArray()

      // then
      // eslint-disable-next-line no-unused-vars
      const named: GraphPointer<RDF.BlankNode> | undefined = pointers.filter(graphPointer.isBlankNode).shift()
    })
  })

  describe('isResource', () => {
    it('returns true when pointer is blank node', () => {
      // given
      const anyPointer = cf().blankNode('foo')

      // then
      expect(graphPointer.isResource(anyPointer)).to.be.true
    })

    it('returns true when pointer is named node', () => {
      // given
      const anyPointer = cf().namedNode('foo')

      // then
      expect(graphPointer.isResource(anyPointer)).to.be.true
    })
  })
})
