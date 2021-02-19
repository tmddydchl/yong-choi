import React from 'react';
import './App.css'
import {signInWithGoogle} from './components/firebase/firebase.utils'
import AddJobInfo from './components/Add-Job-Info/AddJobInfo'
import {auth, userProfile, saveToFireStore, firestore, getTheTestObjFromFireStore, updateTheTestObjInsideFireStore, deleteTheTestObjInsideFireStore} from './components/firebase/firebase.utils'

class Apps extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentUser:null,
      signInStatus:"Google",
      item:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleDelete=this.handleDelete.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleUpdate=this.handleUpdate.bind(this)
  }
  test=null;
  unsubscribeFromAuth=null
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      this.setState({currentUser:user},()=>{console.log(this.state)})
      if (user) {
        this.setState({signInStatus:"Sign Out"})
        // const userAuth= await this.state.currentUser
        userProfile(user)
      }
      else if (!user){
        this.setState({signInStatus:"Google"})
      }
      // const userAuth= await this.state.currentUser
      // console.log(userAuth.uid)
      // userProfile(user)
    })
    const ref=firestore.collection('yoyo')
    this.test=ref.onSnapshot(
      async function heyhey(snapshot){
        console.log(snapshot);
        const refMap=getTheTestObjFromFireStore(snapshot)
        console.log(refMap)
      }
    )
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  handleChange= async (e)=>{
    const item = e.target.value
    this.setState({item:item})
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    const dummyCollectionRef="yoyo"
    saveToFireStore(dummyCollectionRef,this.state.currentUser)
  }
  handleUpdate=(e)=>{
    e.preventDefault()
    const dummyUpdate="heyo"
    updateTheTestObjInsideFireStore(this.state.currentUser,dummyUpdate)
  }
  handleDelete=(e)=>{
    e.preventDefault()
    deleteTheTestObjInsideFireStore(this.state.currentUser)
  }
  render(){
  const signIn = this.state.signInStatus
  return (
    <div className="App">
      <div className='yo'>
      <h1 className='title'>Search Here</h1>
      <form >
        <input type='text' name='item' onChange={this.handleChange}/>
        <button type='submit'>Search</button>
      </form>
      <a href='/'>All Jobs</a>
      <button onClick={signInWithGoogle}>{signIn}</button>
      <button onClick={this.handleSubmit}>Set Test</button>
      <button onClick={()=>auth.signOut()}>sign out</button>
      <button onClick={this.handleUpdate}>Update Test</button>
      <button onClick={this.handleDelete}>Delete Test</button>
      </div>
      <AddJobInfo user={this.state.currentUser}/>
    </div>
    
  );
  }
}

export default Apps;
