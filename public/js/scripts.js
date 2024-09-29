document.getElementById('image').addEventListener('change', function () {
    const fileName = this.files[0].name;
    document.getElementById('fileNameDisplay').textContent = `Selected file: ${fileName}`;
});

document.getElementById('imageForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.getElementById('image').files[0];
    const format = document.getElementById('format').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const loader = document.getElementById('loader');

    formData.append('image', imageFile);
    formData.append('format', format);
    formData.append('width', width);
    formData.append('height', height);

    const uploadButton = document.getElementById('uploadButton');
    const downloadLink = document.getElementById('downloadLink');

      // Show loader and disable the button
      loader.style.display = 'inline-block'; 
      uploadButton.disabled = true;
      uploadButton.textContent = 'Uploading...';

    try {
        const response = await fetch('/images/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.style.display = 'inline';

            // Change the button text to "Click here to download"
            uploadButton.textContent = 'Click here to download';
            uploadButton.classList.add('download');
            loader.style.display = 'none';
            uploadButton.disabled = false;
            // Update the download link to reload the page on click
            downloadLink.onclick = function () {
                window.location.reload();
            };
            uploadButton.onclick = function (e) {
                e.preventDefault();
                downloadLink.click();
            };
        } else {
            alert('Image conversion failed.');
            loader.style.display = 'none';
            uploadButton.disabled = false;
            uploadButton.textContent = 'Upload and Convert';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading.');
        loader.style.display = 'none';
        uploadButton.disabled = false;
        uploadButton.textContent = 'Upload and Convert';
    }
});