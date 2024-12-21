// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
