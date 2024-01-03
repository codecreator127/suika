'use client'
// components/MatterComponent.js
import React, { useEffect } from 'react';
import Matter from 'matter-js';

const GameArea = () => {
  useEffect(() => {
    console.log('rendered');
    // initial set up
    const engine = Matter.Engine.create();

    const circle = Matter.Bodies.circle(400, 20, 20);
    const circle2 = Matter.Bodies.circle(400, 20, 20);
    const circle3 = Matter.Bodies.circle(400, 20, 20);

    
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

    //add things to world
    Matter.World.add(engine.world, [circle, circle2, circle3, leftWall, rightWall, topLine, ground]);

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

    function addFruit() {
      const fruitIndex = Math.floor(Math.random() * 11)


    }

    // Start the engine
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
