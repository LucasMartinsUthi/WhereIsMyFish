function tabuleiro(v1, v2){
	window.click = 'setup';
	window.mep = 1;
	window.mepSelecionado = 0;
	window.player = 1;
	window.player1P = 0;
	window.player2P = 0;
	window.block1 = 0;
	window.block2 = 0;
	window.block3 = 0;
	window.block4 = 0;
	window.p1 = 30;
	window.p2 = 20;
	window.p3 = 10;
	window.controleP3 = 2;
	window.controleP2 = 1;
	count_hex = 1;
	var tabuleiro = '<svg width="375" height="416" viewBox="15 25 375 416">';
	// +'<defs>'
	// +'<pattern id="image-bg1" x="0" y="0" height="52" width="60">'
	// +'<image width="60" height="52" xlink:href="camaraopng.png"></image>'
	// +'</pattern>'
	// +'</defs>';



	for (var hor = 1; hor <= v1; hor += 1) {// escreve o tabuleiro na horizonta
		var hex_x = (30/2)*hor;
		if (hor % 2 == 0){
			hex_y = 25;
			controle = 1;
		}
		if (hor % 2 == 1){
			hex_y = -1;
			controle = 0;
		}

		for (var ver = 1; ver <= v2-controle; ver ++) { //escreve o tabuleiro na vertical
			ponto = setPonto();

			switch(ponto){
				case 1:
					img = "Camarao_600.png"
					break;
				case 2:
					img = "Peixe_600.png"
					break;
				case 3:
					img = "Lula_600.png"
					break;
			}

			x = hor*60-hex_x;
			y = ver*52+hex_y

		 	//console.log("x="+x+" y="+y+" : "+hex(x,y))
		 	// fill=\'url("#image-bg1")\'
		 	tabuleiro += '<polygon display="visible" points="'+hex(x,y)+'" stroke="white" stroke-opacity="0.8" stroke-width="3" id='+x+'.'+y+' class="falso '+count_hex+'" ponto="'+ponto+'"/>'
			+ '<clipPath id="'+count_hex+'">'
			+ 	'<polygon points="'+hex(x,y)+'"/>'
			+ '</clipPath>'
    		+ '<image id="'+x+'.'+y+'img" clip-path="url(#'+count_hex+')" x="'+(x-30)+'" y="'+(y-30)+'" height="60" width="60" xlink:href="'+img+'" onmouseover= "mouseIn('+x+'.'+y+')" onclick="mouseClick('+x+','+y+')" onmouseout="mouseOut('+x+'.'+y+')" />'

		 	count_hex ++;
		};

	}


	tabuleiro += '<circle onmouseover="mouseIn(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" onclick="mouseClick(this.getAttribute(\'cx\')+\',\'+this.getAttribute(\'cy\'))" onmouseout="mouseOut(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" id="mep1" style="display: none;" cx="10" cy="10" r="10" stroke="black" stroke-width="2" fill="red" /><circle onmouseover="mouseIn(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" onclick="mouseClick(this.getAttribute(\'cx\')+\',\'+this.getAttribute(\'cy\'))" onmouseout="mouseOut(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" style="display: none;"  id="mep2" cx="100" cy="100" r="10" stroke="black" stroke-width="2" fill="yellow"/><circle onmouseover="mouseIn(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" onclick="mouseClick(this.getAttribute(\'cx\')+\',\'+this.getAttribute(\'cy\'))" onmouseout="mouseOut(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" id="mep3" style="display: none;" cx="10" cy="10" r="10" stroke="black" stroke-width="2" fill="red" /><circle onmouseover="mouseIn(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" onclick="mouseClick(this.getAttribute(\'cx\')+\',\'+this.getAttribute(\'cy\'))" onmouseout="mouseOut(this.getAttribute(\'cx\')+\'.\'+this.getAttribute(\'cy\'))" style="display: none;"  id="mep4" cx="100" cy="100" r="10" stroke="black" stroke-width="2" fill="yellow"/></svg>';
	//console.log(tabuleiro);
	document.getElementById("tabuleiro").innerHTML = tabuleiro;
	draw();
}

