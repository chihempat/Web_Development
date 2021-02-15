import fetch from 'cross-fetch';


const apiurl = 'http://dummy.restapiexample.com/api/v1/employees';



async function getjsondata() {
    const data = await fetch(apiurl);
    const json = await data.json();

    console.log(json[0]);

}


getjsondata();

function getit() {
    fetch(apiurl).then((r) => r.json())
        .then((json) => {
            console.log(json[0])
        }).catch((err) => {
            console.log(err);
        })
}