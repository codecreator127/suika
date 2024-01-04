'use client'
// components/MatterComponent.js
import React, { useEffect } from 'react';
import Matter from 'matter-js';

// import Fruit_Data from './fruit-base';

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
import { Yellowtail } from 'next/font/google';



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
  
  const Cherries = new Fruit("Cherry", 2, CherryImage, 25.5);
  const Strawberry = new Fruit("Strawberry", 4, StrawberryImage, 30);
  const Grapes = new Fruit("Grapes", 6, GrapeImage, 40);
  const Dekopon = new Fruit("Dekopon", 8, DekoponImage, 50);
  const Orange = new Fruit("Orange", 10, OrangeImage, 55);
  const Apple = new Fruit("Apple", 12, AppleImage, 70);
  const Pear = new Fruit("Pear", 14, PearImage, 77);
  const Peach = new Fruit("Peach", 16, PeachImage, 80);
  const Pineapple = new Fruit("Pineapple", 18, PineappleImage, 88);
  const Melon = new Fruit("Melon", 20, MelonImage, 92);
  const Watermelon = new Fruit("Watermelon", 22, WatermelonImage, 100);

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


const GameArea = () => {
  useEffect(() => {
    console.log('rendered');
    // initial set up
    const engine = Matter.Engine.create();

    // game area walls
    const leftWall = Matter.Bodies.rectangle(15, 395, 30, 790, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });
  
    const rightWall = Matter.Bodies.rectangle(605, 395, 30, 790, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });
  
    const topLine = Matter.Bodies.rectangle(310, 150, 620, 2,{
      // name: "topLine",
      isStatic: true,
  
      // A line to check if the fruits are overflowing or not.
      isSensor: true,
      render: {fillStyle: "#E6B143"}
  
    });
  
    const ground = Matter.Bodies.rectangle(310, 820, 620, 60, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });

    //add walls to world
    Matter.World.add(engine.world, [leftWall, rightWall, topLine, ground]);


    // test fruit spawn
    // import image
    const fruit = Fruit_Data[1];
    // console.log(fruit);


    // Render the engine
    const render = Matter.Render.create({
      element: document.getElementById('game-area'), // Use an element with the ID 'game-area'
      engine: engine,
      options: {
        wireframes: false,
        background: "000000",
        width: 800,
        height: 800,
      }
    });

    Matter.Render.run(render);

    let currentBody = null;
    let currentFruit = null;
    let disableAction = false;
    let interval = null;
    let suika_score = 0;
    let gameOver = false;

    const runner = Matter.Runner.create();

    // image loader for fruit bodies
    const loadImage = (url: string, onSuccess: any, onError: any) => {
      const img = new Image();
      img.onload = () => {
        onSuccess(img.src);
      };
      img.onerror = onError();
      img.src = url;
    };
    
    // chance of bigger fruit spawning
    let fruit_multiplier = 5;

    function addFruit(x:number, y: number) {
      const fruitIndex = Math.floor(Math.random() * fruit_multiplier)

      // import image
      const fruit = Fruit_Data[fruitIndex];
      // console.log(fruit);

      const game_fruit = Matter.Bodies.circle(x, y, fruit.radius, {
        // density: 0.0005,
        // frictionAir: 0.06,
        // restitution: 0.3,
        // friction: 0.01,
        render: {
          sprite: {
            xScale: 1,
            yScale: 1,
            texture: fruit.image_url.src // set texture here
          }
        }
      });
      
      loadImage(
        fruit.image_url.src,
        () => {
          console.log("Success");
          Matter.World.add(engine.world, game_fruit);
        },
        () => {
          console.log("Error  Loading ");
        }
      );
      currentBody = game_fruit;
      currentFruit = fruit;
    }

    addFruit(300, 300);

    // click to add fruit
    const mouse = Matter.Mouse.create(render.canvas);

    // Create a mouse constraint
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // Add the mouse constraint to the world
    Matter.World.add(engine.world, mouseConstraint);

    // Listen for mouse clicks
    Matter.Events.on(mouseConstraint, 'mousedown', (event) => {
      // Handle mouse click event here
      console.log('Mouse clicked at:', event.mouse.position);

      addFruit(event.mouse.position.x, event.mouse.position.y)

      
    });

    // Start the physics engine
    Matter.Runner.run(runner, engine);

    // Clean up on component unmount
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, true);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <div id="game-area" style={{ width: '100%', height: '20vh' }} />;
};

export default GameArea;
