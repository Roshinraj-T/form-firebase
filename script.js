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
        let html=``

        // Initialize Firebase
        const app = firebase.initializeApp(firebaseConfig);

        // Reference to your database
        var database = firebase.database();

        // Read data from the database
        database.ref('user').once('value', function (snapshot) {
            var data=snapshot.val();
            if (data) {
       // Iterate over the keys in the data
       for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var item = data[key];
          console.log(item);
          html+=
            `<tr>
                <td>${item.name}</td>
                <td>${item.email}</td> 
                <td>${item.number}</td>
            </tr>`
      }
    }
  }
  document.getElementById('data').innerHTML=html

});
function insertData() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("number").value;

    database.ref('user').push(
        {
            name: name,
            email: email,
            number:number
        }
    );
}