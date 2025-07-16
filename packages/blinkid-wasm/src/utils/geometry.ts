/**
 * Copyright (c) 2025 Microblink Ltd. All rights reserved.
 */

/** Represents a 2D point. */
export type Point = {
  /** X-coordinate of the point. */
  x: number;
  /** Y-coordinate of the point. */
  y: number;
};

/** Represents a quadrilateral shape with signed integer coordinates. */
export type Quadrilateral = {
  /** Upper left point of the quadrilateral. */
  upperLeft: Point;

  /** Upper right point of the quadrilateral. */
  upperRight: Point;

  /** Lower right point of the quadrilateral. */
  lowerRight: Point;

  /** Lower left point of the quadrilateral. */
  lowerLeft: Point;
};

/** Represents a rectangle. */
export type Rectangle = {
  /** X coordinate of the top-left corner of the rectangle. */
  x: number;
  /** Y coordinate of the top-left corner of the rectangle. */
  y: number;
  /** Width of the rectangle. */
  width: number;
  /** Height of the rectangle. */
  height: number;
};
