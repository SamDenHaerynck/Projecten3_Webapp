'use strict';

app.controller('SidebarCtrl', function($scope) {
    var sidebar = document.getElementById('sidebar-left');
    sidebar.style.height = document.body.parentNode.scrollHeight + 'px';

});
