// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyAMS3hgd-TyFhGkDaK9nmoUHGe-1q4nIf8",
    authDomain: "pruebainicial-4b2dd.firebaseapp.com",
    databaseURL: "https://pruebainicial-4b2dd.firebaseio.com",
    projectId: "pruebainicial-4b2dd",
    storageBucket: "pruebainicial-4b2dd.appspot.com",
    messagingSenderId: "653211761085",
    appId: "1:653211761085:web:f6af959b2e10ba1f427ad4",
    measurementId: "G-J5LYNZZG06"
}

firebase.initializeApp(firebaseConfig);

const dns= "http://18.220.240.102/";
//const server = "file:///C:/Users/fabio/Documents/Proyecto%20DS%202020-2/template/index.html";
const server = "http://emprentec.ga/index.html";
const photoUser = document.getElementById("userDropdown");

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("user: " + email);
      var currentUser = firebase.auth().currentUser;
      /**
       // ACTUALIZAR DATOS DE ADMINISTRADORES
       
      if (email == "ftorres@emprentec.pe") {
        currentUser.updateProfile({
          displayName: "Fabio Torres",
          photoURL: "img/undraw_profile.svg"
        }).then(function() {
          // Update successful.
          console.log(email + "actualizado")
        }).catch(function(error) {
          // An error happened.
        });
      } if (email == "jastuvilca@emprentec.pe") {
        currentUser.updateProfile({
          displayName: "Joel Astuvilca",
          photoURL: "img/undraw_profile.svg"
        }).then(function() {
          // Update successful.
          console.log(email + "actualizado")
        }).catch(function(error) {
          // An error happened.
        });
      } if (email == "bflores@emprentec.pe") {
        currentUser.updateProfile({
          displayName: "Bernardo Flores",
          photoURL: "img/undraw_profile.svg"
        }).then(function() {
          // Update successful.
          console.log(email + "actualizado")
        }).catch(function(error) {
          // An error happened.
        });
      } if (email == "lbriones@emprentec.pe") {
        currentUser.updateProfile({
          displayName: "Luigi Briones",
          photoURL: "img/undraw_profile.svg"
        }).then(function() {
          // Update successful.
          console.log(email + "actualizado")
        }).catch(function(error) {
          // An error happened.
        });
      }
       */
        
      photoUser.innerHTML += `<span class="mr-2 d-none d-lg-inline text-gray-600 small">${currentUser.displayName}</span>
      <img class="img-profile rounded-circle"
          src="${currentUser.photoURL}">`;
      // ...
    } else {
      var currentURL = window.location;
      // User is signed out.
      if (currentURL != server) {
        if (currentURL == dns) {
          location.href = server;
	      } else {
        	location.href = `./index.html`;
	      }
      }
    }
  });

// Login
function  clickLogin() {
    var user = document.getElementById("inputUser").value;
    var password = document.getElementById("inputPassword").value;
    firebase.auth().signInWithEmailAndPassword(user,password).then(function() {
        location.href = `./main.html`;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

// Logout
function clickLogout() {
    firebase.auth().signOut().then(function() {
        console.log("Cerrando sesión")
        location.href = `./index.html`;
    }).catch(function() {
        console.log(error)
    })
}


// Varibles y constantes
var database = firebase.firestore();
const mainTableBody = document.getElementById("tableBodyMain");

function writeData(db, idTable) {
    db.collection("transacciones").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const trans = doc.data();
            idTable.innerHTML += `
            <tr>
                <td>${trans.id}</td>    
                <td>${trans.usuario}</td>
                <td>${trans.producto}</td>
                <td>${trans.fecha}</td>
                <td>${trans.emprendedor}</td>
            </tr>  
            `;
            });
    });
}

writeData(database,mainTableBody); // Imprimer datos desde DB en la web


//===== Estadisticas =====//
var anuncio = document.getElementById("anuncios");
var ganancia = document.getElementById("ganancias");
var pedido = document.getElementById("pedidos");
var venta = document.getElementById("ventas");

database.collection("metricas").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      const metric = doc.data();
      anuncio.innerHTML = `${metric.anuncios}`;
      ganancia.innerHTML = `s/. ${metric.ganancias}`;
      pedido.innerHTML = `${metric.pedidos}`;
      venta.innerHTML = `${metric.ventas}%`;
      });
});