//30 / 26
function hex(x, y){
	var raio = 28;
	var d_tile = 24;
	var centro = [];
	centro['x'] = x;
	centro['y'] = y;

	var p1 = [];
	p1['x'] = centro['x'] - raio/2;
	p1['y'] = centro['y'] - d_tile;

	var p2 = [];
	p2['x'] = centro['x'] + raio/2;
	p2['y'] = centro['y'] - d_tile;

	var p3 = [];
	p3['x'] = centro['x'] + raio;
	p3['y'] = centro['y'];

	var p4 = [];
	p4['x'] = centro['x'] + raio/2;
	p4['y'] = centro['y'] + d_tile;

	var p5 = [];
	p5['x'] = centro['x'] - raio/2;
	p5['y'] = centro['y'] + d_tile;

	var p6 = [];
	p6['x'] = centro['x'] - raio;
	p6['y'] = centro['y'];

	var hexagono = p1['x']+","+p1['y']+" "+p2['x']+","+p2['y']+" "+p3['x']+","+p3['y']+" "+p4['x']+","+p4['y']+" "+p5['x']+","+p5['y']+" "+p6['x']+","+p6['y']+" ";

	return hexagono;
}

function mouseOut(v1){
	classe = document.getElementById(v1).className;
	classe_id = classe['baseVal'].split(" ");

	if (!window.click || window.click == "setup") {
		document.getElementById(v1).style.stroke = "white";
	}else if (window.click && classe['baseVal'] == 'ativo '+classe_id[1]) {
		document.getElementById(v1).style.stroke = "green	";
	};
}

function mouseIn(v1){
	classe = document.getElementById(v1).className;
	classe_id = classe['baseVal'].split(" ");

	if (!window.click || window.click == "setup") {
		document.getElementById(v1).style.stroke = "red";
	}else if (window.click && classe['baseVal'] == 'ativo '+classe_id[1]) {
		document.getElementById(v1).style.stroke = "red";
	}
}

function mouseClick(a, b){
	if(!b){
		cordenadas = a.split(",")
		x = cordenadas[0];
		y = cordenadas[1];
	}else{
		x = a;
		y = b;
	}
	x = parseInt(x);
	y = parseInt(y);

		if (document.getElementById("mep"+window.player).getAttribute("cx") == x && document.getElementById("mep"+window.player).getAttribute("cy") == y) {
			if (window.mepSelecionado == 0) {
				window.mepSelecionado = window.player;
			};
		}else if(document.getElementById("mep"+(window.player+2)).getAttribute("cx") == x && document.getElementById("mep"+(window.player+2)).getAttribute("cy") == y) {
			if (window.mepSelecionado == 0) {
				window.mepSelecionado = (window.player+2);
			};
		}
	classe = document.getElementById(x+'.'+y).className;
	classe_id = classe['baseVal'].split(" ");

	if (!window.click && document.getElementById("mep"+window.mepSelecionado) != null && document.getElementById("mep"+window.mepSelecionado).getAttribute("cy") == y && document.getElementById("mep"+window.mepSelecionado).getAttribute("cx") == x) {
		clickado = x+"."+y;
		caminho(x, y);
	}else if(document.getElementById("mep"+window.player) != null && document.getElementById("mep"+window.player).getAttribute("cy") == y && document.getElementById("mep"+window.player).getAttribute("cx") == x || document.getElementById("mep"+(window.player+2)) != null && document.getElementById("mep"+(window.player+2)).getAttribute("cy") == y && document.getElementById("mep"+(window.player+2)).getAttribute("cx") == x ) {
		document.getElementById(clickado).style.stroke = "white";
		cleanAll();
		window.mepSelecionado = 0;
		if (document.getElementById("mep"+window.player).getAttribute("cx") == x && document.getElementById("mep"+window.player).getAttribute("cy") == y) {
			if (window.mepSelecionado == 0) {
				window.mepSelecionado = window.player;
			};
		}else if(document.getElementById("mep"+(window.player+2)).getAttribute("cx") == x && document.getElementById("mep"+(window.player+2)).getAttribute("cy") == y) {
			if (window.mepSelecionado == 0) {
				window.mepSelecionado = (window.player+2);
			};
		}
		clickado = x+"."+y;
		caminho(x, y);
		console.log(window.mepSelecionado)
	}else if (window.click && classe['baseVal'] == 'ativo '+classe_id[1]){
		document.getElementById(clickado).style.display = "none";
		document.getElementById(clickado+'img').style.display = "none";
		cleanAll();
		meeples(x,y,"move", 0);
		for (var i = 1; i <= 4; i++) {
			verificaCaminho(i)
		}

		console.log(window.mepSelecionado)

	}else if (window.click == "setup"){
		meeples(x,y,"setup");
	}
	draw();
}

