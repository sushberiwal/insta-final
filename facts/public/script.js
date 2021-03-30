let fileInput = document.querySelector("#image");

fileInput.addEventListener("change" , function(e){
    let fileObject = e.target.files[0];
    console.log(fileObject);
    let formData = new FormData();
    formData.append('photo' , fileObject);
    axios.post("/imageUpload" , formData);
})