var UserProfile = (function() {
  var full_name = "";
  var daily = false;
  var id = '';

  var getId = function() {
    return id;
  };

  var setId = function(new_id) {
    id = new_id;
  }

  var getName = function() {
    return full_name;    // Or pull this from cookie/localStorage
  };
  var setName = function(name) {
    full_name = name;
    // Also set this in cookie/localStorage
  };

  var getDaily = function(){
    return daily;
  }

  var setDaily = function(new_daily){
    daily = new_daily;
  }

  return {
    getName: getName,
    setName: setName,
    getDaily: getDaily,
    setDaily: setDaily,
    getId: getId,
    setId: setId,
  }

})();

export default UserProfile;