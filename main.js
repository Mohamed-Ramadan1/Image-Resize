let uploadBox = document.querySelector(".upload-box");

let previewImag = document.querySelector("img");

let fileInpu = uploadBox.querySelector("input");

let  widthInput = document.querySelector(".width input");

let heightInput = document.querySelector(".heigth input");

let ratioInput = document.querySelector(".ratio input");


let downloadBtn = document.querySelector(".download-btn");

let qualityInput = document.querySelector(".quality input");


let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImag.src = URL.createObjectURL(file);
    previewImag.addEventListener("load", () => {
        widthInput.value = previewImag.naturalWidth;
        heightInput.value = previewImag.naturalHeight;
        ogImageRatio = previewImag.naturalWidth / previewImag.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
        document.querySelector(".wrapper").classList.remove("cont");
    })
};

widthInput.addEventListener("keyup", () => {
    const heigh = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(heigh);
});

heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value *  ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
    
});

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // controalling in the quality of the image depending on the reduace quallity input.
    const imgQuality = qualityInput.checked ? 0.7:1.0 ;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;


    ctx.drawImage(previewImag, 0, 0, canvas.width, canvas.height);
    document.body.appendChild(canvas); 

    a.href=canvas.toDataURL("image/png", imgQuality);
    a.download = new Date().getTime();
    a.click();

};

downloadBtn.addEventListener("click", resizeAndDownload);

fileInpu.addEventListener("change", loadFile);
// if the uploade box is clicked also the input will clicked.
uploadBox.addEventListener("click", () => fileInpu.click());