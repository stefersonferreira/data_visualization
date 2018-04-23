# Projeto P6: Data Visualization

## Sumário
	- São apresentados os dados de programas realizados no estado onde resido, os dados contem informaçoes sobre programas, locais onde ocorrem e números referentes a cada um deles.
   	- Apesar de no arquivo possuirem mais programas selecionei os 5 seguintes:
		- Centro de Educação Integral
		- Cidadão do Mundo
 		- Sim, Eu Posso!
		- Brasil Alfabetizado
 		- PREUNI - Aulões do ENEM
 	- Quem são os maiores e menores beneficiados pelos programas?
 	- Achados:
 	   - Do total de municípios 25% não foram contemplados em nenhum programa
 	   - Por outro existem municípios que receberam até 4 programas.

## Design
	- Para exibir as informações que refletem dados dos programas nos municípios, foi selecionada a exibição sobre um mapa, cada programa será apresentado por vez, onde os locais onde foram aplicados terão uma bolha em cima com seu raio referente ao tamanho do benefício no local.
	- O desenho da visualizaçao objetiva apresentar a distribuiçao dos programas no estado, inicialmente é apresentado programa a programa de forma automática(design-driven) apreentando pr 3 segundos cada programa.
	- Após a exibiçao é permitido ao usuário selecionar qual programa deseja visualizar, ver seus detalhes e ao por o mouse sobre cada uma das áreas obter detalhes sobre os números daquela área.

## Feedback
	- Avaliador 1
	Avaliação: <pre> "Eu achei bacana no geral. Acho que poderia ser um pouco mais intuitivo. No começo, aquela animação atrapalha um pouco é muita informação e não conseguimos saber o que tá sendo mostrado exatamente acho que as bolas amarelas poluem um pouco também. Poderia pensar numa outra forma de mostrar esses números, ou coloca uma opção pro usuário ativar ou não esse componente no mais bem bacana"</pre>
	Ações: Melhoria nas explicaçoes, revisão na exibiçao dos dados na parte lateral.

	- Avaliador 2
	Avaliação: 
	1) quando inicia, fica passando gráfico por gráfico, fiquei confuso, não sabia como  era o funcionamento. Daí entendi que passa de um por um e depois fica disponível pra ir selecionando talvez se já abrir direto na opção de ir selecionando seja mais eficaz
	2) nos dois últimos botões, contemplados e não contemplados poderia mudar a cor, o verde sugere coisa positiva mas está no botão de não contemplados
	3) demorei a entender que a bola amarela é pra indicar a quantidade alunos, quanto maior mais alunos e exibe o popup. Talvez alguma legenda ou orientação pra informar isso ajude (ou eu que sou burro mesmo, hehe)
	Ações: Revisão da passagem automática, mudança da cor dos botoes, adicionado legenda.

	- Avaliador 3
	Avaliação:
	O que você percebe na visualização?
	A distribuição dos programas pelos municípios além da quantidade de beneficiados.

	Quais perguntas você tem sobre os dados?
	Nenhuma.

	Quais relacionamentos você percebe?
	Municípios x quantidade de inscritos por programa.
	Municípios x quantidade de programas.

	O que você acha que é o ponto chave dessa visualização?
	Conhecer os municípios não contemplados para poder executar ações com eles.

	Há algo que você não entende no gráfico?
   	Não, o gráfico está claro e explicativo.

## Fontes
 - https://github.com/d3/d3/wiki
 - https://www.w3schools.com
 - https://developer.mozilla.org
 - https://stackoverflow.com
 - http://www.educacao.ma.gov.br/
