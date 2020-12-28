// Varibles y constantes
var database = firebase.firestore();
var idToEdit;
var idToDelete;
const productTableBody = document.getElementById("tableBody");

// Function to wirte data on Category table
function writeData(db, idTable) {
    db.collection("emprendedores").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const emprendedor = doc.data();
            idTable.innerHTML += `
            <tr>
                <td>${emprendedor.id_emp}</td>
                <td>${emprendedor.name_e}</td>
                <td>${emprendedor.lugar}</td>
                <td>${emprendedor.uid_user}</td>
                <td>
                    <a type="buttom" class="fas fa-edit" data-toggle="modal" data-target="#editProductoModal"
                    data-id = "${doc.id}"
                    data-ide = "${emprendedor.id_emp}"
                    data-name = "${emprendedor.name_e}"
                    data-lugar = "${emprendedor.lugar}"
                    data-iduser = "${emprendedor.uid_user}"></a>
                </td>
                <td>
                    <a type="buttom" class="fas fa-trash-alt" data-toggle="modal" data-target="#deleteModal" data-id="${doc.id}"></a>
                </td>
            </tr>  
            `;
            });
    });
}

writeData(database,productTableBody); // Imprimer datos desde DB en la web


// Update DB row 
$('#editProductoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    
    var idEmpren = button.data('id')
    var ide = button.data('ide')
    var name = button.data('name')
    var lugar = button.data('lugar')
    var ideUser = button.data('iduser')
    
    // Get values of item select
    idToEdit = idEmpren;

    // Print values form DB
    var modal = $(this)
    modal.find('.col-sm-101 input').val(ide)
    modal.find('.col-sm-102 input').val(name)
    modal.find('.col-sm-103 input').val(lugar)
    modal.find('.col-sm-104 input').val(ideUser)
  })

function updateData(id){
    var itemRef = database.collection('emprendedores').doc(id);

    // Set the "capital" field of the city 'DC'
    var ideNew = document.getElementById('prod-ide-edit').value;
    var namenNew = document.getElementById('prod-name-edit').value;
    var lugarNew = document.getElementById('prod-lugar-edit').value;
    var idUserNew = document.getElementById('prod-idUser-edit').value;
    return itemRef.update({
        id_emp: ideNew,
        name_e: namenNew,
        lugar: lugarNew,
        uid_user: idUserNew
    })
    .then(function() {
        //console.log(id, ide);
        //console.log("Document successfully updated!");
        alert("Document successfully updated!");
        window.location.reload();
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

// Delete DB row
$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var idEmpren = button.data('id')
    idToDelete = idEmpren;
    //console.log(idProduct);
  })
  
function deleteData(id){
    //console.log(id);
    database.collection("emprendedores").doc(id).delete().then(function() {
        alert("¡Emprendedor eliminado correctamente!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


