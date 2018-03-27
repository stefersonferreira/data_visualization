/*
        funçao que exibe a terceira área da visualizaçao
        Nela um mapa será carregado e bolhas apresentarão 
        informaçoes sobre um determinado projeto.
      */
    function carregaMapa(svg) {

      d3.json("dados/ma.json", function(data) {

            //criando a projeçao onde será projetado
            //o mapa
            var projection = d3.geoMercator()
                        .scale(3200)
                        .translate([3000, 0]);

                //área que conterá os dados dos programas
            var path = d3.geoPath().projection(projection);

            //criando o mapa com suas caracterísitcas
            // de cor e separações

            var map = svg.selectAll('path')
                      .data(data.features)
                      .enter()
                      .append('path')
                      .attr('d', path)
                      .attr('fill', '#0099D7')
                      .attr('stroke', '#303030')
                      .attr('stroke-width', 0.5);
     
        //console.log(data);

        
        //carregamento dos dados a partir do csv
        d3.csv('dados/dados.csv', plotCirculos);


        function plotCirculos(dados){

          //armazena os tipos de exibiçao a serem feitas
          //tipo, range inicio e fim, nome exibível, descrição
          var tipoExibicoes = [
                      ['centros_de_educacao_integral_educa_mais_alunos_matriculados', 0, 30, 'Centro de Educação Integral', 'É um novo modelo de escola pública que visa o desenvolvimento dos estudantes em todas as suas dimensões – intelectual, social, cultural, física e emocional -, por meio de ações integradas e em tempo integral, envolvendo atores que influenciam diretamente a formação plena dos estudantes: família, educadores, gestores e comunidades locais. Este novo modelo terá como base o diálogo permanente entre estudantes e educadores a fim de desenvolverem juntos as competências que a vida e o mercado de trabalho exigem.<p>Incentivando uma educação voltada para o exercício da cidadania e do protagonismo juvenil, o estudante fortalece a construção dos seus projetos de vida e visão de futuro.'],
                      ['cidadao_do_mundo_alunos_beneficiados', 0, 45, 'Cidadão do Mundo', 'O Programa CIDADÃO DO MUNDO que objetiva oferecer intercâmbio internacional com foco em idiomas estrangeiros (inglês, francês e espanhol) aos jovens entre 18 e 24 anos, alunos egressos DO ENSINO MÉDIO da rede pública de ensino ou de instituições de ensino vinculadas a entidades paraestatais ou a fundações sem fins lucrativos. Serão concedidas até 300 bolsas de estudos no período de 2016-2018, nas modalidades de INTERCÂMBIO LINGUÍSTICO, ESTÁGIO INTERNACIONAL e ENSINO MÉDIO NO EXTERIOR.'],
                      ['sim_eu_posso_alunos_beneficiados', 0, 30, 'Sim eu posso', 'O ‘Sim, Eu Posso!’ é uma iniciativa que integra a mobilização pela alfabetização dentro do Plano de Ações. O objetivo é combater o analfabetismo, que ainda tem cerca de 20% da população acima de 15 anos sem saber ler ou escrever.'],
                      ['programa_brasil_alfabetizado_pba_alunos', 0, 20, 'Brasil Alfabetizado', 'O programa é uma porta de acesso à cidadania e o despertar do interesse pela elevação da escolaridade. O Brasil Alfabetizado é desenvolvido em todo o território nacional, com o atendimento prioritário a municípios que apresentam alta taxa de analfabetismo, sendo que 90% destes localizam-se na região Nordeste. Esses municípios recebem apoio técnico na implementação das ações do programa, visando garantir a continuidade dos estudos aos alfabetizandos.'],
                      ['preuni_auloes_do_enem_alunos_beneficiados', 0, 30, 'PREUNI - Aulões do ENEM', 'É uma megarrevisão gratuita, voltada para jovens e adultos que, prioritariamente, concluíram ou estão cursando o 3º ano do Ensino Médio interessados em ingressar na Educação Superior focado na preparação para o Exame Nacional do Ensino Médio (ENEM).<p>O Aulão do Enem disponibilizará aos alunos conteúdo de revisão para o exame do Enem de 2017, trabalhando as habilidades e competências relativas às quatro áreas que compõem o exame: Linguagens e Códigos e suas Tecnologias; Ciências Humanas e suas Tecnologias; Ciências da Natureza e suas Tecnologias, Matemáticas e suas Tecnologias e mais a Redação.']
                    ];

         
          //adicionando os botões para selecionar o programa 
          //a visualizar
          d3.select("#container")
                  .append("div")
                    .attr("class", "mapa_buttons")
                    .append("span")
                    .attr("id", "programa_at");


                //variáve para controlar o programa selecionado
          var prg_idx = 0;

          //chamada da funçao que apresenta os programas
          //inicialente exibe todos e depois permite o
          //usuário visualizar o que selecionar
          var prg_interval = setInterval(function(){
              
              //chamada para a exibição
              carregaDadosPrograma(tipoExibicoes[prg_idx]);
              prg_idx++;

              if(prg_idx >= tipoExibicoes.length){

                //cancela a exibiçao continuada
                  clearInterval(prg_interval);
          

                  //cria os botões de acordo com os programas
                  var mapa_buttons = d3.select(".mapa_buttons")
                                            .selectAll("div")
                                            .data(tipoExibicoes)
                                            .enter()
                                            .append("div")
                                            .text(function(d) { 
                                              //dados da descriçao
                                              return d[3]});


                  //tratamento do clique
                  //primiero muda as cores de todos os botões
                  //depois muda a cor do programa selecionado
                  mapa_buttons.on("click", function(d){
                    d3.select(".mapa_buttons")
                      .selectAll("div")
                      .transition()
                      .duration(500)
                      .style("background", "#FFD200")
                      .style("color", "black");

                    d3.select(this)
                      .transition()
                      .duration(500)
                      .style("background", "#0099D7")
                      .style("color", "white");

                    //faz a chamada de acordo com o botão selecionado
                    carregaDadosPrograma(d)
                 });
                      }
              }, 3000);



          function carregaDadosPrograma(valores){   

            
            //seleciona o tipo de programa a ser exibido
            var tipo = valores[0];


            //exibe a descirçao do programa selecionado na lateral
            d3.select("#dadosPrograma").html(valores[4]);


            //calcula o domínio em cima do campo selecionado
            var dominio_campo = d3.extent(dados, function(d){
                    return +eval('d.'+tipo);
                });


            //cria a escala para definir o raio do círculo 
            //referente ao programa
                var escala = d3.scaleSqrt()
                        .domain(dominio_campo)
                        .range([valores[1], valores[2]]);


                    //seleciona todos os círculos
                    var circles = svg.selectAll("circle");
                    
                    //remove para posteriormente adicionar com o programa selecionado
                    circles
                      .remove()
                      .transition()
                    .duration(500);;


                    //armazenará os municípios que fazem parte do programa
                    //selecionado
                    var municipios_c_programa = [];


                    //adicionando os circulos de acordo com os dados
                    //e programas selecionados
                    svg.selectAll("circle")
                        .data(dados)
                        .enter()
                        .append('circle')
                        .sort(function(a, b) { return eval('b.'+ tipo) - eval('a.'+ tipo) })
                        .attr("cx", function(d){
                            //identifica onde posicionar o circulo
                            return projection([d.longitude, d.latitude])[0];
                          })
                        .attr("cy", function(d){
                            //identifica onde posicionar o circulo
                            return projection([d.longitude, d.latitude])[1];
                          })
                        .attr("r", function(d){

                          //caso o valor para ser apresentado for maior que 0
                          //esse município é selecionado para posteriormente
                          //ficar em destaque
                          if (eval('d.'+tipo) > 0)
                            municipios_c_programa.push(d.municipio);

                          //a partir do valor definido em arquivo
                          //é tratado através da escala para 
                          //definir o raio
                          return  escala(eval('d.'+tipo))
                        })
                            .on('mouseover', function(d){
                              //ao colocar o mouse exibe os dados do item
                              exibeDados(tipo, d);
                            })
                            //oculta ao remover o mouse de cima
                              .on('mouseout',  ttHide)
                              .transition()
                        .duration(500);


                /*
                  funçao que trata os municípios que estão parrticipando do 
                  programa selecionado, os municípios estáo no array 
                  municipios_c_programa
                */
                    function update_municipios(d){
                        if(municipios_c_programa.indexOf(d.properties.name) !== -1){
                          return "#0099D7";
                        }else{
                          return "white";  
                        }
                    }

                    //altera a cor de cada municipio que participa do programa
                    svg.selectAll("path")
                    .transition()
                    .duration(500)
                    .attr("fill", update_municipios);

          }

          //variárvel para controle da exibiçao do tooltip
          var lastShow = new Date();

          /*
            Exibe os dados do programa e dom município onde o mouse se encontra
          */
          function exibeDados(tipo, d){

            //de acorod com o tipo passado como parâmetro seleciona uma descriçao
            if(tipo == 'centros_de_educacao_integral_educa_mais_alunos_matriculados'){
                              texto = 'Quantidade de Centros: ' + d.centros_de_educacao_integral_educa_mais_quantidade;
                              texto += '<br>Alunos Matriculados: ' + d.centros_de_educacao_integral_educa_mais_alunos_matriculados;
                        }

                        if(tipo == 'cidadao_do_mundo_alunos_beneficiados'){
                          texto = 'Alunos Beneficiados: ' + d.cidadao_do_mundo_alunos_beneficiados; 
                        }

                        if(tipo == 'sim_eu_posso_alunos_beneficiados'){
                          texto = 'Quantidade de Alfabetizadores: ' + d.sim_eu_posso_alfabetizadores; 
                          texto += '<br>Alunos Beneficiados: ' + d.sim_eu_posso_alunos_beneficiados; 
                        }

                        if(tipo == 'programa_brasil_alfabetizado_pba_alunos'){
                          texto = 'Quantidade de Alfabetizadores: ' + d.programa_brasil_alfabetizado_pba_alfabetizadores; 
                          texto += '<br>Alunos Beneficiados: ' + d.programa_brasil_alfabetizado_pba_alunos; 
                        } 

                        if(tipo == 'preuni_auloes_do_enem_alunos_beneficiados'){
                          texto = 'Alunos Beneficiados: ' + d.preuni_auloes_do_enem_alunos_beneficiados;
                        } 


                        //selectiona a área de tooltip
            var tt = d3.select('.tt')
            if (isIE9 || !tt.size()) return
                tt.classed('tt-hidden', false);

            //altera para ser exibida
            window.setTimeout(function(){
              tt.classed('tt-hidden', false);
            }, 0)

            lastShow = new Date();
            //apresenta os dados do item selecionado
            d3.select('#municipio').text(d.municipio);
            d3.select('#dadosTooltip').html(texto);
          }


          /*
            Função que oculta o tootip
          */
          function ttHide(d){

            var tt = d3.select('.tt')
              if (isIE9 || !tt.size()) return
              //d3.event.stopPropagation();
              var tt = d3.select('.tt');
              d3.select(this).style('stroke-width', 1)
              if (new Date() - lastShow > 10){
                tt.classed('tt-hidden', true);
              }
          }


        }

      });
    }