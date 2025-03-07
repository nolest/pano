import { ReactP5Wrapper } from "@p5-wrapper/react";
import { P5CanvasInstance } from "@p5-wrapper/react";
//import { Geometry } from "p5";
import { useEffect, useState } from "react";

function sketch(p5: P5CanvasInstance, width: number, height: number) {
  p5.preload = () => {
    //astronaut = p5.loadModel('./astronaut.obj', true);
  }

  p5.setup = () => {
    p5.createCanvas(width, height, p5.WEBGL);
  };

  p5.draw = () => {
    p5.background(0);
    
    p5.directionalLight(255, 255, 255, 0, -1, 0);
    p5.pointLight(255, 255, 255, 0, 0, 200);

    p5.normalMaterial();
    p5.push();
    p5.translate(0, 0, 0);
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.push();
    p5.translate(-75, 100, 0);
  
    // Show black stroke to help visualize movement
    p5.stroke(0);
    p5.sphere(100);
    p5.pop();
  };
}

export const Visual = () => {
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(document.body.clientWidth - 40);
      setCanvasHeight(document.body.clientHeight/1.5);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化宽度

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ReactP5Wrapper sketch={(p5) => sketch(p5, canvasWidth, canvasHeight)} />
      <div className="visual__title">
        <h4 style={{ padding: '1rem 2rem' }}>{`P5.js with React18 (React 19 not supported)`}</h4>
      </div>
    </>
  )
};

export default Visual;