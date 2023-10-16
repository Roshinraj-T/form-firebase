// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr_4N-kDvEUD6H6_czJpV3_WQERYOwXwE",
    authDomain: "notification-a1dc8.firebaseapp.com",
    databaseURL: "https://notification-a1dc8-default-rtdb.firebaseio.com",
    projectId: "notification-a1dc8",
    storageBucket: "notification-a1dc8.appspot.com",
    messagingSenderId: "950550976003",
    appId: "1:950550976003:web:e4194b60c44f96ef29e036",
    measurementId: "G-VFX2C1VEN4"
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();


let html = ``;
fetchUsers();

async function fetchUsers() {
    try {
        const querySnapshot = await firestore.collection('users').get();

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            html +=
                `<tr>
                            <td>${data.name}</td>
                            <td>${data.email}</td>
                            <td>${data.number}</td>

                        </tr>`;
        });

        document.getElementById('data').innerHTML = html;
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
}

async function addUserData(data) {
    try {
        // Get a reference to the 'users' collection
        const collectionRef = firestore.collection('users');

        // Add the provided data to the collection
        const docRef = await collectionRef.add(data);
        html = ``
        fetchUsers();

        console.log('Document added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    }
}
// Add an event listener to the button
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('addDataButton').addEventListener('click', () => {
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            number: document.getElementById('number').value,
        };

        // Call the function to add the data
        addUserData(data);
    });
})
