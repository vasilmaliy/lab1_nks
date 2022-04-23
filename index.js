
const inputSample = [1325, 977, 243, 3, 145, 997, 27, 67, 30, 934, 1039, 240, 371, 86, 164, 96, 156, 145, 280, 444, 887, 726, 41, 503, 174, 1809, 349, 532, 1541, 148, 489, 198, 4, 761, 389, 37, 317, 1128, 514, 426, 23, 184, 365, 153, 624, 31, 49, 1216, 61, 189, 286, 1269, 365, 1085, 279, 228, 95, 391, 683, 39, 7, 486, 715, 204, 1553, 736, 1622, 1892, 448, 23, 135, 555, 252, 569, 8, 491, 724, 331, 1243, 567, 788, 729, 62, 636, 227, 227, 245, 153, 151, 217, 1009, 143, 301, 342, 48, 493, 117, 78, 113, 67];
const k = 10;
const N = inputSample.length;
const γ = 0.74;
const time = 1798;

math.sort(inputSample);

//input_sample[0]
const h = ( inputSample[N-1] - 0 ) / k; 

function findAverageValue( elements ) {
  return math.sum(elements) / elements.length;
}

function chunkArray( myArray, h, numberOfIntervals ){
  let results = [];
  let interval = [];

  for ( let i = 0; i < numberOfIntervals; i++ ) {
    myArray.forEach( element => {
      if ( element > h*i && element <= h*(i + 1) ) {
        interval.push(element);
      }
    })
    results.push(interval);
    interval = [];
  }
  
  return results;
}

function calculateFrequencies( array, h) {
  let results = [];

  array.forEach( interval => {
    results.push(interval.length / ( 100 * h));
  })

  return results;
}

function calculateTroubleFreeOperation ( frequenciesArray, h) {
  let results = [1];

  frequenciesArray.reduce( ( previousValue, currentValue ) => {

    let P = 1 - h*(previousValue + currentValue);
    results.push(P);

    return previousValue + currentValue;
  }, 0)
  
  return results;
}

function findIntensity ( f , P) {
   return f/ P;
}

function findProbabilityOfTroubleFreeOperation(time, h, frequencyArray) {

  let subtractor = 0;
  let intensity;
  let index;
  let P;

  for (index = 0; index <= frequencyArray.length; index++) {
      
    if ( h*( index + 1) > time ) {
      subtractor += frequencyArray[index]* ( time - h*index)
      break;
    }

    subtractor += h*frequencyArray[index];
  }
  
  P = 1 - subtractor;

  return [ P, findIntensity ( frequencyArray[index] , P) ];
}


const AverageValue = findAverageValue(inputSample);
let inputIntervalSample = chunkArray( inputSample,  h, 10);
let frequencyArray = calculateFrequencies(inputIntervalSample, h);
let PArray = calculateTroubleFreeOperation(frequencyArray, h);

const d01 = (PArray[1] - γ)/(PArray[1] - PArray[0])
const T09 = h*1 - h*d01;

let [ProbabilityOfTroubleFreeOperation, intensity] = findProbabilityOfTroubleFreeOperation(time, h, frequencyArray);

console.log("середній наробіток до відмови: Tср = " + AverageValue);
console.log("\nдовжина одного інтервалу буде дорівнювати: h = " + h);
console.log("\nзначення статистичної щільності розподілу ймовірності відмови для кожного інтервалу : " + frequencyArray);
console.log("\nзначення ймовірності безвідмовної роботи пристрою на час правої границі інтервалу для кожного інтервалу : " + PArray);

console.log("Tγ при γ = " + γ +": Tγ = "+ T09);
console.log("ймовірність безвідмовної роботи на час "+ time +" годин : P = " + ProbabilityOfTroubleFreeOperation );
console.log("інтенсивність відмов на час "+ time +" годин : λ = " + intensity );

















var options = {
  series: [{
  name: 'Servis',
  // data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31]
  data: frequencyArray
}],
  annotations: {
  points: [{
    seriesIndex: 0,
    label: {
      borderColor: '#775DD0',
      offsetY: 0,
      style: {
        color: '#fff',
        background: '#775DD0',
      },
    }
  }]
},
chart: {
  height: 400,
  type: 'bar',
},
plotOptions: {
  bar: {
    borderRadius: 1,
    columnWidth: '50%',
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  width: 2
},

grid: {
  row: {
    colors: ['#fff', '#f2f2f2']
  }
},
xaxis: {
  labels: {
    rotate: -45
  },
  // categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas',
  //   'Blackberries', 'Pears', 'Watermelons', 'Cherries', 'Pomegranates', 'Tangerines', 'Papayas'
  // ],
  tickPlacement: 'on'
},
yaxis: {
  title: {
    text: 'Графік статистичної густини розподілу',
  },
},
fill: {
  type: 'gradient',
  gradient: {
    shade: 'light',
    type: "horizontal",
    shadeIntensity: 0.25,
    gradientToColors: undefined,
    inverseColors: true,
    opacityFrom: 0.85,
    opacityTo: 0.85,
    stops: [50, 0, 100]
  },
}
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();




