
arrayIp = [];
arrayMask = [];
var qnt;
var contagem = [];

function criaIp(){
    qnt = document.getElementById("numIp").value;
                
    for(var i = 0; i <= qnt; i++){
        var f = document.createElement("form");
        f.setAttribute('method',"post");
                
        var ip = document.createElement("input");
        ip.setAttribute('type','text');
        ip.setAttribute('id','txtIp' + i);
        ip.setAttribute('value','192.168.0.'+i)

        f.appendChild(ip);

        document.getElementsByTagName('body')[0].appendChild(f);
        if(i == qnt -1){

            var select = document.createElement("select");
            var op = document.createElement("option");
            var op2 = document.createElement("option");
            op.setAttribute("value","Wifi");
            op.innerHTML = "Wifi";
            op2.setAttribute("value","Cabeado");
            op2.innerHTML = "Cabeado";
            select.appendChild(op);
            select.appendChild(op2);

            var p = document.createElement("p");
            p.innerHTML = "Escolha o tipo da rede!"; 
                        
            var s = document.createElement("input");
            s.setAttribute('type',"submit");
            s.setAttribute('value',"Confirmar");
            s.setAttribute("onclick","guardaIp(); criaRede();");
                    
            document.getElementsByTagName('body')[0].appendChild(p);
            document.getElementsByTagName('body')[0].appendChild(f.appendChild(select));
                        
            document.getElementsByTagName('body')[0].appendChild(f.appendChild(s));
                        
            break
        }
    }
    document.getElementById("Digite").innerHTML = "Digite o(s) endereço(s) de ip <br>";
}
function guardaIp(){
                
    for(i = 0; i <= qnt - 1; i++){
        var ipPush = document.getElementById("txtIp"+ i).value;
        arrayIp.push(ipPush);
                    
        var ipToMask = Number(ipPush.slice(0,3));
                    
        if((ipToMask >= 0) && (ipToMask <= 127)){ //tipo A
            arrayMask.push("255.0.0.0");
        }
        if((ipToMask >= 128) && (ipToMask <= 191)){ //tipo B
            arrayMask.push("255.255.0.0");
        }
        if((ipToMask >= 192) && (ipToMask <= 223)){ //tipo C
            arrayMask.push("255.255.255.0");
        }
    }
}
function criaRede(){

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
    var txta = document.createElement("textarea");
    txta.setAttribute("spellcheck","false");
    txta.innerHTML = "Microsoft Windows [versão 6.1.7601]" + "\n" +
    "Copyright (c) 2009 Microsoft Corporation. Todos os direitos reservados." + "\n" +
    "Z:\\Users\\Zilean>";
                
    d2.appendChild(imagem2);
    d2.appendChild(txta);
                
    for(var i = 0; i <= qnt -1; i++){

        var d = document.createElement("div");
        d.setAttribute("class","sinal");
                    
        var imagem = document.createElement("img");
        imagem.setAttribute("id","imagemSinal" + i);
        imagem.setAttribute("src","Sinal55.png");
        imagem.setAttribute("onclick","mudaImagem(" + i + ");");
        var span = document.createElement("span");
        var b = document.createElement("b");
        b.setAttribute("id","bQualidade"+ i);
        b.innerHTML = "Excelente";
        span.innerHTML = "Qualidade do Sinal: ";
        span.appendChild(b);                    
                    
        var p = document.createElement("p");
        var bIp = document.createElement("b");
        bIp.setAttribute("id","bIp");
                    
        var bMascara = document.createElement("b");
        bMascara.setAttribute("id","bMascara");
                    
        p.innerHTML = "Ip : <b>" + arrayIp[i] + "</b> Máscara: <b>" + arrayMask[i] + "</b>";
                    
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
}
function mudaImagem(indentify){
    for(var i = 0; i <= qnt -1; i++){
        contagem.push(i+"4");
    }
    if(contagem[indentify] == indentify + "5"){
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal55.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Excelente";
        contagem[indentify] = indentify + "4";
    }
    else if(contagem[indentify] == indentify + "4"){
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal45.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Ótima";
        contagem[indentify] = indentify + "3";
    }
    else if(contagem[indentify] == indentify + "3"){
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal35.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Boa";
        contagem[indentify] = indentify + "2";
    }
    else if(contagem[indentify] == indentify + "2"){
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal25.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Ruim";
        contagem[indentify] = indentify + "1";
    }
    else if(contagem[indentify] == indentify + "1"){
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal15.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Péssima";
        contagem[indentify] = indentify + "0";
    }
    else {
        document.getElementById("imagemSinal" + indentify).setAttribute("src","Sinal05.png");
        document.getElementById("bQualidade" + indentify).innerHTML = "Sem internet";
        contagem[indentify] = indentify + "5";
    }
}