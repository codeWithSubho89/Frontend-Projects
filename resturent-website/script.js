

const menuArea = document.querySelector('.menu-area');
const buttons = document.querySelectorAll('#menu .buttons button');


const menuItems = [
  // Starters
  {
    id: 1,
    category: "Starters",
    name: "Tomato Soup",
    description: "Fresh tomatoes cooked with herbs and cream",
    price: 5.99
  },
  {
    id: 2,
    category: "Starters",
    name: "Garlic Bread",
    description: "Toasted bread with garlic butter and herbs",
    price: 4.49
  },
  {
    id: 3,
    category: "Starter",
    name: "Caesar Salad",
    description: "Crisp lettuce with parmesan and Caesar dressing",
    price: 6.25
  },

  // Main Course
  {
    id: 4,
    category: "Main Course",
    name: "Grilled Chicken",
    description: "Juicy grilled chicken served with vegetables",
    price: 12.99
  },
  {
    id: 5,
    category: "Main Course",
    name: "Pasta Alfredo",
    description: "Creamy Alfredo sauce with penne pasta",
    price: 11.49
  },
  {
    id: 6,
    category: "Main Course",
    name: "Veggie Burger",
    description: "Plant-based patty with lettuce and tomato",
    price: 10.75
  },

  // Desserts
  {
    id: 7,
    category: "Desserts",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with fudge frosting",
    price: 6.99
  },
  {
    id: 8,
    category: "Desserts",
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and nuts",
    price: 5.49
  },
  {
    id: 9,
    category: "Desserts",
    name: "Fruit Tart",
    description: "Seasonal fruits on a buttery tart base",
    price: 6.25
  }
];

function createCard(array){
    array.forEach((item)=>{
        const menuCard = document.createElement("div");
        const title = document.createElement("h3");
        const price = document.createElement("span");
        const description = document.createElement("p");

        menuCard.className = "menu-card";
        title.textContent = item.name;
        price.textContent = `$${item.price}`;
        description.textContent =item.description ;

        menuCard.appendChild(title);
        menuCard.appendChild(price);
        menuCard.appendChild(description); 

        menuArea.appendChild(menuCard);
    })
}
createCard(menuItems)
buttons.forEach((button)=>{
  
    button.addEventListener('click',(e)=>{
      buttons.forEach(btn=> btn.classList.remove('active'));
      button.classList.add('active')
        const selectedItem = e.target.textContent;
        menuArea.innerHTML = '';
        if(selectedItem === 'All'){
            createCard(menuItems)
        }else{
            const newArray = menuItems.filter(item => item.category === selectedItem)
            createCard(newArray)
        }
    })
})