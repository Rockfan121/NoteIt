import React from "react"
import { fetchNotes } from 'data/NoteActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { createNote, updateNote, deleteNote } from 'data/NoteActions'
import { getToken, getUserId } from 'data/AuthActions'

import NotesList from '../components/NotesList'
import UserInfo from '../components/UserInfo'

class notesContainer extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this.state = {
      notes: [],
      userId: 0,
      token: '',
      isFetching: false,
    }
  }
      
  componentWillReceiveProps(newProps) {
    if (this._isMounted == true){
      if (!this.state.isFetching && (newProps.userId !== this.state.userId) || (newProps.token !== this.state.token)) {
        console.log("will fetch")
        this.setState({ //
          userId: newProps.userId,
          token: newProps.token,
          isFetching: true,
        })  
        axios.defaults.headers.common['Authorization'] =  newProps.token // bug: token is undefined (should be saved in homeview response)
        this.props.fetchN()
      }
      else {
        console.log("won't fetch")
        this.setState({ //
          userId: newProps.userId,
          token: newProps.token,
          notes: newProps.notes,
          isFetching: false,
        })
      }
    }
    //sprawdzam, czy nowe id i toekn roznia sie od poprzedniego
    //jesli tak, ustawiam isFteching na true i robie this.props.fetchN
    //jesli nie, wszystko update'uje (ale nie wywoluje juz fetchN!!!!
    
    console.log("notes = " + newProps.notes)
    console.log("userId = " + newProps.userId)
    console.log("token = " + newProps.token)
  }

  componentDidMount(){
    this._isMounted = true
    if (this.state.notes == [] && this.state.token !=="" && this.state.userId !== 0){
      this.props.fetchN()
    }
  }
  componentWillMount() {
    this._isMounted = false
    this.props.getToken()
     // .then((response) => {
    this.props.getUserId()
    //axios.defaults.headers.common['Authorization'] =  this.props.token // bug: token is undefined (should be saved in homeview response)
      //    .then((response) =>{
    //this.props.fetchN() 
     //     })
     // })
  }
  componentWillUnmount(){
    this._isMounted = false
  }


  render() {
    const userData = {
      name: 'Name',
      surname: 'Surname',
      nrOfNotes: this.state.notes.length,
    }

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <UserInfo userData={userData} />
        <NotesList notes={this.state.notes} 
          userId={this.state.userId}
          fetchN={this.props.fetchN}
          createN={this.props.createN}
          updateN={this.props.updateN}
          deleteN={this.props.deleteN}/>
      </div>
    )
  }
}

notesContainer.propTypes= {
  getToken: PropTypes.func.isRequired,
  getUserId: PropTypes.func.isRequired,
  fetchN: PropTypes.func.isRequired,
  deleteN: PropTypes.func.isRequired,
  createN: PropTypes.func.isRequired,
  updateN: PropTypes.func.isRequired,
  notes: PropTypes.any.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
}

let id
const NotesContainer = connect(
  (state) => {
    console.log("connect in NotesContainer: ")
    console.log(state)
    const A = state.notes
    const B = state.auth
    // set token value (needed in page content refreshing)
//    axios.defaults.headers.common['Authorization'] =  B.get('token') // bug: token is undefined (should be saved in homeview response)
    id=B.get('userId')
    return {
      notes: A.get('notes'),
      token: B.get('token'),
      userId: B.get('userId'),
    }
  },
  (dispatch, props) => {
    return {
      getToken: () => getToken()(dispatch),
      getUserId: () => getUserId()(dispatch),
      fetchN: () => fetchNotes(id)(dispatch),
      createN: (data)=>createNote(data)(dispatch),
      updateN: (data)=>updateNote(data)(dispatch),
      deleteN: (data)=>deleteNote(data)(dispatch),
    }
  }
)(notesContainer)

export default NotesContainer


