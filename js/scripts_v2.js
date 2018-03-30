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
  

        //escala de cores
        //utilizado nos municípios mais contemplados
        var escala_color = d3.scaleThreshold()
              .domain([1.1, 2.1, 3.1, 4.1])
              .range(['#fff','#ddd','#FFD200','#88B940']);

        
        //carregamento dos dados a partir do csv
        d3.csv('dados/dados.csv', plotCirculos);

        function plotCirculos(dados){

          //armazena os tipos de exibiçao a serem feitas
          //tipo exibicao, tipo programa, range inicio e fim, nome exibível, descrição
          var tipoExibicoes = [
                      ['o', 'centros_de_educacao_integral_educa_mais_alunos_matriculados', 0, 30, 'Centro de Educação Integral', 'É um novo modelo de escola pública que visa o desenvolvimento dos estudantes em todas as suas dimensões – intelectual, social, cultural, física e emocional -, por meio de ações integradas e em tempo integral, envolvendo atores que influenciam diretamente a formação plena dos estudantes: família, educadores, gestores e comunidades locais. Este novo modelo terá como base o diálogo permanente entre estudantes e educadores a fim de desenvolverem juntos as competências que a vida e o mercado de trabalho exigem.<p>Incentivando uma educação voltada para o exercício da cidadania e do protagonismo juvenil, o estudante fortalece a construção dos seus projetos de vida e visão de futuro.<br><br>* As áreas representam a quantidade de alunos matriculados.'],
                      ['o', 'cidadao_do_mundo_alunos_beneficiados', 0, 45, 'Cidadão do Mundo', 'O Programa CIDADÃO DO MUNDO que objetiva oferecer intercâmbio internacional com foco em idiomas estrangeiros (inglês, francês e espanhol) aos jovens entre 18 e 24 anos, alunos egressos DO ENSINO MÉDIO da rede pública de ensino ou de instituições de ensino vinculadas a entidades paraestatais ou a fundações sem fins lucrativos. Serão concedidas até 300 bolsas de estudos no período de 2016-2018, nas modalidades de INTERCÂMBIO LINGUÍSTICO, ESTÁGIO INTERNACIONAL e ENSINO MÉDIO NO EXTERIOR.<br><br>* As áreas representam a quantidade de alunos beneficiados.'],
                      ['o', 'sim_eu_posso_alunos_beneficiados', 0, 30, 'Sim eu posso', 'O ‘Sim, Eu Posso!’ é uma iniciativa que integra a mobilização pela alfabetização dentro do Plano de Ações. O objetivo é combater o analfabetismo, que ainda tem cerca de 20% da população acima de 15 anos sem saber ler ou escrever.<br><br>* As áreas representam a quantidade de alunos beneficiados.'],
                      ['o', 'programa_brasil_alfabetizado_pba_alunos', 0, 20, 'Brasil Alfabetizado', 'O programa é uma porta de acesso à cidadania e o despertar do interesse pela elevação da escolaridade. O Brasil Alfabetizado é desenvolvido em todo o território nacional, com o atendimento prioritário a municípios que apresentam alta taxa de analfabetismo, sendo que 90% destes localizam-se na região Nordeste. Esses municípios recebem apoio técnico na implementação das ações do programa, visando garantir a continuidade dos estudos aos alfabetizandos.<br><br>* As áreas representam a quantidade de alunos alfabetizados.'],
                      ['o', 'preuni_auloes_do_enem_alunos_beneficiados', 0, 30, 'PREUNI - Aulões do ENEM', 'É uma megarrevisão gratuita, voltada para jovens e adultos que, prioritariamente, concluíram ou estão cursando o 3º ano do Ensino Médio interessados em ingressar na Educação Superior focado na preparação para o Exame Nacional do Ensino Médio (ENEM).<p>O Aulão do Enem disponibilizará aos alunos conteúdo de revisão para o exame do Enem de 2017, trabalhando as habilidades e competências relativas às quatro áreas que compõem o exame: Linguagens e Códigos e suas Tecnologias; Ciências Humanas e suas Tecnologias; Ciências da Natureza e suas Tecnologias, Matemáticas e suas Tecnologias e mais a Redação.<br><br>* As áreas representam a quantidade de alunos beneficiados.']
                    , ['a', 'municipios_n_contemplados', 0, 30, 'Municípios não contemplados', 'Estes são são os municípios que não foram contemplados com nenhum programa.']
                    , ['a', 'municipios_mais_contemplados', 0, 30, 'Municípios mais contemplados', 'Estes são são os municípios foram contemplados em mais de 1 programa.']
                    ];

         
          //adicionando os botões para selecionar o programa 
          //a visualizar
          d3.select('#container')
                  .append('div')
                  .attr('class', 'mapa_buttons')
                  .append('span')
                  .attr('id', 'programa_at');


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
                  var mapa_buttons = d3.select('.mapa_buttons')
                                            .selectAll('div')
                                            .data(tipoExibicoes)
                                            .enter()
                                            .append('div')
                                            .text(function(d) { 
                                              //dados da descriçao
                                              return d[4];
                                            })
                                            .attr("class", function(d) { 
                                              //dados da descriçao
                                              return 'btn_' + d[0];
                                            });

                  //apos a carga exibe a pergunta
                  d3.select("#pergunta").style('display', 'block');

                  //tratamento do clique
                  //primiero reseta as cores de todos os botões
                  //depois muda a cor do programa selecionado
                  mapa_buttons.on('click', function(d){
                    d3.selectAll('.btn_o')
                      .style('background', '#FFD200')
                      .style('color', 'black');

                    d3.selectAll('.btn_a')
                      .style('background', '#88B940')
                      .style('color', 'black');


                    d3.select(this)
                      .transition()
                      .duration(500)
                      .style('background', '#0099D7')
                      .style('color', 'white');

                    //faz a chamada de acordo com o botão selecionado
                    carregaDadosPrograma(d);
                 });
                      }
              }, 3000);


          //vriável de controle dos sets a seguir
          var sets_carregados = false;

          //variáveis que irá armazenar todos os municípios contemplados
          var municipios_contemplados = d3.set();

          //municipios menos contemplados
          var municipios_n_contemplados = d3.set();
          var percentual_n_contemplados = 0;
          

          //municípios mais contemplados
          var municipios_mais_contemplados = d3.map();

          

          function carregaDadosPrograma(valores){   
            
            //selectiona o tipo de exibiçao, exploratoria(o) ou explanatória(a)
            var tipo_exibicao = valores[0];

            //seleciona o tipo de programa a ser exibido
            var tipo_programa = valores[1];


            //calcula o domínio em cima do campo selecionado
            var dominio_campo = d3.extent(dados, function(d){
                    return +eval('d.'+tipo_programa);
                });


            //cria a escala para definir o raio do círculo 
            //referente ao programa
            var escala = d3.scaleSqrt()
                    .domain(dominio_campo)
                    .range([valores[2], valores[3]]);


            //seleciona todos os círculos
            var circles = svg.selectAll('circle');
            
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

            if (tipo_exibicao == 'o'){
                  svg.selectAll('circle')
                      .data(dados)
                      .enter()
                      .append('circle')
                      .sort(function(a, b) { return eval('b.'+ tipo_programa) - eval('a.'+ tipo_programa) })
                      .attr('cx', function(d){
                          //identifica onde posicionar o circulo
                          return projection([d.longitude, d.latitude])[0];
                        })
                      .attr('cy', function(d){
                          //identifica onde posicionar o circulo
                          return projection([d.longitude, d.latitude])[1];
                        })
                      .attr('r', function(d){

                        //caso o valor para ser apresentado for maior que 0
                        //esse município é selecionado para posteriormente
                        //ficar em destaque
                        if (eval('d.'+tipo_programa) > 0){
                          municipios_c_programa.push(d.municipio);

                          //tratamento para carregar os dados apenas 1 x
                          if(sets_carregados == false){
                              municipios_contemplados.add(d.municipio);

                              //alimenta com a quantidade de programas aprovados
                              var val = 1;
                              if(municipios_mais_contemplados.keys().indexOf(d.municipio) !== -1)
                              {
                                  val = municipios_mais_contemplados.get(d.municipio);
                                  val++;
                              }
                              municipios_mais_contemplados.set(d.municipio, val);
                           }

                          return  escala(eval('d.'+tipo_programa))
                        }else{
                          return 0;
                        }

                        //a partir do valor definido em arquivo
                        //é tratado através da escala para 
                        //definir o raio
                        
                      })
                      .on('mouseover', function(d){
                        //ao colocar o mouse exibe os dados do item
                        exibeDados(tipo_programa, d);
                      })
                      //oculta ao remover o mouse de cima
                      .on('mouseout',  ttHide)
                      .transition()
                      .duration(500);

            }

            //calculo do percentual de não contemplação
            percentual_n_contemplados = (217 - municipios_contemplados.size()) / 217 ;

            percentual_n_contemplados = Math.round(percentual_n_contemplados * 100, 2);


            /*
              funçao que trata os municípios que estão participando do 
              programa selecionado, os municípios estáo no array 
              municipios_c_programa
            */
                function update_municipios(d){


                    var color = 'white';
                    if (tipo_exibicao == 'o'){
                        if(municipios_c_programa.indexOf(d.properties.name) !== -1)
                          color = '#0099D7';
                        
                    }else{
                        //tratamento das informaçoes explanatórias
                        if (tipo_programa == 'municipios_n_contemplados'){
                            if(municipios_contemplados.values().indexOf(d.properties.name) == -1){
                                municipios_n_contemplados.add(d.properties.name);
                                color = 'red';
                            }
                        }

                        if (tipo_programa == 'municipios_mais_contemplados'){
                            if(municipios_mais_contemplados.keys().indexOf(d.properties.name) !== -1){
                                
                                color = escala_color(municipios_mais_contemplados.get(d.properties.name));  
                            }
                        }

                        
                      
                    }

                    return color;
                }


                //exibindo o nome do munucípio ao passar o mouse em cima
                svg.selectAll('path')
                      .attr('fill', update_municipios)
                      .on("mouseover", function(d){
                          d3.select('#nomeMunicipio').text('Município: ' + d.properties.name);
                      })
                      .on("mouseout", function(d){
                          d3.select('#nomeMunicipio').text('');
                      })
                      .transition()
                      .duration(500);


                //exibe o título e a descirçao do programa selecionado
                d3.select('#dtlh_title').html(valores[4]);
                
                //tratamento da descriçao.
                var descricao = valores[5];

                //oculta todas as legendas
                d3.selectAll(".legenda").style('display', 'none');


                //tratamento da descriçao nos casos de seleçao explanatoria
                if (tipo_exibicao == 'a'){
                  if (tipo_programa == 'municipios_n_contemplados'){
                    descricao += '<br><br> Aproximadamente ' + percentual_n_contemplados + '% dos municípios não receberam nenhum tipo de ação.'; 
                    descricao += '<br><br> São eles: <small>' + municipios_n_contemplados.values()+ '</small>'; 
                    descricao = descricao.replace(/,/g, ', ') ;

                    d3.select("#legenda2").style('display', 'block');
                  }
                  if (tipo_programa == 'municipios_mais_contemplados'){

                    var d_2 = '', d_3 = '', d_4 = '';
                    municipios_mais_contemplados.each(function(d, i){
                      
                      switch(d){
                        case 2: d_2 += i + ', ';break;
                        case 3: d_3 += i + ', ';break;
                        case 4: d_4 += i + ', ';break;
                      }
                    })
                    
                    descricao += '<br><br><small> <b>Municípios com 4 programas</b>: ' + d_4.slice(0, - 2) + '</small>'; 
                    descricao += '<br><small> <b>Municípios com 3 programas</b>: ' + d_3.slice(0, - 2) + '</small>'; 
                    descricao += '<br><small> <b>Municípios com 2 programas</b>: ' + d_2.slice(0, - 2) + '</small>'; 

                    d3.select("#legenda3").style('display', 'block');

                  }
                }else{
                  d3.select("#legenda1").style('display', 'block');
                }
                d3.select('#dtlh_desc').html(descricao);

                    

          }


          //variárvel para controle da exibiçao do tooltip
          var lastShow = new Date();

          /*
            Exibe os dados do programa e dom município onde o mouse se encontra
          */
          function exibeDados(tipo, d){

            texto = '';

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
            var tt = d3.select('.tt');
            if (isIE9 || !tt.size()) return
                tt.classed('tt-hidden', false);

            //altera para ser exibida
            window.setTimeout(function(){
              tt.classed('tt-hidden', false);
            }, 0)

            lastShow = new Date();
            //apresenta os dados do item selecionado
            d3.select('#municipio').html(d.municipio);
            d3.select('#dadosTooltip').html(texto);
          }


          /*
            Função que oculta o tootip
          */
          function ttHide(d){

              tt = d3.select('.tt')
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