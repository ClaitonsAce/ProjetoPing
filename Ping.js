// variáveis globais
//arrays globais
var arrayIp = [];
var arrayMask = [];
var delay = [];
var ipToMask;
var contagem = [];
var ipToNum = [];
var tipoIp = [];
var arrayBackspace = [];
var comando = [];
var arrayTxta;
// quantidade de máquinas
var qnt;
// variáveis globais
var txta;
var ultimasEntradas;
var ultComando = 1;
var noTexto = 0;
var loop = 0;
var contaSeta = 0;
var numSeta;
var recebido = 0;
var perdido = 0;
var atraso = 0;
function criaIp(){
    qnt = document.getElementById("numIp").value;
    var f = document.getElementById("form1");
    
    if(qnt < 2 | 5 < qnt){// se for um número não aceito
        alert("Quantidade insuficiente ou excessiva: " + qnt);
        return
    }
    for(var i = 0; i <= qnt; i++){

        if(i == 0){   
            var p = document.createElement("p");
            p.setAttribute("id","pMaquinas");
            p.innerText = "Endereço das máquinas:"

            f.appendChild(p);

            document.getElementsByTagName('body')[0].appendChild(f);
            continue
        }
        
        var b = document.createElement("br");
        b.setAttribute("id","br"+i);
        var ip = document.createElement("input");
        ip.setAttribute('type','text');
        ip.setAttribute('id','txtIp' + i);
        ip.setAttribute('value','192.168.1.1'+i);

        f.appendChild(ip);
        if(i == 1){
            var s = document.createElement("span");
            s.innerHTML = " (Sua máquina)";
            s.setAttribute("id","span1");
            f.appendChild(s);
        }
        f.appendChild(b);

        document.getElementsByTagName('body')[0].appendChild(f);
        if(i == qnt){

            var select = document.createElement("select");
            var op = document.createElement("option");
            var op2 = document.createElement("option");
            select.setAttribute("id","slcTipo");
            op.setAttribute("value","Wifi");
            op.innerHTML = "Wifi";
            op2.setAttribute("value","Cabeado");
            op2.innerHTML = "Cabeado";
            select.appendChild(op);
            select.appendChild(op2);

            var p = document.createElement("p");
            p.setAttribute("id","pTipoRede");
            p.innerHTML = "Escolha o tipo da rede!"; 
                        
            var s = document.createElement("input");
            s.setAttribute('type',"submit");
            s.setAttribute('value',"Confirmar");
            s.setAttribute("id","btnGuardaCria");
            s.setAttribute("onclick","verificaIp();");
                    
            document.getElementsByTagName('body')[0].appendChild(p);
            document.getElementsByTagName('body')[0].appendChild(f.appendChild(select));
                        
            document.getElementsByTagName('body')[0].appendChild(f.appendChild(s));

            var btn = document.getElementById("btnHtml")
            btn.parentNode.removeChild(btn);
        }
    }
    
}
function verificaIp(){// todas as condições para filtrar o ip para somente os válidos
    var f = 0;
    for (i = 1; i <= qnt; i++){
        ipCampo = document.getElementById("txtIp" + i).value;
        if(ipCampo.indexOf(".") == -1){
            alert("Ip não contem '.'");
            return
        }
        verIp = ipCampo.split(".");
        if(verIp.length > 4){
            alert("O ip só deve possuir 4 campos, sem ponto no final");
            return
        }
        for(j =0; j<= 3; j++){
            if(verIp[j].indexOf("0") == 0 && verIp[j].length > 1){
                alert("Não é permitido 0 no começo do número");
                return
            }
            ipToNum[f] = Number(verIp[j]);
            var espaco = verIp[j].search(/\s/);
            if(espaco >= 0){
                alert("Não é permitido espaços");
                return
            }
            if (verIp[j] == ""){
                alert("Não é permitido campos vazios")
                return
            }
            if(isNaN(ipToNum[f])){
                alert("Não é permitido letras ou campos com menos de 4 divisões do ip");
                return
            }
            f++;
        }
    }
    for(i = 0; i <= ipToNum.length; i++){
        if(i == 0 || i == 4 || i == 8 || i == 12 || i == 16 || i == 20){
            if(ipToNum[i] == 0){
                alert("a primeira divisão do ip não pode ser 0");
                return
            }
            if(ipToNum[i] > 223){
                alert("o número da primeira divisão não pode ser maior que o tipo C (223)")
                return
            }

        }
        if(i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23){
            if(ipToNum[i] == 0){
                alert("No Ultimo digito, o número '0' está reservado para a rede");
                return
            }
            if(ipToNum[i] == 255){
                alert("No Ultimo digito, o número '255' está reservado para o broadcast");
                return
            }
            if(i == 3){
                if( ipToNum[i] == ipToNum[7] ||
                    ipToNum[i] == ipToNum[11] || ipToNum[i] == ipToNum[15] ||
                    ipToNum[i] == ipToNum[19] || ipToNum[i] == ipToNum[23]){
                        alert("Dois ou mais campos com valores iguais");
                        return 
                    }
            }
            if(i == 7){
                if( ipToNum[i] == ipToNum[11] || ipToNum[i] == ipToNum[15] ||
                    ipToNum[i] == ipToNum[19] || ipToNum[i] == ipToNum[23]){
                        alert("Dois ou mais campos com valores iguais");
                        return
                    }
            }
            if(i == 11){
                if( ipToNum[i] == ipToNum[15] || ipToNum[i] == ipToNum[19] || 
                    ipToNum[i] == ipToNum[23]){
                        alert("Dois ou mais campos com valores iguais");
                        return
                    }
            }
            if(i == 15){
                if( ipToNum[i] == ipToNum[19] || 
                    ipToNum[i] == ipToNum[23]){
                        alert("Dois ou mais campos com valores iguais");
                        return
                    }
            }
            if( i == 19){
                if( ipToNum[i] == ipToNum[23]){
                        alert("Dois ou mais campos com valores iguais");
                        return
                    }
            }
        }
        if(ipToNum[i] < 0) {
            alert("o campo do Ip não pode ser menor que 0");
            return
        }
        if(ipToNum[i] > 255){
            alert("Não pode ser maior que 255");
            return
        }
        
    }
    for(i = 1; i <= qnt; i++){//pega o tipo e adiciona a máscara
        ipCampo = document.getElementById("txtIp" + i).value;
        arrayIp.push(ipCampo);
        ipToMask = Number(ipCampo.slice(0,3));
        if((ipToMask >= 0) && (ipToMask <= 127)){ //tipo A
            tipoIp.push("A");
            arrayMask.push("255.0.0.0");
        }
        if((ipToMask >= 128) && (ipToMask <= 191)){ //tipo B
            tipoIp.push("B");
            arrayMask.push("255.255.0.0");
        }
        if((ipToMask >= 192) && (ipToMask <= 223)){ //tipo C
            tipoIp.push("C");
            arrayMask.push("255.255.255.0");
        }
    }
    criaRede();
    
}
function criaRede(){// cria todas as imagens da rede e o textarea do prompt

    var suaRede = document.createElement("p");
    suaRede.innerHTML = "Sua rede: "
    document.getElementsByTagName("body")[0].appendChild(suaRede);
                
    var imagem2 = document.createElement("img");
    imagem2.setAttribute("src","Janela_prompt.png");
                
    var t = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var td2 = document.createElement("td");

    var d2 = document.createElement("div");
    d2.setAttribute("class","painel");
    txta = document.createElement("textarea");
    txta.setAttribute("spellcheck","false");
    txta.setAttribute("id","txta");
    txta.innerHTML = "Macrohard Doors [versão 1.1.4444]" + "\n" +
    "Copycomedia (c) 2009 Macrohard Corporation. Nenhum direito reservado." + "\n" +
    "Z:\\Users\\Zilean>";
    txta.addEventListener("keyup",function (e) {
        if (e.keyCode === 13) {//enter //encaminha o comando para a função txtaEnter
            e.preventDefault();
            txtaEnter()
            contaSeta = 0;
        }
    });
    txta.addEventListener("keydown", function (e) {// previnir de apagar o texto
        if(e.keyCode === 40){//seta baixo
            e.preventDefault();
        }
        else if (e.keyCode === 38) {//seta cima //dar a ultimo elemento escrito pro usuário
            e.preventDefault();
            var ultimoValor = arrayTxta.length - 1;

            txta.value += arrayTxta[ultimoValor].replace("\n",'');//tira o espaço
            arrayBackspace = (txta.value).split("");
            var ultimoValor = arrayBackspace.length - 1;
            for(i = ultimoValor; i >=0; i--){
                if(arrayBackspace[i] == ">"){
                    numSeta = ultimoValor - i;
                }
            }
            if(contaSeta != 0){
                contaSeta = 0;
            }
            
        }
        else if(e.keyCode === 39){//seta direita //diminuir o contador de quantos caracteres faltam para o usuário não poder apagar mais
            if(contaSeta == 0){
                return
            }
            if(contaSeta == numSeta){
                contaSeta--;
                return
            }
            else {
                contaSeta--;
            }
        }
        else if(e.keyCode === 8) {// backspace //não deixar o usuário apagar o campo escrito pelo programa
            arrayBackspace = (txta.value).split("");
            var ultimoValor = arrayBackspace.length - 1;
            if((txta.value).split("")[ultimoValor] == ">"){
                e.preventDefault();
                return
            }
            else { 
                if(contaSeta == numSeta){
                    e.preventDefault();
                }
                else{
                    numSeta--;
                }
            }
        }
        else if(e.keyCode === 37) {//seta esquerda //não deixar o usuário passar para o campo escrito pelo programa
            arrayBackspace = (txta.value).split("");
            var ultimoValor = arrayBackspace.length - 1;
            if(arrayBackspace[ultimoValor] == ">"){
                e.preventDefault();
                return
            }
            for(i = ultimoValor; i >=0; i--){
                if(arrayBackspace[i] == ">"){
                    numSeta = ultimoValor - i;
                }
            }
            if(contaSeta == numSeta){
                e.preventDefault();
            }
            else {
                contaSeta++;
            }
        }
    });
    txta.addEventListener("focus", function () {//quando estiver no texto, inibe todos os clicks no texto
        //e atualiza o mouse para sempre ir pro final do texto
        noTexto=1;
        loop = 0;
        recebido = 0;
        perdido = 0;
        txta.disable = true;
        setTimeout(function (){
            var valorTxt = txta.value;
            txta.value = "";
            txta.value = valorTxt;
            txta.disable = false;
        },1);
    });
    txta.addEventListener("blur",function (){//quando estiver fora do texto, o texto pode ser clicado novamente
        noTexto = 0;
        contaSeta = 0;
    });
    txta.addEventListener("mousedown", function(e){//não pode clicar duas vezes no textarea (prompt)
        if(noTexto == 1){
            e.preventDefault();        }
    });
                
    d2.appendChild(imagem2);
    d2.appendChild(txta);
                
    for(var i = 0; i <= qnt ; i++){//cria uma imagem para a qualidade da internet das maquinas

        if(i == 0){//cria uma imagem para a própria internet
            var d = document.createElement("div");
            d.setAttribute("class","sinal");
                        
            var imagem = document.createElement("img");
            imagem.setAttribute("id","imagemSinal" + i);
            imagem.setAttribute("src","Sinal55.png");
            imagem.setAttribute("onclick","mudaImagem(" + i + ");");
            var span = document.createElement("span");
            var b = document.createElement("b");
            b.setAttribute("id","bQualidade"+ i);
            b.innerHTML = "On";
            span.innerHTML = "Internet: ";
            span.appendChild(b);                    
                                  
            d.appendChild(imagem);
            d.appendChild(span);
                        
            td.appendChild(d);

            continue

        }
        if(i == 1){//imagem própria para o pc do usuário
            var d = document.createElement("div");
            d.setAttribute("class","sinalpc");
                        
            var imagem = document.createElement("img");
            imagem.setAttribute("id","imagemSinal" + i);
            imagem.setAttribute("src","Sinal55.png");
            imagem.setAttribute("onclick","mudaImagem(" + i + ");");

            var span = document.createElement("span");
            span.innerHTML = "Qualidade do Sinal: ";
            var b = document.createElement("b");
            b.setAttribute("id","bQualidade"+ i);
            b.innerHTML = "Excelente";

            span.appendChild(b);                    
                        
            var p = document.createElement("p");

            var bIp = document.createElement("b");
            bIp.setAttribute("id","bIp");
                        
            var bMascara = document.createElement("b");
            bMascara.setAttribute("id","bMascara");
                        
            p.innerHTML = "Ip : <b>" + arrayIp[i-1] + "</b> Máscara: <b>" + arrayMask[i-1] + "</b>";
                        
            d.appendChild(imagem);
            d.appendChild(span);
            d.appendChild(p);
                        
            td.appendChild(d);
            
            continue
        }
        var d = document.createElement("div");
        d.setAttribute("class","sinal");
                    
        var imagem = document.createElement("img");
        imagem.setAttribute("id","imagemSinal" + i);
        imagem.setAttribute("src","Sinal55.png");
        imagem.setAttribute("onclick","mudaImagem(" + i + ");");

        var span = document.createElement("span");
        span.innerHTML = "Qualidade do Sinal: ";
        var b = document.createElement("b");
        b.setAttribute("id","bQualidade"+ i);
        b.innerHTML = "Excelente";

        span.appendChild(b);                    
                    
        var p = document.createElement("p");

        var bIp = document.createElement("b");
        bIp.setAttribute("id","bIp");
                    
        var bMascara = document.createElement("b");
        bMascara.setAttribute("id","bMascara");
                    
        p.innerHTML = "Ip : <b>" + arrayIp[i-1] + "</b> Máscara: <b>" + arrayMask[i-1] + "</b>";
                    
        d.appendChild(imagem);
        d.appendChild(span);
        d.appendChild(p);
                    
        td.appendChild(d);
    } 
    td2.appendChild(d2);
    tr.appendChild(td);
    tr.appendChild(td2);
    t.appendChild(tr);

    document.getElementsByTagName("body")[0].appendChild(t);

    for(var i = 0; i <= qnt; i++){//usado para trocar imagens e remover elementos repetitivos
        if(i == 0){//imagem da internet
            contagem.push(i+"4");
            continue
        }
        contagem.push(i+"4");
        var ipDrop = document.getElementById("txtIp"+i);
        ipDrop.parentNode.removeChild(ipDrop);

        var brDrop = document.getElementById("br"+i);
        brDrop.parentNode.removeChild(brDrop);
    }
    //remove os elementos
    var s = document.getElementById("span1");
    s.parentNode.removeChild(s);

    var spanMaq = document.getElementById("spanMaq");
    spanMaq.parentNode.removeChild(spanMaq);

    var numIp = document.getElementById("numIp");
    numIp.parentNode.removeChild(numIp);

    var pMaq = document.getElementById("pMaquinas");
    pMaq.parentNode.removeChild(pMaq);

    var pTR = document.getElementById("pTipoRede");
    pTR.parentNode.removeChild(pTR);

    var slcTipo = document.getElementById("slcTipo");
    slcTipo.parentNode.removeChild(slcTipo);

    var btnGC = document.getElementById("btnGuardaCria");
    btnGC.parentNode.removeChild(btnGC);

} 


