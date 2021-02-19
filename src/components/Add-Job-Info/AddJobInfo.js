import React, { useState } from "react";
import { connect } from "react-redux";
import {saveToFireStore} from '../firebase/firebase.utils'
import { createStructuredSelector } from 'reselect'
import {selectCurrentUser} from '../redux/user/user.selector'
function AddJobInfo({currentUser}) {
  const [jobInfo, setJobInfo] = useState({
    title: "",
    email: "",
    jobinfo: ""
  });
  function handleChange(e) {
    const newValue = e.target.value;
    const valueName = e.target.name;

    setJobInfo((rest) => {
      return {
        ...rest,
        [valueName]: newValue
      };
    });
    console.log(jobInfo);
  }
  function handleSubmit(e){
    e.preventDefault()
    const dummyCollectionRef="yoyo"
    return saveToFireStore(dummyCollectionRef, currentUser, jobInfo)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="title" />
        <input onChange={handleChange} type="email" name="email" />
        <input onChange={handleChange} type="text" name="jobinfo" />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
})

export default connect(mapStateToProps)(AddJobInfo);