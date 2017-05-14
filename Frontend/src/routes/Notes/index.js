import { injectReducer } from 'store/reducers'

const routes = (store) => {
  return {
    path: 'notes',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const component = require('./containers/NotesContainer').default
        cb(null, component)
      })
    },
  }
}

export default routes
