function setup() {
    noCanvas();
    var result = JSON.parse(sessionStorage.getItem("usuario"));
    let param = result.pes_condo.toString();
    let api = "http://localhost:56467/api/Search/User";
    let url = api + "?condo=" + param;
    loadJSON(url, dataPost);
}
function dataPost(result) {

    for (i = 0; i < result.length; i++) {
        console.log(result);
        var a = document.createElement("A");
        a.href = "cadastro.html";
        a.textContent = "Editar";
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
        cell0.innerHTML = result[i].pes_nome;
        cell1.innerHTML = result[i].pes_email;
        cell2.innerHTML = result[i].pes_cpf;
        cell3.appendChild(a);
        cell4.appendChild(b);


        a.addEventListener("click", function () {
            let x = $(this).closest('tr').index();
            (sessionStorage.setItem("cadastro-data", JSON.stringify(result[x - 1])))
            console.log(JSON.parse(sessionStorage.getItem("cadastro-data")))
            window.location.href = "cadastro.html";
        })

        b.addEventListener("click", function () {
            let x = $(this).closest('tr').index();
            var compar = JSON.parse(sessionStorage.getItem("usuario"));

            if (compar.pes_cpf != result[x - 1].pes_cpf) {
                if (confirm("voce esta prestes a deletar um usuário ,deseja continuar?") == true) {
                    httpPost("http://localhost:56467/api/Delet/User", result[x - 1], 'json')

                    location.reload();
                }
            } else {

                window.alert("erro");
            }

        })
    }
}