var UserProfile = (function() {
  var full_name = "";
  var daily = false;

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
  }

})();

export default UserProfile;