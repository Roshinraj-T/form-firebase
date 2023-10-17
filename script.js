// Initialize Firebase with your configuration
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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
const perf = firebase.performance(); // Initialize Performance Monitoring

// Function to fetch user data and update the table
async function fetchUsers() {
    const customTrace = perf.trace('fetch_users_trace');
    customTrace.start();
    const querySnapshot = await firestore.collection('users').get();
    let html = '';

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        html += `<tr>
                  <td>${data.name}</td>
                  <td>${data.email}</td>
                  <td>${data.number}</td>
              </tr>`;
    });

    document.getElementById('data').innerHTML = html;
    customTrace.stop();
}

// Function to add user data to the Firestore database
async function addUserData(data) {
    const customTrace = perf.trace('add_user_data_trace');
    customTrace.start();

    try {
        const collectionRef = firestore.collection('users');
        const docRef = await collectionRef.add(data);
        console.log('Document added with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
    } finally {
        customTrace.stop();
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
        addUserData(data);
    });
});

// Fetch user data when the page loads
fetchUsers();