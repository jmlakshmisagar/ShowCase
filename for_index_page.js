import { initializeApp } from 'https://www.gstatic.com/firebasejs/VERSION/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/VERSION/firebase-storage.js';
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
async function fetchAndDisplayImages() {
    console.log('Fetching and displaying images...');
    const storageRef = ref(storage, 'images');
    try {
        const storageList = await listAll(storageRef);
        const imagesContainer = document.getElementById('Images');
        storageList.items.forEach(async (item) => {
            const downloadURL = await getDownloadURL(item);
            const imgElement = document.createElement('img');
            imgElement.src = downloadURL;
            imagesContainer.appendChild(imgElement);
            console.log('Image added:', downloadURL);
        });
        console.log('Images fetched and displayed successfully.');
    } catch (error) {
        console.error('Error fetching and displaying images:', error);
    }
}
fetchAndDisplayImages();
