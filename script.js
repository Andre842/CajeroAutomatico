// Creamos un arreglo con los datos de las cuentas que tenemos en el banco, le asignamos un nombre, una contraseña y un saldo

const data = [
  { name: "Andrea", password: "Andrea123", balance: 350 },
  { name: "Dylan", password: "Dylan123", balance: 450 },
  { name: "Sandra", password: "Sandra123", balance: 25 },
  { name: "Paula", password: "Paula123", balance: 650 },
];

//Creamos una lista, luego la enlazamos a la lista seleccionada del HTML para que se puedan visualizar los elementos (nombres de las cuentas)
const counts = [data[0].name, data[1].name, data[2].name, data[3].name];
const select = document.getElementById("accountNumber");
counts.forEach((opcion) => {
  const option = document.createElement("option");
  option.text = opcion;
  select.add(option);
});

//Creamos una función para generar un mensaje de error 
function alertError(mnj) {
  Swal.fire({
    title: 'Error',
    text: mnj,
    color: '#3A207E ',
    background: '#DCE8E9',
    width: '80vh',
    confirmButtonColor: '#04166C',
    confirmButtonText: 'Aceptar',
  });
};

//Creamos una función para generar un mensaje de éxito
function alertSuccess(mnj, title) {
  Swal.fire({
    title: title,
    text: mnj,
    color: '#3A207E ',
    background: '#DCE8E9',
    width: '80vh',
    confirmButtonColor: '#04166C',
    confirmButtonText: 'Aceptar',
  });
};

//Creamos una función para validar las credenciales y poder ingresar a realizar las transacciones
let loggedIn = false;
function login() {
  const count = document.getElementById("accountNumber").value;
  const password = document.getElementById("password").value;
  if ((count === data[0].name && password == data[0].password) || (count === data[1].name && password == data[1].password) || (count === data[2].name && password == data[2].password) || (count === data[3].name && password == data[3].password)) {
    alertSuccess(`Bienvenido ${count}`, 'Aprobado');
    loggedIn = true;
    document.getElementById("login").style.display = "none";
    document.getElementById("transaction").style.display = "block";
  } else {
    alertError('Usuario o contraseña incorrecta, Inténtalo nuevamente');
  };
};

//Creamos una función para validar el saldo de la cuenta
function checkBalance() {
  let count = document.getElementById("accountNumber");
  if (count.value == "Andrea") {
    balanceActual = data[0].balance;
    alertSuccess(`Su saldo es de $${balanceActual} pesos`, 'Consuta de Saldo');
  } else if (count.value == "Dylan") {
    balanceActual = data[1].balance;
    alertSuccess(`Su saldo es de $${balanceActual} pesos`, 'Consuta de Saldo');
  } else if (count.value == "Sandra") {
    balanceActual = data[2].balance;
    alertSuccess(`Su saldo es de $${balanceActual} pesos`, 'Consuta de Saldo');
  } else if (count.value == "Paula") {
    balanceActual = data[3].balance;
    alertSuccess(`Su saldo es de $${balanceActual} pesos`, 'Consuta de Saldo');
  } else {
    alertError("Sin saldo");
  }
  return balanceActual;
};

//Creamos una funcion para depositar dinero en la cuenta y validamos que no se pase del tope permitido ($990)
function deposit() {
  if (loggedIn) {
    checkBalance();
    Swal.fire({
      title: 'Ingrese la cantidad a depositar',
      input: 'number',
      color: '#3A207E',
      background: '#DCE8E9',
      width: '80vh',
      confirmButtonColor: '#04166C',
      confirmButtonText: 'Aceptar',
    })
    .then(result => {
      if (result.value) {
        let amount = result.value;
          suma = parseFloat(balanceActual) + parseFloat(amount);
        if (suma <= 990){
          alertSuccess(`su nuevo saldo es $${suma} pesos`, 'Deposito Exitoso');
        } else {
          alertError('No puede superar el valor limite que son $990');
        };
      };
    });
  } else {
    alertError("Debes iniciar sesión primero.");
  };
};

//Creamos una funcion para retirar dinero en la cuenta y validamos que deje un saldo de almenos $10
function withdraw() {
  if (loggedIn) {
    checkBalance();
    Swal.fire({
      title: 'Ingrese la cantidad a retirar',
      input: 'number',
      color: '#3A207E ',
      background: '#DCE8E9',
      width: '80vh',
      confirmButtonColor: '#04166C',
      confirmButtonText: "Aceptar",
    })
    .then(result => {
      if (result.value) {
        let amount = result.value;
        if (balanceActual > amount) {
          newBalance = balanceActual - amount;
          if (newBalance >= 9){
            alertSuccess(`su nuevo saldo es $${newBalance} pesos`, 'Retiro Exitoso');
          }else {
            alertError('No puede retirar esa cantidad debe dejar al menos $10 pesos en su cuenta');
          };
        }else {
          alertError('Su saldo es insuficiente');
        };    
      };
    });
  } else {
    alertError("Debes iniciar sesión primero.");
  };
};

//Creamos una función para devolvernos al menú de login
function logout() {
  loggedIn = false;
  document.getElementById("login").style.display = "block";
  document.getElementById("transaction").style.display = "none";
  document.getElementById("accountNumber").value = "";
  document.getElementById("password").value = "";
};

