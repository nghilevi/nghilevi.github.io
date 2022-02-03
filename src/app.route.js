app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/about-me', {
        templateUrl: 'views/about-me.html',
        controller: 'about-me'
      })
      .when('/my-work', {
        templateUrl: 'views/my-work.html',
        controller: 'my-work'
      })
      .otherwise({
        redirectTo: '/about-me'
      });
  }]);
  