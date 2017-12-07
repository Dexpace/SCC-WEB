//alt vai ter o id da reserva
var alt;

function setup() {
    noCanvas();

    //instanciando os dados do sessionStorage
    var result = JSON.parse(sessionStorage.getItem("usuario"));

    let param = result.pes_nome.toString();
    let api = "http://localhost:56467/api/Search/Reservas";
    let url = api + "?user=" + param;
    loadJSON(url, dataPost);

    let param2 = result.pes_condo.toString();
    let api2 = "http://localhost:56467/api/Search/List/Reservas";
    let url2 = api2 + "?user=" + param2;
    loadJSON(url2, comboBox);

    let edit = select("#editar")
    edit.mousePressed(Editar);

    let criar = select("#criar")
    criar.mousePressed(Criar);

    function comboBox(result) {
        for (i = 0; i < result.length; i++) {
            let x = document.getElementById("area-1");
            let option = document.createElement("option");
            option.text = result[i];
            x.add(option);
        }
    }

    function dataPost(result) {

        for (i = 0; i < result.length; i++) {
            var a = document.createElement("A");
            a.textContent = "Editar";
            a.href = "#editar-reserva";
            a.setAttribute("class", "btn btn-default");

            var b = document.createElement("A");
            b.textContent = "Deletar"
            b.setAttribute("class", "btn btn-danger");

            let tb = document.getElementById('tb');
            let row = tb.insertRow(i + 1);
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            cell0.innerHTML = result[i].reserva_area;
            cell1.innerHTML = result[i].reserva_data;
            cell2.innerHTML = result[i].reserva_datadv;
            cell3.appendChild(a);
            cell4.appendChild(b);


            a.addEventListener("click", function () {
                let x = $(this).closest('tr').index() - 1;
                let ed_area = document.getElementById("ed-area");
                let ed_data = document.getElementById("ed-data");
                let ed_datadv = document.getElementById("ed-datadv");
                alt = result[x].reserva_id;

                ed_area.value = result[x].reserva_area;
                ed_data.value = result[x].reserva_data;
                ed_datadv.value = result[x].reserva_datadv;
                let ed_reservas = document.getElementById("editar-reserva");
                ed_reservas.style.visibility = "visible";

            })

            b.addEventListener("click", function () {
                let x = $(this).closest('tr').index();
                if (confirm("voce esta preste a deletar um usuário ,deseja continuar?") == true) {
                    httpPost("http://localhost:56467/api/Delet/Reserva", result[x - 1], 'json', deucerto2)
                }
            })
        }
    }

    function Editar() {
        let ed_area = document.getElementById("ed-area");
        let ed_data = document.getElementById("ed-data");
        let ed_datadv = document.getElementById("ed-datadv");
        let data = {
            reserva_condo: result.pes_condo,
            reserva_user: result.pes_nome,
            reserva_area: ed_area.value,
            reserva_data: ed_data.value,
            reserva_datadv: ed_datadv.value,
            reserva_id: alt
        }
        if (confirm("voce esta prestes a alterar uma reserva,deseja continuar?") == true) {
            httpPost('http://localhost:56467/api/Alterar/Reserva', data, 'json', deucerto);
        }
    }

    function deucerto(result) {
        window.alert("dados alterados com sucesso")
        location.reload();
    }

    function Criar() {
        let ed_area = document.getElementById("area-1");
        let ed_data = document.getElementById("c-data");
        let ed_datadv = document.getElementById("c-datadv");
        let data = {
            reserva_condo: result.pes_condo,
            reserva_user: result.pes_nome,
            reserva_area: ed_area.value,
            reserva_data: ed_data.value,
            reserva_datadv: ed_datadv.value
        }
        if (confirm("voce esta prestes a criar uma reserva,deseja continuar?") == true) {
            httpPost('http://localhost:56467/api/Registrar/Reserva', data, deucerto);
        }
    }

    function deucerto(result) {
        window.alert("reserva criada com sucesso")
        location.reload();
    }
    function deucerto2(result) {
        window.alert("reserva deletada com sucesso")
        location.reload();
    }

}
