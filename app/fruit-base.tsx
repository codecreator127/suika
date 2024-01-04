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
    radius: number;
  
    constructor(name: string, points: number, image_url: {src: string}, radius: number) {
      this.image_url = image_url;
      this.name = name;
      this.points = points;
      this.radius = radius;
    }
  }
  
  const Cherries = new Fruit("Cherry", 2, CherryImage, 20);
  const Strawberry = new Fruit("Strawberry", 4, StrawberryImage, 25);
  const Grapes = new Fruit("Grapes", 6, GrapeImage, 35);
  const Dekopon = new Fruit("Dekopon", 8, DekoponImage, 40);
  const Orange = new Fruit("Orange", 10, OrangeImage, 45);
  const Apple = new Fruit("Apple", 12, AppleImage, 50);
  const Pear = new Fruit("Pear", 14, PearImage, 55);
  const Peach = new Fruit("Peach", 16, PeachImage, 60);
  const Pineapple = new Fruit("Pineapple", 18, PineappleImage, 65);
  const Melon = new Fruit("Melon", 20, MelonImage, 70);
  const Watermelon = new Fruit("Watermelon", 22, WatermelonImage, 80);

let Fruit_Data = [
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

export default Fruit_Data;