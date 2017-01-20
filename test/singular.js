'use strict'
var test = require('tap').test
var i18n = require('../')
var path = require('path')
var fsFolder = path.join(__dirname, 'lookup', 'fs')

test('mustache testing', function (t) {
  t.equals(i18n({'en': {a: '{{hello}}'}}).lang('en').__('a', {hello: 'd'}), 'd')
  t.end()
})

test('args testing', function (t) {
  t.equals(i18n({'en': {a: '%s'}}).lang('en').__('a', 'e'), 'e')
  t.end()
})

test('args without placeholder', function (t) {
  t.equals(i18n({'en': {a: ''}}).lang('en').__('a', 'e'), '')
  t.end()
})

test('mixed mustache & args testing', function (t) {
  t.equals(i18n({'en': {a: '%s {{hello}}'}}).lang('en').__('a', {hello: 'g'}, 'f'), 'f g')
  t.end()
})

test('empty key', function (t) {
  var translator = i18n(fsFolder)
  t.equals(translator.__(''), '(?)')
  t.end()
})

test('empty key in namespace', function (t) {
  var translator = i18n(fsFolder).lang('en')
  t.equals(translator.__(''), 'en.')
  t.end()
})

test('undefined key in namespace', function (t) {
  var translator = i18n(fsFolder).lang('en')
  t.equals(translator.__(undefined), 'en.')
  t.end()
})

test('sprintf strings to be treated as strings', function (t) {
  var __ = i18n().__
  t.equals(__('%s', 1), '1')
  t.equals(__('%s', '01'), '01')
  t.equals(__('%s', false), 'false')
  t.equals(__('%s', 'false'), 'false')
  t.equals(__('%s', true), 'true')
  t.equals(__('%s', 'true'), 'true')
  t.equals(__('%s', null), 'null')
  t.equals(__('%s', 'null'), 'null')
  t.equals(__('%s', undefined), 'undefined')
  t.equals(__('%s', 'undefined'), 'undefined')
  t.end()
})

test('mustache strings to be treated as strings', function (t) {
  var __ = i18n({'$': '{{data}}'}).__
  t.equals(__('$', {data: 1}), '1')
  t.equals(__('$', {data: '01'}), '01')
  t.equals(__('$', {data: false}), 'false')
  t.equals(__('$', {data: 'false'}), 'false')
  t.equals(__('$', {data: true}), 'true')
  t.equals(__('$', {data: 'true'}), 'true')
  t.equals(__('$', {data: null}), '')
  t.equals(__('$', {data: 'null'}), 'null')
  t.equals(__('$', {data: undefined}), '')
  t.equals(__('$', {data: 'undefined'}), 'undefined')
  t.end()
})
