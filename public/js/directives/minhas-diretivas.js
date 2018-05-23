angular.module('minhasDiretivas', [])
    .directive('meuPainel', function () {

        //Direct Definition Object
        var ddo = {};

        //duas formas Attribute e/ou Element 
        ddo.restrict = "AE";
        /* Como Attribute: 
            <div meu-painel>
            <div>

            E como Element
            <meu-painel>
            </meu-painel>

            **** VEJA como é o nome "CamelCase" e vc chama
            com letras minúsculas separadas por hífen(-)
        */
        ddo.scope = {
            titulo: '@'
        };
        /* 
            @titulo é o atributo que será passado de fora
            <meu-painel titulo="Cachambirra">
            </meu-painel>
            -Por acaso dentro da diretiva o valor da propriedade do escopo
             é igual e se chama título

            -Se fosse
            <meu-painel luciano="Cachambirra">
            </meu-painel>

             titulo: '@luciano'

            - Se são iguais vc pode usar só o @    
            titulo: '@'

            - O '@' indica que o valor passado para a diretiva será passado como String (valor)
        */
       // Manterá tags filhas dentro das tags da diretiva, no caso a img
        ddo.transclude = true; 

        ddo.templateUrl = 'js/directives/meu-painel.html';

        return ddo;
   })

  .directive('minhaFoto', function () {

        var ddo = {};

        ddo.restrict = "AE";
        ddo.scope = {
            url: '@',
            titulo: '@'
        };

        ddo.template = '<img class="img-responsive center-block" ng-src="{{url}}" alt="{{titulo}}">';

        return ddo;
    })
    
    .directive('meuBotaoPerigo', function(){
        var ddo= {};
        ddo.restrict = "E";
        ddo.scope = {
            nome: '@',
            acao: '&' // O modificado & faz o biding por referência
        };
        ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao()">{{nome}}</button>';

        return ddo;
    })
    
    .directive('meuFocus', function() {
        var ddo = {};
        ddo.restrict = "A";
        ddo.scope = {
            focado: '='
        };

        ddo.link = function(scope, element) {
            // fase que dá acesso ao DOM e só nessa fase
            // vc tem acesso aos observadores Watchers
            // Esse scope é da Diretiva ... NÃO é o $scope do Controller

            //CUIDADO com o número excessivo de watchers
           
            /*Trocando o Watcher
            
            scope.$watch('focado', function(){
                //JqLite ou JQuery

                if (scope.focado){
                    element[0].focus();
                    scope.focado = false;
                }
            });

            */
            scope.$on('fotoCadastrada', function(){
                element[0].focus();
            });
        };

        return ddo;
    })

    .directive('meusTitulos', function() {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        
        ddo.controller = function($scope, recursoFoto) {
            recursoFoto.query(function(fotos) {
                $scope.titulos = fotos.map(function(foto) {
                    return foto.titulo;
                });    
            });
        };
        return ddo;
    });
    
