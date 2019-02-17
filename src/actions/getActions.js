import fetch from 'isomorphic-fetch';

export function checkUsername() {
    return fetch('http://hmf.student.rit.edu:1080/getUser?username=example1', {
        method: 'GET',
        headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET',
                    'Access-Control-Allow-Headers':'application/json',
                    'Content-Type': 'application/json',
                    'X-Debug-Mode': 'true'
                },
        mode: 'no-cors',
    }).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export function getMoods(id) {
    let url = 'http://hmf.student.rit.edu:1080//getMood?userId=' + id;
    return fetch(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
            'Content-Type': 'application/json',
            'X-Debug-Mode': 'true'

        },
        mode: 'no-cors',
    }).then(res => {
        console.log(res);
        return res;
    }).catch(err => {
            console.log(err);
            return err;
        });
    
    
}

export function createUser(data, callback) {
    return fetch('http://hmf.student.rit.edu:1080/createUser', {
        method: 'POST',
        headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET',
                    'Access-Control-Allow-Headers':'application/json',
                    'Content-Type': 'application/json',
                    'X-Debug-Mode': 'true'
                },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res);
        return callback(res);
    }).catch(err => {
        console.log(err);
        return err;
    });
}

export function logIn(data, callback) {
    return fetch('http://hmf.student.rit.edu:1080/loginUser', {
        method: 'POST',
        headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET',
                    'Access-Control-Allow-Headers':'application/json',
                    'Content-Type': 'application/json',
                    'X-Debug-Mode': 'true'
                },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res);
        return callback(res.json());
    }).then((data) => {
          console.log(data);
      }).catch(err => {
        console.log(err);
        return err;
    });
}