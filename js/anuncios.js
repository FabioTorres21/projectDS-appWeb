// Varibles y constantes
var database = firebase.firestore();
var storage = firebase.storage();
var idToEdit;
var idToDelete;
var idUser;
var idCatt;
const anuncioTableBody = document.getElementById("tableBody");

// Function to wirte data on Category table
function writeData(db, idTable) {
    db.collection("anuncios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const anuncio = doc.data();
            idTable.innerHTML += `
            <tr>
                <td>${anuncio.IdAnun}</td>
                <td>${anuncio.AnunName}</td>
                <td>${anuncio.Description}</td>
                <td><img id="${anuncio.IdAnun}" WIDTH=70 HEIGHT=70 ></td>
                <td>${anuncio.Precio}</td>
                <td>${anuncio.Unidad}</td>
                <td>${anuncio.AnunType}</td>
                <td>${anuncio.Emprendedor}</td>
                <td>${anuncio.Category}</td>
                <td>
                    <a type="buttom" class="fas fa-edit" data-toggle="modal" data-target="#anunEditModal"
                    data-id = "${doc.id}"
                    data-ide = "${anuncio.IdAnun}"
                    data-nombre = "${anuncio.AnunName}"
                    data-descrip = "${anuncio.Description}"
                    data-img = "${anuncio.Imagen}"
                    data-precio = "${anuncio.Precio}"
                    data-und = "${anuncio.Unidad}"
                    data-type = "${anuncio.AnunType}"
                    data-empren = "${anuncio.Emprendedor}"
                    data-cat = "${anuncio.Category}"></a>
                </td>
                <td>
                    <a class="fas fa-trash-alt" data-toggle="modal" data-target="#deleteModal" data-id="${doc.id}"></a>
                </td>
            </tr>  
            `;
            // Download image from Storage
            var uri = anuncio.Imagen;   // url of img
            var ide = anuncio.IdAnun;   // id of img on table
            var httpsReference = storage.refFromURL(uri);
            
            httpsReference.getDownloadURL().then(function(url) {
                // Or inserted into an <img> element:
                var img = document.getElementById(ide);
                img.src = url;
                }).catch(function(error) {
                // Handle any errors
                });
            });
    });
}

writeData(database, anuncioTableBody); // Imprimer datos desde DB en la web


// Update DB row
$('#anunEditModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    
    var idCollAnun = button.data('id')
    var ide = button.data('ide')
    var name = button.data('nombre')
    var descrip = button.data('descrip')
    var img = button.data('img')
    var precio = button.data('precio')
    var unidad = button.data('und')
    var tipo = button.data('type')
    var emprendedor = button.data('empren')
    var categoria = button.data('cat')

    // Get values of item select
    idToEdit = idCollAnun;
    console.log(emprendedor);
    // Print values form DB
    var modal = $(this)
    modal.find('.col-sm-101 input').val(ide)
    modal.find('.col-sm-102 input').val(name)
    modal.find('.form-group textarea').val(descrip)
    modal.find('.col-sm-103 input').val(img)
    modal.find('.col-sm-104 input').val(precio)
    modal.find('.col-sm-105 input').val(unidad)
    modal.find('.col-sm-106 input').val(tipo)
    modal.find('.col-sm-107 input').val(emprendedor)
    modal.find('.col-sm-108 input').val(categoria)

  })

function updateData(id){
    var itemRef = database.collection("anuncios").doc(id);

    // Set the "capital" field of the city 'DC'
    var ide = document.getElementById('anun-id-edit').value;
    var nameNew = document.getElementById('anun-name-edit').value;
    var descripNew = document.getElementById('description-edit').value;
    var img = document.getElementById('anun-img-edit').value;
    var precio = document.getElementById('anun-precio-edit').value;
    var unidad = document.getElementById('anun-unidad-edit').value;
    var tipo = document.getElementById('anun-type-edit').value;
    var empren = document.getElementById('anun-emprendedor-edit').value;
    var cat = document.getElementById('anun-cat-edit').value;
    return itemRef.update({
        IdAnun: ide,
        AnunName: nameNew,
        Description: descripNew,
        Imagen: img,
        Precio: precio,
        Unidad: unidad,
        AnunType: tipo,
        Emprendedor: empren,
        Category: cat
    })
    .then(function() {
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
    var idAnuncio = button.data('id')
    idToDelete = idAnuncio;
  })
  
function deleteData(id){
    //console.log(id);
    database.collection("anuncios").doc(id).delete().then(function() {
        alert("¡Anuncio eleiminado correctamente!");
        window.location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}