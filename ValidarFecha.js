function ValidaEdad(fecha_nac) {

    var valores = fecha_nac.split("-");
    var mes_nac = valores[1];
    var an_nac = valores[0];


    var fecha_act = new Date();
    var mes_act = fecha_act.getMonth() + 1;
    var an_act = fecha_act.getFullYear();

    if
        (an_act - an_nac >= 18 && mes_nac <= mes_act) { alert("Usted es mayor de edad"); return true; }

    else {
        alert("Usted es menor de edad, por favor introduzca una edad valida"); return false
    }

}

function cuenta() {
    document.forms[0].caracteres.value = document.forms[0].texto.value.length
}










