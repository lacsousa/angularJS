angular.module('alurapic')
    .controller('FotoController', function ($scope, recursoFoto, $routeParams, cadastroDeFotos){ //$http, $routeParams, $resource) {

        // var recursoFoto = $resource('/v1/fotos/:fotoId', null, {
        //     update: {
        //         method: 'PUT'
        //     }
        // }); 
        // o null é quando eu quero usar queryString ?

        //comentei o código aí em cima porque agora está em meus-servicos.js

            $scope.foto = {};
            $scope.mensagem = '';

            if ($routeParams.fotoId) {
                // $http.get('/v1/fotos/' + $routeParams.fotoId)
                //     .success(function (foto) {
                    recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
                        $scope.foto = foto;
                    }, function(erro) {
                    // .error(function (erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível obter a foto';
                    });
            }

            $scope.submeter = function () {
                console.log($scope.foto);
                if ($scope.formulario.$valid) {
                    cadastroDeFotos.cadastrar($scope.foto)
                    .then(function(dados){
                        $scope.mensagem = dados.mensagem;
                        if (dados.inclusao) {
                            $scope.foto = {};
                        }
                        $scope.focado = true;
                    })
                    .catch(function(erro){
                        $scope.mensagem = erro.mensagem;
                    });
                }
            };

            
        });