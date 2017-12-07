function setup() {
    noCanvas();
    let value1 = select('#nome');
    let sair = select('.sair');
    sair.mousePressed(sair1);
    var result = JSON.parse(sessionStorage.getItem("usuario"));

    if (result) {
        value1.html(result.pes_nome + " " + result.pes_sobrenome);
    }


    let bt1 = select('.bt1');
    let bt2 = select('.bt2');
    let bt3 = select('.bt3');

    bt1.mousePressed(sub1);
    bt2.mousePressed(sub2);
    bt3.mousePressed(sub3);

    function sub1() {
        if (result.pes_grup == "morador") {
            sessionStorage.setItem("cadastro-data", JSON.stringify(result));
            window.location.href = "cadastro.html";
        } else {
            window.location.href = "visualizar_usuario.html";
        }
    }
    function sub2() {
        window.location.href = "reserva.html";
    }
    function sub3() {
        window.location.href = "contas.html";
    }
    function sair1() {
        window.location.href = "login.html"
        localStorage.removeItem('usuario');
    }
}
var myVar = setInterval(myTimer, 1000);s
function myTimer() {
    var d = new Date(), displayDate;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        displayDate = d.toLocaleTimeString('pt-BR');
    } else {
        displayDate = d.toLocaleTimeString('pt-BR', { timeZone: 'America/Belem' });
    }
    document.getElementById("relogio").innerHTML = displayDate;
}
