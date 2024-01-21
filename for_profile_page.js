import { initializeApp } from 'https://www.gstatic.com/firebasejs/VERSION/firebase-app.js';
import { getStorage, ref as storageRef, uploadBytes } from 'https://www.gstatic.com/firebasejs/VERSION/firebase-storage.js';
import { getDatabase, get, ref } from 'https://www.gstatic.com/firebasejs/VERSION/firebase-database.js';

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);
const uploadButton = document.getElementById('Uplaod');
uploadButton.addEventListener('click', async (e) => {
    const fileInput = document.querySelector("#imageInput");
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const storageRefForUpload = storageRef(storage, 'images/' + file.name);
        const metadata = {
            contentType: file.type
        };
        try {
            const snapshot = await uploadBytes(storageRefForUpload, file, metadata);
            const url = await snapshot.ref.getDownloadURL();
            console.log(url);
            alert("Image Uploaded...");
            const imageElement = document.querySelector('#imagePreview');
            imageElement.src = url;
        } catch (error) {
            console.error(error);
        }
    } else {
        console.error("File input not found or no files selected");
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid');
    if (uid) {
        const userRef = ref(database, 'users/' + uid);
        get(userRef).then((snapshot) => {
            const userData = snapshot.val();
            if (userData && 'displayName' in userData) {
                const userNameElement = document.getElementById('Name');
                userNameElement.textContent = 'Hello, ' + userData.displayName;
                if ('photoURL' in userData) {
                    const profilePicElement = document.getElementById('navProfilePic');
                    profilePicElement.src = userData.photoURL;
                }
            } else {
                console.error('User data not found or missing displayName field.');
            }
        });
    } else {
        console.error('UID parameter not found in the URL.');
    }
});
