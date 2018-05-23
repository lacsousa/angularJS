angular.module('alurapic').controller('FotosController',
    function ($scope, recursoFoto) { //$resource, $http) {
        /*
         * O angular ficou famoso pq iniciou com a injeção de dependências
         * No caso o $scope é uma injeção de dependências
         * Vai te dar o escopo necessário pra vc pegar o conteúdo da variável foto
         *
         * O $scope é um POJO ... então posso referenciá-lo estaticamente
         */

       // var recursoFoto = $resource('/v1/fotos/:fotoId');
        recursoFoto.query( function(fotos){
            $scope.fotos = fotos;
        }, function (erro) {
            console.log(erro);    
        });

        $scope.fotos = [];
        $scope.filtro = '';

        // var promise = $http.get('v1/fotos')
        //     .success(function (fotos) {
        //         $scope.fotos = fotos;
        //     })
        //     .error(function (erro) {
        //         console.log(erro);
        //     });


        $scope.remover = function (foto) {

            //$http.delete('/v1/fotos/' + foto._id).success(function () {
            recursoFoto.delete({fotoId: foto._id}, function () {

                    var indiceDaFoto = $scope.fotos.indexOf(foto);
                    $scope.fotos.splice(indiceDaFoto, 1); // não retorna uma nova lista
                    //o splice modifica a lista que ele está operando
                    $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso';
                // })
                // .error(function (erro) {
            }, function(erro){    
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
                });
        };


        /*             var promise = $http.get('v1/fotos'); // isso é assíncrono
                    promise.then(function(retorno){
                        $scope.fotos = retorno.data;
                    }).catch(function(error){
                        console.log(error);
                    });
         */
        /* [    {
                    titulo: 'Águia 1 ',
                    url: 'http://imagens.mundoentrepatas.com/imagenes/fundos-de-ecra-aguias-p.jpg'
                },
                {
                    titulo: 'Águia 2 ',
                    url: 'http://imagens.mundoentrepatas.com/imagenes/fundos-de-ecra-aguias-p.jpg'
                },
                {
                    titulo: 'Águia 3 ',
                    url: 'http://imagens.mundoentrepatas.com/imagenes/fundos-de-ecra-aguias-p.jpg'
                }
            ];
                
        */

    });