function getPonto(v1, mep){
	if (mep == 1 || mep == 3) {
		window.player1P += parseInt(document.getElementById(v1).getAttribute("ponto"));
	}else if (mep == 2 || mep == 4){
		window.player2P += parseInt(document.getElementById(v1).getAttribute("ponto"));
	}
}

function meeples(x, y, status){
	cordenada = x+"."+y
	if (status == "setup") {
		if (window.player == 1){
			if (document.getElementById("mep1").getAttribute("cy") == y && document.getElementById("mep1").getAttribute("cx") == x || document.getElementById("mep2").getAttribute("cy") == y && document.getElementById("mep2").getAttribute("cx") == x || document.getElementById("mep3").getAttribute("cy") == y && document.getElementById("mep3").getAttribute("cx") == x || document.getElementById("mep4").getAttribute("cy") == y && document.getElementById("mep4").getAttribute("cx") == x){

			}else{
				document.getElementById("mep"+window.mep).setAttribute("cx", x);
				document.getElementById("mep"+window.mep).setAttribute("cy", y);

				if (document.getElementById("mep"+window.mep).style.display == "none") {
					document.getElementById("mep"+window.mep).style.display = "block"
				}
				getPonto(cordenada, window.mep);
				window.mep++
				window.player++;
			}
		}else if (window.player == 2){
			if (document.getElementById("mep1").getAttribute("cy") == y && document.getElementById("mep1").getAttribute("cx") == x || document.getElementById("mep2").getAttribute("cy") == y && document.getElementById("mep2").getAttribute("cx") == x || document.getElementById("mep3").getAttribute("cy") == y && document.getElementById("mep3").getAttribute("cx") == x || document.getElementById("mep4").getAttribute("cy") == y && document.getElementById("mep4").getAttribute("cx") == x){

			}else{
				document.getElementById("mep"+window.mep).setAttribute("cx", x);
				document.getElementById("mep"+window.mep).setAttribute("cy", y);

				if (document.getElementById("mep"+window.mep).style.display == "none") {
					document.getElementById("mep"+window.mep).style.display = "block"
				}

				getPonto(cordenada, window.mep);
				window.mep++
				window.player--;
			}
		}
		if (window.mep == 5) {
			window.click = false;
		}
	}else if(status == "move"){
		if (window.player == 1) {
			if (document.getElementById("mep1").getAttribute("cy") != y || document.getElementById("mep1").getAttribute("cx") != x && document.getElementById("mep2").getAttribute("cy") != y || document.getElementById("mep2").getAttribute("cx") != x && document.getElementById("mep3").getAttribute("cy") != y || document.getElementById("mep3").getAttribute("cx") != x && document.getElementById("mep4").getAttribute("cy") != y || document.getElementById("mep4").getAttribute("cx") != x){
				document.getElementById("mep"+window.mepSelecionado).setAttribute("cx", x);
				document.getElementById("mep"+window.mepSelecionado).setAttribute("cy", y);
			}
			if(window.block2 < 1 || window.block4 < 1){
				window.player++
			}
			getPonto(cordenada, window.mepSelecionado);
			window.mepSelecionado = 0;
		}else if(window.player == 2){
			if (document.getElementById("mep1").getAttribute("cy") != y || document.getElementById("mep1").getAttribute("cx") != x){
				document.getElementById("mep"+window.mepSelecionado).setAttribute("cx", x);
				document.getElementById("mep"+window.mepSelecionado).setAttribute("cy", y);
			}
			if(window.block1 < 1 || window.block3 < 1){
				window.player--;
			}
			getPonto(cordenada, window.mepSelecionado);
			window.mepSelecionado = 0;
		}
	}
}

