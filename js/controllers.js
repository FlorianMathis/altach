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
  $scope.fetchscra =function(){
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
    $scope.$broadcast('scroll.refreshComplete');

    //own parser yay!
    /*
    should use x = getElementsByTagName("Name")[0];
    x.childNodes[0];
    */

    var parser = new DOMParser;
  //console.log(response.data);
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
}
$scope.fetchscra();

}])

.controller('newsCtrl',['$scope', '$stateParams','$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicLoading) {
$scope.doRefresh =function(){
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
    url: 'https://cors-anywhere.herokuapp.com/https://news.google.com/news/rss/search/section/q/scr%20altach%20OR%20altach/scr%20altach%20OR%20altach?hl=en&gl=US&ned=us%3Foutput%3Drss&tbm=nws&source=lnt&tbs=sbd:1"'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.hide();
    $scope.$broadcast('scroll.refreshComplete');

    $scope.googlenews = {};
    var parser = new DOMParser();
    var googlexml = parser.parseFromString(response.data, "application/xml");
    var x = googlexml.getElementsByTagName("item");
    var arr = [].slice.call(x);
    arr.forEach(function(element, i){
      var title = element.childNodes[0];
      var link = element.childNodes[1];
      var source = link.innerHTML.substring(link.innerHTML.lastIndexOf("www."), getPosition(link.innerHTML,"/",3));
      $scope.googlenews[i] = {
        'title': title.innerHTML,
        'link': link.innerHTML,
        'source': source,
      };
    });
    console.log("refresh");
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  $scope.goto = function(link){
    document.location.href = link;
  }

  function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

}
$scope.doRefresh();

}])

.controller('spieltagCtrl', ['$scope', '$stateParams','$http','$ionicLoading', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $ionicLoading) {
  var parser = new DOMParser();
  $scope.spieltag = {};
  $scope.spieltagnr = "";
  $scope.fetchspieltag =function(){
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
  $scope.show();
  $http({
    method: 'GET',
    url: 'https://cors-anywhere.herokuapp.com/http://rss.kicker.de/live/tmobilebundesliga'
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.hide();
    $scope.$broadcast('scroll.refreshComplete');
    var spieltagxml = parser.parseFromString(response.data, "application/xml");
    console.log(spieltagxml);
    var x = spieltagxml.getElementsByTagName("item");
    spieltagnr = spieltagxml.getElementsByTagName("category").innerHTML;
    var arr = [].slice.call(x);
    console.log(arr);
    arr.forEach(function(element, i){
      var title = element.childNodes[1];
      var link = element.childNodes[3];
      var description = element.childNodes[5];
      $scope.spieltag[i] = {
        'title': title.innerHTML,
        'link': link.innerHTML,
        'description': description.innerHTML.replace("<![CDATA[","").replace("]]>",""),
      };
    });
    console.log($scope.spieltag);

  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log("no response");
  });
  $scope.goto = function(link){
    document.location.href = link;
    console.log(link);
  }
}
$scope.fetchspieltag();

}])


.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('aboutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
