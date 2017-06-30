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
const Component = require('/home/karolina/Dokumenty/AGH/TAI/NoteIt/Frontend/src/components/Form/FormInput.js').default;

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

test('not required proptype label is actually not required', assert => {
  let props = {"value":"cool","type":"cool","onChange":"() => {}","inputType":"cool"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype value is actually not required', assert => {
  let props = {"label":"cool","type":"cool","onChange":"() => {}","inputType":"cool"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype type is actually not required', assert => {
  let props = {"label":"cool","value":"cool","onChange":"() => {}","inputType":"cool"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype onChange is actually not required', assert => {
  let props = {"label":"cool","value":"cool","type":"cool","inputType":"cool"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype inputType is actually not required', assert => {
  let props = {"label":"cool","value":"cool","type":"cool","onChange":"() => {}"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});
