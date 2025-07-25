import React from "react";
import { Group, Line } from "react-konva";

interface CanvasGridProps {
  viewport: {
    x: number;
    y: number;
    scale: number;
  };
  canvasSize: {
    width: number;
    height: number;
  };
  gridSize?: number;
  gridColor?: string;
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  viewport,
  canvasSize,
  gridSize = 50,
  gridColor = "#f0f0f0",
}) => {
  const lines = [];

  // Calculate visible area in canvas coordinates
  const startX = Math.floor(-viewport.x / viewport.scale / gridSize) * gridSize;
  const startY = Math.floor(-viewport.y / viewport.scale / gridSize) * gridSize;
  const endX =
    Math.ceil((canvasSize.width - viewport.x) / viewport.scale / gridSize) *
    gridSize;
  const endY =
    Math.ceil((canvasSize.height - viewport.y) / viewport.scale / gridSize) *
    gridSize;

  // Vertical lines
  for (let x = startX; x <= endX; x += gridSize) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, startY, x, endY]}
        stroke={gridColor}
        strokeWidth={1}
      />,
    );
  }

  // Horizontal lines
  for (let y = startY; y <= endY; y += gridSize) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[startX, y, endX, y]}
        stroke={gridColor}
        strokeWidth={1}
      />,
    );
  }

  return <Group>{lines}</Group>;
};
