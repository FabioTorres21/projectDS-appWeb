// Varibles y constantes
var database = firebase.firestore();
var idToEdit;
var idToDelete;
const categoryTableBody = document.getElementById("tableBody");

// Function to wirte data on Category table
function writeData(db, idTable) {
    db.collection("categorias").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const category = doc.data();
            idTable.innerHTML += `
            <tr>
                <td>${category.ideCa}</td>    
                <td>${category.nombreCa}</td>
                <td>
                    <a type="buttom" class="fas fa-edit" data-toggle="modal" data-target="#editCatModal"
                    data-id="${doc.id}"
                    data-ide="${category.ideCa}"
                    data-name="${category.nombreCa}"></a>
                </td>
                <td>
                    <a type="buttom" class="fas fa-trash-alt" data-toggle="modal" data-target="#deleteModal" data-id="${doc.id}"></a>
                </td>
            </tr>  
            `;
            });
    });
}

writeData(database,categoryTableBody); // Imprimer datos desde DB en la web

// Save new DB row
function saveData(){
    var ideCat = document.getElementById("category-id").value;
    var nombreCat = document.getElementById("category-name").value;

    database.collection("categorias").add({
        ideCa: ideCat,
        nombreCa: nombreCat
    })
    .then(function(docRef) {
        alert("¡Categoría guardada correctamente!");
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
  var idCategory = button.data('id')
  idToDelete = idCategory;
})

function deleteData(id){
    //console.log(id);
    database.collection("categorias").doc(id).delete().then(function() {
        alert("¡Categoría eleiminada correctamente!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// Update DB row
$('#editCatModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal

    var idCategoria = button.data('id')
    var ideCategory = button.data('ide')
    var nameCategory = button.data('name')

    // Get values of item select
    idToEdit = idCategoria;

    // Print values form DB
    var modal = $(this)
    modal.find('.form-control-1').val(ideCategory)
    modal.find('.form-control-2').val(nameCategory)
  })

function updateData(id){
    var itemRef = database.collection("categorias").doc(id);

    // Set the "capital" field of the city 'DC'
    var ideNew = document.getElementById('cat-ide-edit').value;
    var nameNew = document.getElementById('cat-name-edit').value;
    return itemRef.update({
        ideCa: ideNew,
        nombreCa: nameNew        
    })
    .then(function() {
        console.log(id, nameNew, ideNew);
        //console.log("Document successfully updated!");
        alert("Document successfully updated!");
        window.location.reload();
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
} 

