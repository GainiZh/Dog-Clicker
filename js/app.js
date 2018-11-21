//build a modal with doggies
let model = {
  currentDog: null,
  dogs: [
    {
      clickCount : 0,
      name : 'Markiza',
      imgSrc : 'img/collie.jpeg',
      imgCredit : 'https://www.pexels.com/photo/adult-tri-color-shetland-sheepdog-1604820'
    },
    {
      clickCount : 0,
      name : 'Rex',
      imgSrc : 'img/rex.jpeg',
      imgCredit : 'https://www.pexels.com/photo/adorable-animal-breed-canine-351406'
    },
    {
      clickCount : 0,
      name : 'Corgi',
      imgSrc : 'img/corgi.jpeg',
      imgCredit : 'https://www.pexels.com/photo/pembroke-welsh-corgi-lying-on-the-sand-under-white-cloud-blue-sky-164186'
    },
    {
      clickCount : 0,
      name : 'Puppy',
      imgSrc : 'img/puppy.jpeg',
      imgCredit : 'https://www.pexels.com/photo/dog-tough-small-puppy-69372'
    }
  ]
};

let mainLogik = {

  init: function() {
    // set current dog to the first dog on the list
    model.currentDog = model.dogs[0];
    // initialize views
    dogListView.init();
    dogView.init();
  },

  getCurrentDog: function() {
    return model.currentDog;
  },

  getDogs: function() {
    return model.dogs;
  },

  setCurrentDog: function(dog) {
    model.currentDog = dog;
  },

  incrementCounter: function() {
    model.currentDog.clickCount++;
    dogView.render();
  }
};

let dogView = {

  init: function() {
    //DOM elements
    this.dogElem = document.getElementById('dog');
    this.dogNameElem = document.getElementById('name');
    this.dogImageElem = document.getElementById('dog-img');
    this.countElem = document.getElementById('count');

    // add event listener when image is clicked
    this.dogImageElem.addEventListener('click', function() {
      mainLogik.incrementCounter();
    });

    // update the view
    this.render();
  },

  render: function() {
    // update the DOM elements
    let currentDog = mainLogik.getCurrentDog();
    this.countElem.textContent = currentDog.clickCount;
    this.dogNameElem.textContent = currentDog.name;
    this.dogImageElem.src = currentDog.imgSrc;
  }
};

let dogListView = {

  init: function() {
    // DOM element for easy access
    this.dogListElem = document.getElementById('list');

    // update the view
    this.render();
  },

  render: function() {
    let dog, elem, i;
    // dogs which will be updated later
    let dogs = mainLogik.getDogs();
    //empty the list
    this.dogListElem.innerHTML = '';
    // loop through the dogs
    for(i = 0; i < dogs.length; i++) {
      dog = dogs[i];

      elem = document.createElement('li');
      elem.textContent = dog.name;

      elem.addEventListener('click', (function(dogCopy) {
        return function() {
          mainLogik.setCurrentDog(dogCopy);
          dogView.render();
        };
      })(dog));

      this.dogListElem.appendChild(elem);
    }
  }
};

mainLogik.init();
