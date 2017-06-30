'use strict';
require('babel-register')({
  presets: [ 'es2015', 'react', 'stage-2' ]
});
require.extensions['.scss'] = () => {
  return;
};

const test = require('tape');
const React = require('react');
const ReactDOM = require('react-dom/server');
const TestUtils = require('react-dom/test-utils');
const Component = require('/home/karolina/Dokumenty/AGH/TAI/NoteIt/Frontend/src/components/Modal/NoteModal.js').default;

function convertFunctionProp(props) {
 return Object.keys(props).reduce((newProps, prop, i) => {
    if (props[prop] === '() => {}') {
      newProps[prop] = () => {};
    }
    else {
      newProps[prop] = props[prop];
    }
    return newProps;
  }, {});
}

test('is a valid React Component', assert => {
  assert.ok(TestUtils.isElement(React.createElement(Component, {})), 'is valid');
  assert.end();
});

test('not required proptype isOpen is actually not required', assert => {
  let props = {"isCreated":true,"onRequestClose":"() => {}","onSubmit":"() => {}","values":{}};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype isCreated is actually not required', assert => {
  let props = {"isOpen":true,"onRequestClose":"() => {}","onSubmit":"() => {}","values":{}};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype onRequestClose is actually not required', assert => {
  let props = {"isOpen":true,"isCreated":true,"onSubmit":"() => {}","values":{}};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype onSubmit is actually not required', assert => {
  let props = {"isOpen":true,"isCreated":true,"onRequestClose":"() => {}","values":{}};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

/*
test('not required proptype values is actually not required', assert => {
  let props = {"isOpen":true,"isCreated":true,"onRequestClose":"() => {}","onSubmit":"() => {}"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});
*/