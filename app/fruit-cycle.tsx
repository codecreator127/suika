// import './App.css';


// Refactor this into a separate file once you can 

class Fruit {
    image_url: string;
    name: string;
    points: number;

    constructor(image_url: string, name: string, points: number) {
        this.image_url = image_url;
        this.name = name;
        this.points = points;
    }
}

let Cherries = new Fruit("Image_cherry", "Cherries", 2);
let Strawberry = new Fruit("image_str", "Strawberry", 4);
let Grapes = new Fruit("image_str", "Grapes", 6);
let Dekopon = new Fruit("image_str", "Dekopon", 8);
let Orange = new Fruit("image_str", "Orange", 10);
let Apple = new Fruit("image_str", "Apple", 12);
let Pear = new Fruit("image_str", "Pear", 14);
let Peach = new Fruit("image_str", "Peach", 16);
let Pineapple = new Fruit("image_str", "Pineapple", 18);
let Melon = new Fruit("image_str", "Melon", 20);
let Watermelon = new Fruit("image_str", "Watermelon", 22);


const Fruit_Data = [
    Cherries,
    Strawberry,
    Grapes,
    Dekopon,
    Orange,
    Apple,
    Pear,
    Peach,
    Pineapple,
    Melon,
    Watermelon,
    
]

export default function FruitCycle() {
    return (
        <div>
            <table>
                <tr>
                    <th>Fruit Image</th>
                    <th>Fruit Name</th>
                    <th>Point per fruit</th>
                </tr>
                {Fruit_Data.map((val, key) => {
                    return (
                        <tr key={key}>
                            {/* Replace the td of image_url to images once we have assets */}
                            <td>{val.image_url}</td> 
                            <td>{val.name}</td>
                            <td>{val.points}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
  }