angular.module('alurapic')
    .controller('FotoController', function ($scope, recursoFoto, $routeParams){ //$http, $routeParams, $resource) {

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

                    if ($routeParams.fotoId) {

                        // $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                        //     .success(function () {
                        recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto, function() {    
                                $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada com sucesso';
                            }, function(erro){
                            // .error(function (erro) {
                                console.log(erro);
                                $scope.mensagem = 'Não foi possível alterar a foto';
                            });

                    } else {
                        // $http.post('/v1/fotos', $scope.foto)
                        // .success(function () {
                            //retorna uma promessa de quando tiver sucesso
                        recursoFoto.save($scope.foto, function() {    
                                $scope.foto = {};
                                $scope.mensagem = 'Foto cadastrada com sucesso !';
                            }, function(erro) {
                            // .error(function (erro) {
                                console.log(erro);
                                $scope.mensagem = 'Não foi possível cadastrar a foto';
                            });
                    }
                }
            };

        });