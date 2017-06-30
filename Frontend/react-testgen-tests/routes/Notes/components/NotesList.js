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
const Component = require('/home/karolina/Dokumenty/AGH/TAI/NoteIt/Frontend/src/routes/Notes/components/NotesList.js').default;

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

test('not required proptype fetchN is actually not required', assert => {
  let props = {"createN":"() => {}","updateN":"() => {}","deleteN":"() => {}","userId":2, "notes":[]};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype createN is actually not required', assert => {
  let props = {"fetchN":"() => {}","updateN":"() => {}","deleteN":"() => {}","userId":2, "notes":[]};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype updateN is actually not required', assert => {
  let props = {"fetchN":"() => {}","createN":"() => {}","deleteN":"() => {}","userId":2, "notes":[]};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

test('not required proptype deleteN is actually not required', assert => {
  let props = {"fetchN":"() => {}","createN":"() => {}","updateN":"() => {}","userId":2, "notes":[]};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});

/*test('not required proptype notes is actually not required', assert => {
  let props = {"fetchN":"() => {}","createN":"() => {}","updateN":"() => {}","deleteN":"() => {}","userId":2};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});
*/

test('not required proptype userId is actually not required', assert => {
  let props = {"fetchN":"() => {}","createN":"() => {}","updateN":"() => {}","deleteN":"() => {}", "notes":[]};
  props = convertFunctionProp(props);
  assert.doesNotThrow(() => ReactDOM.renderToString(React.createElement(Component, props)));
  assert.end();
});
