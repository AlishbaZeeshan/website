// import { useState, useEffect } from "react";
// import styles from "./ContentView.module.css";
// import { uploadImage, getimage } from "./service/api.js";

function ContentView() {

  // const [image, setImage] = useState(null);
  // const [allImages, setAllImage] = useState([]);

  // const onInputChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  // const submitImage = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("image", image);

  //   await uploadImage(formData);
  //   fetchImages(); // refresh after upload
  // };

  // const fetchImages = async () => {
  //   const result = await getimage();
  //   console.log(result.data.data);
  //   setAllImage(result.data.data);
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, []);

  return (
    <>
    </>
    // <div>

    //   {/* UPLOAD FORM */}
    //   <form onSubmit={submitImage}>
    //     <input 
    //       type="file"
    //       accept="image/*"
    //       onChange={onInputChange}
    //     />
    //     <br />
    //     <button type="submit">Upload</button>
    //   </form>

    //   <br /><hr /><br />

    //   {/* SHOW IMAGES */}
    //   <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    //     {allImages.map((item, index) => (
    //       <img
    //         key={index}
    //         src={`http://localhost:5000/uploads/${item.image}`}
    //         alt="uploaded"
    //         width="200"
    //       />
    //     ))}
    //   </div>

    // </div>
   );
}

export default ContentView;
