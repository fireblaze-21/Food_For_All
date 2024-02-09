const selectImage = document.querySelector('.select-image');
		const inputFile = document.querySelector('#file');
		const imgArea = document.querySelector('.img-area');

		selectImage.addEventListener('click', function () {
			inputFile.click();
		})

		inputFile.addEventListener('change', function () {
			const image = this.files[0]
			if (image.size < 1000000) {
				const reader = new FileReader();
				reader.onload = () => {
					const allImg = imgArea.querySelectorAll('img');
					allImg.forEach(item => item.remove());
					const imgUrl = reader.result;
					const img = document.createElement('img');
					img.src = imgUrl;
					imgArea.appendChild(img);
					imgArea.classList.add('active');
					imgArea.dataset.img = image.name;
				}
				reader.readAsDataURL(image);
			} else {
				alert("Image size more than 1MB");
			}
		})
		let fileInput = document.getElementById("file-input");
let fileList = document.getElementById("files-list");
let numOfFiles = document.getElementById("num-of-files");

fileInput.addEventListener("change", () => {
  fileList.innerHTML = "";
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

  for (i of fileInput.files) {
    let reader = new FileReader();
    let listItem = document.createElement("li");
    let fileName = i.name;
    let fileSize = (i.size / 1024).toFixed(1);
    listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    }
    fileList.appendChild(listItem);
  }
});