import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface Coordinate {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  id: number;
  position: Coordinate;
  velocity: Coordinate;
  acceleration: Coordinate;
  manhattanDistance: number;
}

class Swarm {
  particles: Particle[] = [];

  constructor(input: string[]) {
    this.particles = input.map(
      (o, i): Particle => {
        const [p, v, a] = o.split(', ');
        return {
          id: i,
          position: this.parseCoordinates(p),
          velocity: this.parseCoordinates(v),
          acceleration: this.parseCoordinates(a),
          manhattanDistance: this.calcManhattanDistance(
            this.parseCoordinates(p)
          ),
        };
      }
    );
  }

  updateTrajectory() {
    this.particles.forEach((o): void => {
      o.velocity.x += o.acceleration.x;
      o.velocity.y += o.acceleration.y;
      o.velocity.z += o.acceleration.z;

      o.position.x += o.velocity.x;
      o.position.y += o.velocity.y;
      o.position.z += o.velocity.z;

      o.manhattanDistance = this.calcManhattanDistance(o.position);
    });
  }

  assessCollision() {
    const ids = this.particles
      .filter((o, i1): boolean => {
        return this.particles.some((x, i2) => {
          return (
            i1 !== i2 &&
            o.position.x === x.position.x &&
            o.position.y === x.position.y &&
            o.position.z === x.position.z
          );
        });
      })
      .map((o): number => o.id);

    this.particles = this.particles.filter((o): boolean => !ids.includes(o.id));
  }

  private parseCoordinates(text: string): Coordinate {
    const match = text.match(/[apv]=<(-?\d+),(-?\d+),(-?\d+)>/);

    if (!match) {
      throw new Error('No match found');
    }

    const [, x, y, z] = match;

    return {
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      z: parseInt(z, 10),
    };
  }

  private calcManhattanDistance({ x, y, z }: Coordinate) {
    return Math.abs(x) + Math.abs(y) + Math.abs(z);
  }
}

export default (): void => {
  const input = getAsArray('20.txt');

  const swarm1 = new Swarm(input);
  const swarm2 = new Swarm(input);

  for (let i = 0; i < 1000; i++) {
    swarm1.updateTrajectory();
    swarm2.updateTrajectory();
    swarm2.assessCollision();
  }

  const [particle] = swarm1.particles.sort(
    (a, b) => a.manhattanDistance - b.manhattanDistance
  );

  success(`Part 1: ${particle.id}`);
  success(`Part 2: ${swarm2.particles.length}`);
  end();
};