function cleanAll(){
	for (var i = 1; i <= 64; i++) {
		if (document.getElementsByClassName('ativo '+i)[0]) {
			document.getElementsByClassName('ativo '+i)[0].style.stroke = "white";
			document.getElementsByClassName('ativo '+i)[0].setAttribute("class", 'falso '+i);
		}
	}
	window.click = false;
}

function caminho(x, y){
	window.click = true;
	count = 1;
	a = 1;
	document.getElementById(x+"."+y).style.stroke = "yellow";
	c1 = document.getElementById("mep1").getAttribute("cx")+"."+document.getElementById("mep1").getAttribute("cy");
	c2 = document.getElementById("mep2").getAttribute("cx")+"."+document.getElementById("mep2").getAttribute("cy");
	c3 = document.getElementById("mep3").getAttribute("cx")+"."+document.getElementById("mep3").getAttribute("cy");
	c4 = document.getElementById("mep4").getAttribute("cx")+"."+document.getElementById("mep4").getAttribute("cy");
	for (var i = 1; i <= 6;) {
		switch (i){
			case 1:
				new_x = x;
				new_y = y-52*count;
				new_cord = new_x+"."+new_y;
				// console.log(new_cord);;
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
			case 2:
				new_x = x+45*count;
				new_y = y-26*count;
				new_cord = new_x+"."+new_y;
				// console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
			case 3:
				new_x = x+45*count;
				new_y = y+26*count;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
			case 4:
				new_x = x;
				new_y = y+52*count;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
			case 5:
				new_x = x-45*count;
				new_y = y+26*count;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
			case 6:
				new_x = x-45*count;
				new_y = y-26*count;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					count = 1;
				}else{
					document.getElementById(new_cord).style.stroke = "green";
					classe = document.getElementById(new_cord).className;
					teste = classe['baseVal'].split(" ");
				    if(classe['baseVal'] == 'falso '+teste[1]){
				    	document.getElementById(new_cord).setAttribute("class", 'ativo '+teste[1]);
				   	}
					count ++;
					a++;
				}
				break;
		}
	}
	if (a == 1) {
		window.click = false;
		window.mepSelecionado = 0;
	}
}

