angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

      .state('tabsController.aSB', {
    url: '/page3',
    views: {
      'tab3': {
        templateUrl: 'templates/aSB.html',
        controller: 'aSBCtrl'
      }
    }
  })

  .state('tabsController.ticker', {
    url: '/page4',
    views: {
      'tab2': {
        templateUrl: 'templates/ticker.html',
        controller: 'tickerCtrl'
      }
    }
  })

  .state('tabsController.tabelle', {
    url: '/page5',
    views: {
      'tab5': {
        templateUrl: 'templates/tabelle.html',
        controller: 'tabelleCtrl'
      }
    }
  })

  .state('tabsController.twitter', {
    url: '/page6',
    views: {
      'tab6': {
        templateUrl: 'templates/twitter.html',
        controller: 'twitterCtrl'
      }
    }
  })

  .state('tabsController.sCRAAT', {
    url: '/page7',
    views: {
      'tab7': {
        templateUrl: 'templates/sCRAAT.html',
        controller: 'sCRAATCtrl'
      }
    }
  })

  .state('tabsController.news', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      }
    }
  })

  .state('tabsController.spieltag', {
    url: '/page8',
    views: {
      'tab8': {
        templateUrl: 'templates/spieltag.html',
        controller: 'spieltagCtrl'
      }
    }
  })

  .state('tabsController.about', {
    url: '/page9',
    views: {
      'tab9': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })



$urlRouterProvider.otherwise('/page1/page2')


});
