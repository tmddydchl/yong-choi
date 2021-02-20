import React, { useEffect, useState } from "react";
// import './JobPage.scss';
import {
  getCollectionsSnapshotToMap,
  firestore
} from "../firebase/firebase.utils";

function JobPage() {
  const [jobAds, setJobAds] = useState([]);

  useEffect(() => {
    const jobCollectionRef = firestore.collection("yoyo");
    setJobAds(getCollectionsSnapshotToMap(jobCollectionRef));
  }, []);
  return (
    <div className="JobPage">
      <h1>Job Title</h1>
      <span>Job Description</span>
      <span>Address</span>
      <span>Contact Number</span>
    </div>
  );
}
export default JobPage;
