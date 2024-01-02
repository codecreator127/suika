import React from 'react';
import CherryImage from '../public/assets/cherry.jpg';
import StrawberryImage from '../public/assets/strawberry.png';
import GrapeImage from '../public/assets/grapes.png';
import DekoponImage from '../public/assets/dekopon.png';
import OrangeImage from '../public/assets/orange.png';
import AppleImage from '../public/assets/apple.jpg';
import PearImage from '../public/assets/pear.png';
import PeachImage from '../public/assets/peach.png';
import PineappleImage from '../public/assets/pineapple.png';
import MelonImage from '../public/assets/melon.png';
import WatermelonImage from '../public/assets/watermelon.png';

class Fruit {   
    image_url: {src: string};
    name: string;
    points: number;
  
    constructor(name: string, points: number, image_url: {src: string}) {
      this.image_url = image_url;
      this.name = name;
      this.points = points;
    }
  }
  
  const Cherries = new Fruit("Cherries", 2, CherryImage);
  const Strawberry = new Fruit("Strawberry", 4, StrawberryImage);
  const Grapes = new Fruit("Grapes", 6, GrapeImage);
  const Dekopon = new Fruit("Dekopon", 8, DekoponImage);
  const Orange = new Fruit("Orange", 10, OrangeImage);
  const Apple = new Fruit("Apple", 12, AppleImage);
  const Pear = new Fruit("Pear", 14, PearImage);
  const Peach = new Fruit("Peach", 16, PeachImage);
  const Pineapple = new Fruit("Pineapple", 18, PineappleImage);
  const Melon = new Fruit("Melon", 20, MelonImage);
  const Watermelon = new Fruit("Watermelon", 22, WatermelonImage);

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
          <thead>
            <tr>
              <th>Fruit Image</th>
              <th>Fruit Name</th>
              <th>Point per fruit</th>
            </tr>
          </thead>
          <tbody>
            {Fruit_Data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <img src={val.image_url.src} alt="Fruit image" height={30} width={30}/>
                  </td>
                  <td>{val.name}</td>
                  <td>{val.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    );
  }