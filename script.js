// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbn72uIcgzF3ejFctXLcRiSdled47JSns",
    authDomain: "fir-3037c.firebaseapp.com",
    databaseURL: "https://fir-3037c-default-rtdb.firebaseio.com",
    projectId: "fir-3037c",
    storageBucket: "fir-3037c.appspot.com",
    messagingSenderId: "664847263337",
    appId: "1:664847263337:web:9c7e0c3e7f067d6585e4f8",
    measurementId: "G-X8BK253KL1"
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
