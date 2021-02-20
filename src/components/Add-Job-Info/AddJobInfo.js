import React, { useState } from "react";
import { connect } from "react-redux";
import "./AddJobInfo.scss";
import CustomButton from "../custom-button/CustomButton";
import FormInput from "../form-input/FormInput";
import { saveToFireStore } from "../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user.selector";
function AddJobInfo({ currentUser }) {
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
  function handleSubmit(e) {
    e.preventDefault();
    const dummyCollectionRef = "yoyo";
    return saveToFireStore(dummyCollectionRef, currentUser, jobInfo);
  }
  const { title, email, jobinfo } = jobInfo;
  return (
    <div>
      <form onSubmit={handleSubmit} className="job-form">
        <FormInput
          value={title}
          onChange={handleChange}
          type="text"
          name="title"
          label="Job title"
        />
        <FormInput
          value={email}
          onChange={handleChange}
          type="email"
          name="email"
          label="Email"
        />
        <FormInput
          value={jobinfo}
          onChange={handleChange}
          type="text"
          name="jobinfo"
          label="Job Description"
        />
        <CustomButton type="submit">Submit</CustomButton>
      </form>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(AddJobInfo);
