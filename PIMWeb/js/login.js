function setup() {
  noCanvas();
  submit = select('#submit');
  submit.mousePressed(Submit);
}

function Submit() {
  let user = select('#user');
  let pwd = select('#pwd');
  let data = {
    pes_cpf: user.value(),
    pes_senha: pwd.value()
  }
  httpPost('http://localhost:56467/api/Login', data, 'json', dataPosted);
  if (SyntaxError) {
    document.getElementById("alert").style.visibility = 'visible';
  }
}

function dataPosted(result) {
  if (result) {
    if (result.pes_grup == "morador") {
      sessionStorage.setItem("usuario", JSON.stringify(result));
      window.location.href = "scc_morador.html";
    }
    if (result.pes_grup == "sindico") {
      sessionStorage.setItem("usuario", JSON.stringify(result));
      window.location.href = "scc_sindico.html";
    }
    if (result.pes_grup == "funcionario") {
      sessionStorage.setItem("usuario", JSON.stringify(result));
      window.location.href = "scc_portaria.html";
    }
  }
}