function mudaImagem(identify){//muda a qualidade da internet ou liga e desliga ela
    if(identify == "0"){//se a primeira imagem chamar a função 
        if(contagem[identify] == "00"){//se o string da lista da primeira imagem for 00 
        //(Internet sem sinal Dns)
            
            for(i = 0; i <= qnt; i++){//para cada loop mude a imagem de todos para 04 (Excelente)
                if(i == 0){//se for o primeiro loop mude a imagem e o mensagem para "On"
                    document.getElementById("imagemSinal" + i).setAttribute("src","Sinal55.png");
                    document.getElementById("bQualidade" + i).innerHTML = "On";
                    contagem[i] = "04";
                    atraso = 0;
                    continue
               }
                
                document.getElementById("imagemSinal" + i).setAttribute("src","Sinal55.png");
                document.getElementById("bQualidade" + i).innerHTML = "Excelente";
                contagem[i] = i + "4";
                if(i == qnt){//se for o último loop saia da função
                    
                    return
                }
            }

        }
        if(contagem[identify] == "04"){//se a string do array da primeira imagem for 04 (Imagem Excelente internet On)
            
            for(i = 0; i <= qnt; i++){//para cada loop mude a imagem de todos para Sem sinal
                if(i == 0){//no primeiro loop mude a imagem e a mensagem para "Off"
                    document.getElementById("imagemSinal" + i).setAttribute("src","Sinal05.png");
                    document.getElementById("bQualidade" + i).innerHTML = "Off";
                    contagem[i] = i + "6";
                    continue
                }
                document.getElementById("imagemSinal" + i).setAttribute("src","Sinal05.png");
                document.getElementById("bQualidade" + i).innerHTML = "Sem Internet";
                contagem[i] = i + "6";
                if(i == qnt){//no ultimo loop saia da função
                    return
                }
                
            }

        }
        if(contagem[identify] == "06"){//se a string do array da primeira imagem for 06 (Internet off)
            atraso = 0;
            for(i = 0; i <= qnt; i++){//para cada loop mude a imagem de todos para Erro DNS
                document.getElementById("imagemSinal" + i).setAttribute("src","Sinal56.png");
                document.getElementById("bQualidade" + i).innerHTML = "Erro DNS";
                contagem[i] = i + "0";
                
                if(i == qnt){//no ultimo loop saia da função
                    return
                }
                
            }

        }
        
        
    }
    else {
        if(contagem[0] == "00" || contagem[0] == "06"){//se a imagem da internet estiver no "Sem sinal" ou "erro DNS"
        //nenhuma imagem pode ser alterada
            return
        }
    if(contagem[1] == identify + "7"){// se a primeira imagem chamar a função mude de sem sinal para sem placa de rede
        document.getElementById("imagemSinal" + 1).setAttribute("src","Sinal57.png");
        document.getElementById("bQualidade" + 1).innerHTML = "Sem Placa de Rede!";
        contagem[identify] = identify + "5";
        return
    }
    if(contagem[identify] == identify + "5"){//muda de Sem sinal para Excelente
        document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal55.png");
        document.getElementById("bQualidade" + identify).innerHTML = "Excelente";
        contagem[identify] = identify + "4";//no proximo clique mude para otima
        if(identify == 1) {
            atraso = 0;
        }
    }
    else if(contagem[identify] == identify + "4"){//mude de excelente para otimo e etc...
        document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal45.png");
        document.getElementById("bQualidade" + identify).innerHTML = "Ótima";
        contagem[identify] = identify + "3";
        if(identify == 1) {
            atraso = 20;
        }
    }
    else if(contagem[identify] == identify + "3"){
        document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal35.png");
        document.getElementById("bQualidade" + identify).innerHTML = "Boa";
        contagem[identify] = identify + "2";
        if(identify == 1) {
            atraso = 40;
        }
    }
    else if(contagem[identify] == identify + "2"){
        document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal25.png");
        document.getElementById("bQualidade" + identify).innerHTML = "Ruim";
        contagem[identify] = identify + "1";
        if(identify == 1) {
            atraso = 80;
        }
    }
    else if(contagem[identify] == identify + "1"){
        document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal15.png");
        document.getElementById("bQualidade" + identify).innerHTML = "Péssima";
        contagem[identify] = identify + "0";
        atraso = 160;
    }
    else {
        if(contagem[1] == identify + "0"){//se a imagem do computador chamar a função mude de sinal péssimo para sem internet
            document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal05.png");
            document.getElementById("bQualidade" + identify).innerHTML = "Sem Internet";
            contagem[1] = identify + "7";// e a próxima vez que clicarem mude para sem placa de rede
            return
        }
        else {
            document.getElementById("imagemSinal" + identify).setAttribute("src","Sinal05.png");// se for outra máquina
            document.getElementById("bQualidade" + identify).innerHTML = "Sem Internet";//muda para sem internet
            contagem[identify] = identify + "5";
        }
    }
}
}
function txtaEnter() {
    arrayTxta= (txta.value).split("Z:\\Users\\Zilean>");// divide todo o textarea (prompt) em tudo que está users zilean
    comando = arrayTxta[ultComando].split(" ");//divide o comando do usuário em 2 partes
    if((comando[0].toLowerCase() == "ping") ){//&& comando[1] != ""){ //se a primeira parte for ping
        if(comando[1].replace("\n","") == "loopback" || comando[1].replace("\n","") == "localhost" 
            || comando[1].replace("\n","") == "127.0.0.1" || comando[1].replace("\n","") == arrayIp[0]){//se a segunda parte foi loopback
                if(comando[1].replace("\n","") == arrayIp[0]){
                    txta.value += "\nDisparando"+ arrayIp[0] + "com 32 bytes de dados:\n";
                    txtaDelay(true,"loopback");
                    ultComando++;
                }
                txta.value += "\nDisparando ::1: com 32 bytes de dados:\n";
                txtaDelay(true,"loopback");
                ultComando++;
                return
            }
        if(comando[1].replace("\n","") == "google.com" || comando[1].replace("\n","") == "google.com.br"  
            || comando[1].replace("\n","") == "www.google.com" || comando[1].replace("\n","") == "www.google.com.br"
            || comando[1].replace("\n","") == "https://www.google.com" || comando[1].replace("\n","") == "https://www.google.com.br"
            || comando[1].replace("\n","") == "8.8.8.8"){ //se a segunda parte for google
                if(comando[1].replace("\n","") == "8.8.8.8"){//se for o endereço ip do google
                    txta.value += "\nDisparando " + comando[1].replace("\n","") + " com 32 bytes de dados:\n";
                    txtaDelay(true,"8.8.8.8");
                    ultComando++;
                    return
                }
                else {// se for o endereço físico do google
                    txta.value += "\nDisparando " + comando[1].replace("\n","") + " [8.8.8.8] com 32 bytes de dados:\n";
                    txtaDelay(true,comando[1].replace("\n",""));
                    ultComando++;
                    return
                }
            }
        txta.value += "\nDisparando " + comando[1].replace("\n","") + " com 32 bytes de dados:\n";
        for(i = 1; i <= qnt; i++){// se for algum endereço de máquina da rede do usuário
            if(comando[1].replace("\n","") == arrayIp[i-1]){
                txtaDelay(true,i);
                ultComando++;
                return
            }
        }
        if(isNaN(comando[1].split(".")[0])){//se for palavra
            txtaDelay(true,-1);
            ultComando++;
            return 
        }
        else {//se for endereço de ip errado
            txtaDelay(false,comando[1]);
            ultComando++;
            return
        }
    }
    else if(comando[0] != ""){//se for algum comando além de ping
        txta.value += "Comando não reconhecido \n";
        txta.value += "Z:\\Users\\Zilean>";
        ultComando++;
    }
    else {// se for somente o enter
        txta.value += "Z:\\Users\\Zilean>";
        ultComando++;
    }
    
}
function txtaDelay(existe,internet){//https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop#:~:text=The%20setTimeout()%20function%20is,in%20succession%20without%20any%20delay.
    if(existe && -1 == internet){//se for palavra
        setTimeout(function() {
            txta.value += "\nA solicitação ping não pôde encontrar o host " + comando[1].replace("\n","") +
            ". Verifique o nome e tente novamente.\n";
            txta.value += "Z:\\Users\\Zilean>";
        },100);
        return
    }
    else if(existe && internet > 0){// se for um ping em uma máquina da rede
        if(contagem[1] != "17" && contagem[1] != "15" && contagem[i] != i+"5" && contagem[0] != "06"){
        //se não estiver sem placa de rede, sem internet no computador do usuário ou sem internet na máquina de destino
            txta.disabled = true;
            if(loop < 4){// número aleatório entre 10 e 29 (eu acho(tá funcionando))
                tempo = Math.floor(Math.random()* 20) + 10;
            }
            else { // no ultimo loop não tenha delay
                tempo = 0;
            }
            setTimeout(function(){
                loop++;
                if(loop < 5){ //enquanto o loop for menor que 5
                    recebido++;
                    txta.value += "\nResposta de " + arrayIp[internet - 1] + ": bytes=32 tempo="+ tempo + "ms TTL=117";
                    delay.push(tempo);
                    txtaDelay(true,internet);
                }
                if(loop == 5){//quando for o 5º loop
                    txta.value += "\n\nEstatísticas do Ping para "+ arrayIp[internet - 1] + "\n" +
                    "   Pacotes: Enviados = 4, Recebidos =" + recebido + ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n"
                    txta.value += "Aproximar um número redondo de vezes em milissegundos:\n"+
                    "   Mínimo = " + Math.min.apply(Math,delay) + "ms, Máximo = " + Math.max.apply(Math,delay) + "ms, Média = " + parseInt(delay.reduce(media)/4) + "\n\n";
                    txta.value += "Z:\\Users\\Zilean>";
                    delay = [];
                    return txta.focus();
                    }
            },tempo * 10);
            txta.disabled = false;
        }else { // se não vá para a parte falsa dessa função
            txtaDelay();
        }
    }
    else if (existe && internet == "loopback"){ // se for o loop back
        txta.disabled = true;
        setTimeout(function(){
            loop++;
            if(contagem[1]== "15"){// se estiver sem placa de rede
                if(loop < 5){
                    txta.value += "\nPING: transmit failed. General failure.";
                    perdido++;
                    txtaDelay(true,"loopback");
                }
                if(loop == 5){
                    txta.value += "\n\nEstatísticas do Ping para ::1:\n" +
                    "   Pacotes: Enviados = 4, Recebidos ="+ recebido+ ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n";
                    txta.value += "Z:\\Users\\Zilean>";
                    return txta.focus()
                }
            }
            else{
                if(loop < 5){// se estiver com a placa de rede
                    txta.value += "\nResposta de ::1: bytes=32 tempo<1ms";
                    recebido++;
                    txtaDelay(true,"loopback");
                }
                if(loop == 5){
                    txta.value += "\n\nEstatísticas do Ping para ::1:\n" +
                    "   Pacotes: Enviados = 4, Recebidos =" + recebido + ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n";
                    txta.value += "Aproximar um número redondo de vezes em milissegundos:\n"+
                    "   Mínimo =0ms, Máximo =0ms, Média =0ms \n\n";
                    txta.value += "Z:\\Users\\Zilean>";
                    return txta.focus()
                }
            }
        },1000);
        txta.disabled = false;
    }
    else if (existe && (internet == "google.com" || internet == "google.com.br" 
    || internet == "www.google.com" || internet == "www.google.com.br"
    || internet == "https://www.google.com" || internet == "https://www.google.com.br" || internet == "8.8.8.8")){
        if(contagem[0] == "06" || contagem[1] == "17" || contagem[1] == "15"){//Sem internet ou sem placa de rede
            txtaDelay(false,"8.8.8.8");
        }
        else if(contagem[0] == "00"){//Erro DNS
            if(internet == "8.8.8.8"){// se for o endereço ip
                txta.disabled = true;
                if(loop < 4){
                    tempo = Math.floor(Math.random()* 20) + 10;
                    tempo += atraso;// adiciona atraso caso a internet esteja lenta
                }
                else {
                    tempo = 0;
                }
                setTimeout(function(){
                    loop++;
                    if(loop < 5){
                        txta.value += "\nResposta de 8.8.8.8: bytes=32 tempo="+ tempo + "ms TTL=117";
                        recebido++;
                        delay.push(tempo);
                        txtaDelay(true,internet);
                    }
                    if(loop == 5){
                        txta.value += "\n\nEstatísticas do Ping para 8.8.8.8:\n" +
                        "   Pacotes: Enviados = 4, Recebidos =" + recebido + ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n";
                        txta.value += "Aproximar um número redondo de vezes em milissegundos:\n"+
                        "   Mínimo = " + Math.min.apply(Math,delay) + "ms, Máximo = " + Math.max.apply(Math,delay) + "ms, Média = " + parseInt(delay.reduce(media)/4) + "ms\n\n";
                        txta.value += "Z:\\Users\\Zilean>";
                        delay = [];
                        return txta.focus();
                        }
                },tempo * 10);
                txta.disabled = false;
            }
            else {
                txtaDelay();
            }
        }
        else {
            txta.disabled = true;
                if(loop < 4){
                    tempo = Math.floor(Math.random()* 20) + 10;
                    tempo += atraso;
                }
                else {
                    tempo = 0;
                }
                setTimeout(function(){
                    loop++;
                    if(loop < 5){
                        txta.value += "\nResposta de 8.8.8.8: bytes=32 tempo="+ tempo + "ms TTL=117";
                        recebido++;
                        delay.push(tempo);
                        txtaDelay(true,internet);
                    }
                    if(loop == 5){
                        txta.value += "\n\nEstatísticas do Ping para 8.8.8.8:\n" +
                        "   Pacotes: Enviados = 4, Recebidos =" + recebido + ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n";
                        txta.value += "Aproximar um número redondo de vezes em milissegundos:\n"+
                        "   Mínimo = " + Math.min.apply(Math,delay) + "ms, Máximo = " + Math.max.apply(Math,delay) + "ms, Média = " + parseInt(delay.reduce(media)/4) + "ms\n\n";
                        txta.value += "Z:\\Users\\Zilean>";
                        delay = [];
                        return txta.focus();
                        }
                },tempo * 10);
                txta.disabled = false;
        }
    }
    else{// parte falsa, retorna tempo esgotado
        txta.disabled = true;
        setTimeout(function(){
            loop++;
                if(loop < 5){
                    txta.value += "\nEsgotado o tempo limite do pedido";
                    perdido++
                    txtaDelay();
                }
                if(loop == 5){
                    txta.value += "\n\nEstatísticas do Ping para " + comando[1].replace("\n","") + ":\n" +
                    "   Pacotes: Enviados = 4, Recebidos =" + recebido + ", Perdidos =" + perdido + " (" + perdido * 25 +"% de perda)\n";
                    txta.value += "Z:\\Users\\Zilean>";
                    return txta.focus();
                }
        },100);
        txta.disabled = false;
    }
}
function media(total, num) {//
    return total + num;

  }
// split no "zilean>"
//quando o ping manda pacote para uma rede diferente da dele pela primeira vez
// ele aprende o caminho isso significa que
// dois dos primeiros pacotes são perdidos, e os outros dois chegam no destino
/*Pinging 192.168.10.11 with 32 bytes of data:

Request timed out.
Request timed out.
Reply from 192.168.10.11: bytes=32 time<1ms TTL=126
Reply from 192.168.10.11: bytes=32 time<1ms TTL=126

Ping statistics for 192.168.10.11:
    Packets: Sent = 4, Received = 2, Lost = 2 (50% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms*/
/* Conexão entre diferentes redes
Ela pode ocorrer normalmente, porém, existe um roteador fazendo
caminho estático para cada rede diferente (pode não ser regra)
*/