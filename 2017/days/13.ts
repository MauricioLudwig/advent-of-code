import { getAsArray } from '../input';
import { success, end } from '../utils/logger';

interface Layer {
  range: number;
  camera: number;
  forward: boolean;
}

interface Motion {
  cycle: number;
  depth: number;
}

export default (): void => {
  const input: Record<string, Layer> = getAsArray('13.txt').reduce(
    (acc, curr) => {
      const [depth, range] = curr.split(': ');
      return {
        ...acc,
        [depth]: {
          range: parseInt(range),
          camera: 0,
          forward: true,
        },
      };
    },
    {}
  );

  const max = Math.max(...Object.keys(input).map(Number));
  let severity = 0;

  for (let i = 0; i <= max; i++) {
    const lane = input[i];

    if (!lane) {
      moveSecurityCameras(input);
      continue;
    }

    const { camera, range } = lane;

    if (camera === 0) {
      severity += i * range;
    }

    moveSecurityCameras(input);
  }

  success(`Part 1: ${severity}`);

  const cameraMotions = Object.entries(input).map(
    ([key, value]): Motion => {
      return {
        cycle: (value.range - 1) * 2,
        depth: parseInt(key),
      };
    }
  );

  let caught = true;
  let delay = 0;

  while (caught) {
    delay++;
    caught = cameraMotions.some((c) => (delay + c.depth) % c.cycle === 0);
  }

  success(`Part 2: ${delay}`);

  end();
};

const moveSecurityCameras = (layers: Record<string, Layer>) => {
  Object.keys(layers).forEach((o): void => {
    const { range, forward } = layers[o];
    layers[o].camera += forward ? 1 : -1;

    if (layers[o].camera === range - 1) {
      layers[o].forward = false;
    } else if (layers[o].camera === 0) {
      layers[o].forward = true;
    } else {
      return;
    }
  });
};
