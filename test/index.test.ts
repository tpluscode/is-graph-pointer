import { expect } from 'chai'
import { describe, it } from 'mocha'
import clownface, { MultiPointer } from 'clownface'
import $rdf from 'rdf-ext'
import * as graphPointer from '../'

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
  })

  describe('isNamedNode', () => {
    it('returns true when pointer is named node', () => {
      // given
      const anyPointer = cf().namedNode('foo')

      // then
      expect(graphPointer.isNamedNode(anyPointer)).to.be.true
    })
  })

  describe('isBlankNode', () => {
    it('returns true when pointer is blank node', () => {
      // given
      const anyPointer = cf().blankNode('foo')

      // then
      expect(graphPointer.isBlankNode(anyPointer)).to.be.true
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
