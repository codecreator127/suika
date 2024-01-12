'use client'
// components/MatterComponent.js
import React, { useEffect, useRef, useState } from 'react';
import Matter, { World } from 'matter-js';
import { db } from '@/firebase';
import Score from './Score'; // Import the Score component

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
import { setServers } from 'dns';



class Fruit {   
    image_url: {src: string};
    name: string;
    points: number;
    radius: number;
    index: any;
  
    constructor(name: string, points: number, image_url: {src: string}, radius: number, index: number) {
      this.image_url = image_url;
      this.name = name;
      this.points = points;
      this.radius = radius;
      this.index = index;
    }
  }
  
  const FruitSpawnHeight = 100;
  const FruitSpawnX = 225;
  const WatermelonRadius = WatermelonImage.height/4;
  const Cherries = new Fruit("Cherry", 2, CherryImage, CherryImage.width/4, 0);
  const Strawberry = new Fruit("Strawberry", 4, StrawberryImage, StrawberryImage.width/4, 1);
  const Grapes = new Fruit("Grapes", 6, GrapeImage, GrapeImage.width/4, 2);
  const Dekopon = new Fruit("Dekopon", 8, DekoponImage, DekoponImage.width/4, 3);
  const Orange = new Fruit("Orange", 10, OrangeImage, OrangeImage.width/4, 4);
  const Apple = new Fruit("Apple", 12, AppleImage, AppleImage.width/4, 5);
  const Pear = new Fruit("Pear", 14, PearImage, PearImage.width/4, 6);
  const Peach = new Fruit("Peach", 16, PeachImage, PeachImage.width/4, 7);
  const Pineapple = new Fruit("Pineapple", 18, PineappleImage, PineappleImage.width/4, 8);
  const Melon = new Fruit("Melon", 20, MelonImage, MelonImage.width/4, 9);
  const Watermelon = new Fruit("Watermelon", 20, WatermelonImage, WatermelonImage.width/4, 10);


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

const fetchLeaderboard = async () => {
  try {
      const leaderboardSnapshot = await db.collection('leaderboard').get();
      const data = leaderboardSnapshot.docs.map(doc => doc.data());
      return data;
  } catch (error) {
      console.log('Error fetching leaderboard data:', error);
      return null;
  }
}