function verificaCaminho(mep){
	// console.log(mep);
	x = parseInt(document.getElementById("mep"+mep).getAttribute('cx'));
	y = parseInt(document.getElementById("mep"+mep).getAttribute('cy'));
	c1 = document.getElementById("mep1").getAttribute('cx')+"."+document.getElementById("mep1").getAttribute('cy');
	c2 = document.getElementById("mep2").getAttribute('cx')+"."+document.getElementById("mep2").getAttribute('cy');
	c3 = document.getElementById("mep3").getAttribute('cx')+"."+document.getElementById("mep3").getAttribute('cy');
	c4 = document.getElementById("mep4").getAttribute('cx')+"."+document.getElementById("mep4").getAttribute('cy');
	a = 1;
	for (var i = 1; i <= 6;) {
		switch (i){
			case 1:
				new_x = x;
				new_y = y-52;
				new_cord = new_x+"."+new_y;
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("1")
				}else{
					a++;
					i++;
				}
				break;
			case 2:
				new_x = x+45;
				new_y = y-26;
				new_cord = new_x+"."+new_y;
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("2")
				}else{
					i++;
					a++;

				}
				break;
			case 3:
				new_x = x+45;
				new_y = y+26;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("3")
				}else{
					i++;
					a++;

				}
				break;
			case 4:
				new_x = x;
				new_y = y+52;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("4")
				}else{
					i++;
					a++;

				}
				break;
			case 5:
				new_x = x-45;
				new_y = y+26;
				new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("5")
				}else{
					i++;
					a++;

				}
				break;
			case 6:
				new_x = x-45;
				new_y = y-26;
					new_cord = new_x+"."+new_y;
				//console.log(new_cord);
				if (document.getElementById(new_cord) == null || document.getElementById(new_cord).style.display == 'none' || c1 == new_cord  || c2 == new_cord || c3 == new_cord  || c4 == new_cord) {
					i++;
					//console.log("6")
				}else{
					i++;
				a++;

				}
				break;
		}
	}
	//console.log(a);
	if (a == 1) {
		switch (mep){
			case 1:
				window.block1 ++;
				break;
			case 2:
				window.block2 ++;
				break;
			case 3:
				window.block3 ++;
				break;
			case 4:
				window.block4 ++;
				break;
		}
		if (window.player == 1 && window.block1 >= 1 && window.block3 >= 1) {
			window.player++;
		}else if(window.player == 2 && window.block2 >= 1 && window.block4 >= 1) {
			window.player--;
		}
	}
	if (window.block1 >= 1 && window.block2 >= 1 && window.block3 >= 1 && window.block4 >= 1) {
		//console.log("fim")
		draw();
		end();

	}else{

	}
	//console.log(window.block1+","+window.block2+","+window.block3+","+window.block4)
}

function setPonto(){
	ponto = Math.floor(Math.random()*(4-1))+1;
	console.log(ponto)
	for (var i = 0; i <= 0; i) {
		switch (ponto){
			case 1:
				if (window.p1 == 0) {
					ponto = Math.floor(Math.random()*(4-1))+1;
				}else{
					window.p1--;
					i++;
				}
				break;
			case 2:
				window.controleP2--;
				if (window.p2 == 0) {
					ponto = Math.floor(Math.random()*(4-1))+1;
				}else{
					if (window.controleP2 == 0) {
						window.p2--;
						i++;
					}else{
						ponto = Math.floor(Math.random()*(4-1))+1;
					}

				}
				break;
			case 3:
				window.controleP3--;
				if (window.p3 == 0) {
					ponto = Math.floor(Math.random()*(4-1))+1;
				}else{
					if (window.controleP3 == 0) {
						window.p3--;
						i++;
					}else{
						ponto = Math.floor(Math.random()*(4-1))+1;
					}

				}
				break;
		}
	}
	if (window.controleP2 == 0) {
		window.controleP2 = 1;
	}
	if (window.controleP3 == 0) {
		window.controleP3 = 2;
	}

	return ponto;
}

function draw(v){
	document.getElementById("pontos1").innerHTML = window.player1P;
	document.getElementById("pontos2").innerHTML = window.player2P;
}

function end(){
	if (window.player1P > window.player2P) {
		document.getElementById("tabuleiro").innerHTML = "<br>Fim de jogo: o jogador vencedor foi o jogador 1";
	}else if (window.player1P < window.player2P) {
		document.getElementById("tabuleiro").innerHTML = "<br>Fim de jogo: o jogador vencedor foi o jogador 2";
	}else if (window.player1P == window.player2P) {
		document.getElementById("tabuleiro").innerHTML = "<br>Fim de jogo: EMPATE";
	}
	// document.getElementById("pontos1").innerHTML = "";
	// document.getElementById("pontos2").innerHTML = "";
}
