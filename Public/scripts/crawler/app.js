/**
 * Created by Administrator on 2016/7/24 0024.
 */
var app = angular.module('app', []);
app.controller('crawlerController', ['$scope', '$http', function ($scope, $http) {
    $scope.jobs = [];
    $scope.getJobs = function (pageIndex) {
        var yx = angular.element(document.querySelector("#yx")).val();
        var city = angular.element(document.querySelector("#city")).val();
        var positionName = angular.element(document.querySelector("#keyword")).val();
        $http({
            method: 'POST',
            url: '/getJobs',
            data: {
                'yx': yx,
                'city': city,
                'pageIndex': pageIndex,
                'positionName': positionName
            }
        }).success(function (data) {

            data = JSON.parse(data);
            //$scope.$apply(function(){
            $scope.jobs = data.content.positionResult.result;
            // })
        }).error(
            function (data) {
                alert('获取值为失败:' + data);
            }
        )
    }
    $scope.keyup=function(event){
        event=event||window.event;
        var keycode=event.keyCode;
        console.log(keycode);
        if(keycode===13){
            $scope.getJobs(1);
        }
    }
}])