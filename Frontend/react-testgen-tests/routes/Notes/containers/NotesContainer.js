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
const Component = require('/home/karolina/Dokumenty/AGH/TAI/NoteIt/Frontend/src/routes/Notes/containers/NotesContainer.js').default;

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

test('not required proptype getToken is actually not required', assert => {
  let props = {"getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype getUserId is actually not required', assert => {
  let props = {"getToken":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype fetchN is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype deleteN is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype createN is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype updateN is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype notes is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype token is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype userId is actually not required', assert => {
  let props = {"getToken":"() => {}","getUserId":"() => {}","fetchN":"() => {}","deleteN":"() => {}","createN":"() => {}","updateN":"() => {}","token":"cool"};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});
