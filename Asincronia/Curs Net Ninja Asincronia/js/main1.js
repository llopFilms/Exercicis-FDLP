console.log('---------------- main1.js -----------------');

console.log(1);
console.log(2);
setTimeout(() => {
  console.log('Callback engegada!');
}, 500);
console.log(3);
console.log(4);

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((todo1) => console.log('Resposta Fecth -->', todo1));

const rebreToDos = (callback, id) => {
  // Poso un setTimeout perquè sinó es fa això abans que el fecth
  setTimeout(() => {
    // HTTP request
    const peticio = new XMLHttpRequest();
    // Estats de la peticio: 0, 1, 2, 3, 4 --> readystate
    peticio.readyState === 0 &&
      console.log(
        'readyState = 0 --> Peticio no iniciada. No hem cridat open()'
      );

    peticio.addEventListener('readystatechange', () => {
      switch (peticio.readyState) {
        case 1:
          console.log('readyState = 1 --> Peticio iniciada. Hem cridat open()');
          break;
        case 2:
          console.log(
            'readyState = 2 --> Peticio recollida. Hem cridat send(). Headers i status, disponibles'
          );
          break;
        case 3:
          console.log(
            "readyState = 3 --> Peticio procesada. Rebent dades a 'responseText'"
          );
          break;
        case 4:
          console.log(
            'readyState = 4 --> Peticio finalitzada. Hem cridat onload()'
          );
          break;
      }
    });

    // Codis de resposta --> status codes
    // 200 --> OK --> responseText --> {...contingut...}
    // 404 --> NOT FOUND --> responseText --> {}

    peticio.open('GET', `https://jsonplaceholder.typicode.com/todos/${id}`);
    // petició configurada
    peticio.send(); // petició iniciada amb una cruda asíncrona
    peticio.onload = () => {
      // petició finalitzada
      if (peticio.status === 200 && peticio.readyState === 4) {
        console.log('response -->', JSON.parse(peticio.response));
        callback(undefined, peticio.responseText);
        /*
        console.log('status -->', peticio.status, 'Tenim recollides les dades');
        console.log('responseText -->', peticio.responseText);
        */
      } else {
        callback('No podem recollir les dades', undefined);
        /*
        console.log('responseText -->', peticio.responseText);
        console.log('status -->', peticio.status, 'No podem recollir les dades');
       */
      }
    };
  }, 1000);
};

rebreToDos((error, dades) => {
  console.log('Callback cridat');
  if (error) {
    console.log(error);
  } else {
    console.log(dades);
  }
}, 1);

const callback = (error, dades) => {
  console.log('Callback cridat');
  if (error) {
    console.log(error);
  } else {
    console.log(dades);
  }
};
rebreToDos(callback, 2);
