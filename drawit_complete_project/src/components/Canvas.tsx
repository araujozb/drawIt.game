import React, { forwardRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas = forwardRef<any>((_, ref) => (
  <ReactSketchCanvas
    ref={ref}
    width="100%"
    height="400px"
    strokeWidth={4}
    strokeColor="black"
    className="border rounded-xl"
  />
));

export default Canvas;
