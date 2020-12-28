// Varibles y constantes
var database = firebase.firestore();
var idUserToDelete;
var idUserToEdit;
    var nameEdit;
    var dniEdit;
    var celularEdit;
    var emailEdit;
    var contraseñaEdit;
const userTableBody = document.getElementById("tableBody");

// Function to wirte data on Category table
function writeData(db, idTable) {
    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            idTable.innerHTML += `
            <tr>
                <td>${user.nombreUs}</td>
                <td>${user.dni}</td>
                <td>${user.celular}</td>
                <td>${user.email}</td>
                <td id="${user.nombreUs}"></td>
                <td>
                    <a type="buttom" class="fas fa-edit" data-toggle="modal" data-target="#editUserModal"
                    data-id = "${doc.id}"
                    data-name = "${user.nombreUs}"
                    data-dni = "${user.dni}"
                    data-cel = "${user.celular}"
                    data-mail = "${user.email}"
                    data-pass = "${user.contraseña}"></a>
                </td>
                <td>
                    <a type="buttom"  class="fas fa-trash-alt" data-toggle="modal" data-target="#deleteModal" data-id="${doc.id}" ></a>
                </td>
            </tr>  
            `;
            var idPass = user.nombreUs;
            var pass = user.contraseña;
            var times = pass.length;
            const encrip = "*";
            var passEncrip = encrip.repeat(times);
            document.getElementById(idPass).innerHTML = passEncrip;
            });
    });
}

writeData(database,userTableBody); // Imprimir datos desde DB en la web


// Save new DB row
function saveData(){
    var userName = document.getElementById("user-name").value;
    var userDNI = document.getElementById("user-dni").value;
    var userCelular = document.getElementById("user-celular").value;
    var userEmail = document.getElementById("user-email").value;
    var userPassword = document.getElementById("user-password").value;

    database.collection("usuarios").add({
        nombreUs: userName,
        dni     : userDNI,
        celular : userCelular,
        email   : userEmail,
        contraseña: userPassword
    })
    .then(function(docRef) {
        alert("¡Usuario guardado correctamente!");
        //document.getElementById("AddCategory-form").reset();
        window.location.reload();
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

// Delete DB row
$('#deleteModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var idUser = button.data('id')
  idUserToDelete = idUser;
  })

function deleteData(id){
    //console.log(id);
    database.collection("usuarios").doc(id).delete().then(function() {
        alert("¡Usuario eleiminado correctamente!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


// Update DB row
$('#editUserModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

  var idUser = button.data('id')
  var nameUser = button.data('name')
  var dniUser = button.data('dni')
  var celUser = button.data('cel')
  var emailUser = button.data('mail')
  var passwordUser = button.data('pass')

  // Get values of item select
  idUserToEdit = idUser

  // Print values form DB
  var modal = $(this)
  modal.find('.col-sm-101 input').val(nameUser)
  modal.find('.col-sm-102 input').val(dniUser)
  modal.find('.col-sm-103 input').val(celUser)
  modal.find('.col-sm-104 input').val(emailUser)
  modal.find('.col-sm-105 input').val(passwordUser)
})

function updateData(id) {
    var itemRef = database.collection("usuarios").doc(id);

    // Set the "capital" field of the city 'DC'
    var nameNew = document.getElementById('user-name-edit').value;
    var dniNew = document.getElementById('user-dni-edit').value;
    var celularNew = document.getElementById('user-celular-edit').value;
    var emailNew = document.getElementById('user-email-edit').value;
    var passNew = document.getElementById('user-password-edit').value;
    return itemRef.update({
        nombreUs: nameNew,
        dni: dniNew,
        celular: celularNew,
        email: emailNew,
        contraseña: passNew
    })
    .then(function() {
        //console.log(id, nameNew, emailNew);
        console.log("Document successfully updated!");
        window.location.reload();
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}