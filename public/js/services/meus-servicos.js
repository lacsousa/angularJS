angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function($resource){

        return $resource('/v1/fotos/:fotoId', null, {
            'update' : {
                method: 'PUT'
            }
        });

    })
    // todos os $scope herdam desse $rootScope

    .factory("cadastroDeFotos", function(recursoFoto, $q, $rootScope){
        var servico = {};
        var evento = 'fotoCadastrada';

        servico.cadastrar = function(foto){
            return $q(function(resolve, reject){
                //alterar
                if(foto._id){
                    recursoFoto.update({fotoId: foto._id}, foto, function() {    
                        //alternativa ao Watcher - Espalha uma msg
                        //$rootScope é o scope maior de todos
                        $rootScope.$broadcast(evento);

                        resolve({
                             mensagem : 'Foto ' + foto.titulo + ' foi alterada com sucesso',
                             inclusao: false
                        });
                    }, function(erro){
                        console.log(erro);
                        reject({
                            mensagem: 'Não foi possível alterar a foto' + foto.titulo
                        });
                    });
                }else{
                    //incluir
                    recursoFoto.save(foto, function(){
                        //alternativa ao Watcher - Espalha uma msg
                        $rootScope.$broadcast(evento);

                        resolve({
                            mensagem : 'Foto cadastrada com sucesso!',
                            inclusao: true
                        });
                    },function(erro){
                        console.log(erro);
                        reject('Não foi possível cadastrar a foto');
                    });
                }
            });
        };

        return servico;

    });




   