angular.module('app.controllers', [])

.controller('aSBCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('tickerCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('tabelleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('twitterCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('sCRAATCtrl', ['$scope', '$stateParams','$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicLoading) {
  $scope.show = function() {
   $ionicLoading.show({
     template: 'Loading...'
      }).then(function(){
      console.log("The loading indicator is now displayed");
   });
 };
 $scope.hide = function(){
   $ionicLoading.hide().then(function(){
      console.log("The loading indicator is now hidden");
   });
 };
  $scope.items = {};
  $scope.show();
  $http({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/https://newsroom.scra.at/de/scra/all/rss.xml'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.hide();
      //own parser yay!
      /*
      should use x = getElementsByTagName("Name")[0];
      x.childNodes[0];
      */
      var parser = new DOMParser();
      var newsxml = parser.parseFromString(response.data, "application/xml");
      var position = response.data.indexOf("<item>");
      var cleanedstring = response.data.substring(position);
      for(var i=0; i<15; i++){
        // get all data (title, link, description, ...)
        var begin = cleanedstring.indexOf("<item>"); //should be 0
        var end = cleanedstring.indexOf("</item>")+6; // end of one items
        var item = cleanedstring.substring(begin,end);
        // push every single data into an array
        /*
          array1 -> title
          array2 -> link
          array3 -> description
        */
        var parser = new DOMParser;
        var title = item.substring(item.indexOf("<title>")+7,item.indexOf("</title>"));
        var dom = parser.parseFromString('<!doctype html><body>' + title,'text/html');
        title = dom.body.textContent;
        var link = item.substring(item.indexOf("<link>")+6,item.indexOf("</link>"));
        var description = item.substring(item.indexOf("<description>")+13,item.indexOf("</description>")+14);
        description = description.substring(description.indexOf("CDATA[")+6,description.indexOf("]]>"));
        cleanedstring = cleanedstring.slice(end,cleanedstring.length-1);
        $scope.items[i] =
           {
             'title': title,
             'link': link,
             'description': description,
           };
      }

      console.log($scope.items);
    $scope.goto = function(link){
      document.location.href = link;
      console.log(link);
    }
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("no response");
    });


}])

.controller('newsCtrl', ['$scope', '$stateParams',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
