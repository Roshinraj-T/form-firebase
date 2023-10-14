function insertData() {
    console.log("ooooooooooooo");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    database.ref('user').push(
        {
            name: 'Roshin',
            email: 'roshin@gmail.com',
            number: "6374656364"
        }
    );
}