const updateValueInFirestore = async (documentId: string, fieldToUpdate: string, newValue: number) => {
  try {
    const docRef = db.collection("leaderboard").doc(documentId);
    
    // Update the specified field
    await docRef.update({
      [fieldToUpdate]: newValue,
    });

    console.log(`Document ${documentId} updated successfully.`);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

const updateLeaderboard = async (score: number) => {
  let data = await fetchLeaderboard();
  console.log(score);
  if (data) {
    const scores = data.map((doc:any) => doc.score);

    let finalScores = scores.concat([score]);
    finalScores.sort().reverse();
    // console.log(finalScores);

    updateValueInFirestore("rank1", "score", finalScores[0]);
    updateValueInFirestore("rank2", "score", finalScores[1]);
    updateValueInFirestore("rank3", "score", finalScores[2]);
  }
}

const GameArea = () => {
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    let finalScore = 0;
    // initial set up
    const engine = Matter.Engine.create();

    // game area walls
    const leftWall = Matter.Bodies.rectangle(0, 395, 30, 790, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });
  
    const rightWall = Matter.Bodies.rectangle(450, 395, 30, 790, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });
  
    const topLine = Matter.Bodies.rectangle(310, 50, 620, 2,{
      // name: "topLine",
      isStatic: true,

      // A line to check if the fruits are overflowing or not.
      isSensor: true,
      render: {fillStyle: "#E6B143"}
  
    });
  
    const ground = Matter.Bodies.rectangle(310, 600, 620, 30, {
      isStatic: true,
      render: {fillStyle: "#E6B143"}
    });

    //add walls to world
    Matter.World.add(engine.world, [leftWall, rightWall, topLine, ground]);


    // Render the engine
    const render = Matter.Render.create({
      element: document.getElementById('game-area') || undefined, // Use an element with the ID 'game-area'
      engine: engine,
      options: {
        wireframes: false,
        background: "000000",
        width: 450,
        height: 600,
      }
    });

    Matter.Render.run(render);

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
    
    // chance of bigger fruit spawning, change to correlate to score later
    let fruit_multiplier = 4;
    let currentFruitBody: Matter.Body | null = null;

    // function to allow fruit to sit in the sky
    function spawnFruit(fruit: any) {
      const game_fruit = Matter.Bodies.circle(FruitSpawnX, FruitSpawnHeight, fruit.radius, {
        isSleeping: true, // sit in the sky until click
        collisionFilter: {
          category: 0x0001,
          mask: 0x0001,
        },
        render: {
          sprite: {
            xScale: 0.5,
            yScale: 0.5,
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
      currentFruitBody = game_fruit;
      
    }

    // spawn the initial fruit
    spawnFruit(Cherries);

    function mergeFruit(x:number, y: number, fruit_index: number) {

      // import image
      const fruit = Fruit_Data[fruit_index];
      // console.log(fruit);

      const game_fruit = Matter.Bodies.circle(x, y, fruit.radius, {
        // density: 0.0005,
        // frictionAir: 0.06,
        // restitution: 0.3,
        // friction: 0.01,
        // index = fruit.index,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0001,
        },
        render: {
          sprite: {
            xScale: 0.5,
            yScale: 0.5,
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
    }

    // click to add fruit
    const mouse = Matter.Mouse.create(render.canvas);

    // Create a mouse constraint
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      collisionFilter: {
        category: 0x0002,
      },
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
    let isClickAllowed = true;

    Matter.Events.on(mouseConstraint, 'mousedown', async (event) => {
      // Check if the mouse action is allowed
      if (!isClickAllowed) return;
      
      // Handle mouse click event here
      console.log('Mouse clicked at:', event.mouse.position);
      
      //  addFruit(event.mouse.position.x, FruitSpawnHeight, -1);
      if (currentFruitBody) {
        currentFruitBody.isSleeping = false;
        Matter.Body.setPosition(currentFruitBody, {x: event.mouse.position.x, y: FruitSpawnHeight});
      }

      let fruitIndex = Math.floor(Math.random() * fruit_multiplier)

      // import image
      const fruit = Fruit_Data[fruitIndex];
      
      // Disallow the mouse action and re-allow it after 1 second
      isClickAllowed = false;
      setTimeout(() => {
          isClickAllowed = true;
          spawnFruit(fruit);

      }, 1000);
    });

    // collisions
    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((collision) => {

        // remove from world if watermelon
        if (collision.bodyA.circleRadius == collision.bodyB.circleRadius && collision.bodyA.circleRadius == WatermelonRadius) {
          Matter.World.remove(engine.world, [collision.bodyA, collision.bodyB]);
        }

        // end game if collision with the top sensor
        if (collision.bodyA.isSensor || collision.bodyB.isSensor) {
          alert("Game over!!!!");

          Matter.World.clear(engine.world, true);
          Matter.Engine.clear(engine);

          updateLeaderboard(finalScore);

        }

        if (collision.bodyA.circleRadius == collision.bodyB.circleRadius) {
          
          let index = 1;

          // going to use a dictionary for now to map radius to fruit, probably a better way, but unsure for now
          // console.log(collision.bodyA.circleRadius);
          for (let i = 0; i < Fruit_Data.length; i ++) {
            if (collision.bodyA.circleRadius == Fruit_Data[i].radius) {
              index = i;
            }
          }

          Matter.World.remove(engine.world, [collision.bodyA, collision.bodyB]);
          let newFruitIndex = index + 1;
          
          setCurrentScore((prevScore) => prevScore + Fruit_Data[index].points);

          finalScore += Fruit_Data[index].points;

          if (finalScore >= 4) {
            fruit_multiplier = 3;
          }
          if (finalScore >= 12) {
            fruit_multiplier = 5;
          }

          // console.log(finalScore);
          // console.log(collision.bodyA.position.x);

          mergeFruit(collision.bodyA.position.x, collision.bodyA.position.y, newFruitIndex);
        }

      })
    })

    // Start the physics engine
    Matter.Runner.run(runner, engine);

    // Clean up on component unmount
    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, true);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div id="game-container">
      {/* The game area canvas */}
      <div id="game-area" />


      {/* Use the Score component without causing rerenders */}
      <Score score={currentScore} />
    </div>
  );
};


export default GameArea;
