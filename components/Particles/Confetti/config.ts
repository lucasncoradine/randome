import { ISourceOptions } from "tsparticles"

export const ConfettiConfig = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fullScreen: {
    enable: true,
  },
  particles: {
    color: {
      value: ["#3F37C9", "#FF006E", "#E1FF00", "#00FF9E"],
    },
    move: {
      decay: 0.1,
      direction: "top",
      enable: true,
      gravity: {
        enable: true,
        maxSpeed: 200,
      },
      outModes: {
        default: "destroy",
        bottom: "destroy",
        left: "destroy",
        right: "destroy",
        top: "none",
      },
      speed: {
        min: 50,
        max: 150,
      },
    },
    number: {
      value: 0,
    },
    opacity: {
      animaon: {
        speed: 0.3,
        sync: true,
        destroy: "min",
        startValue: "max",
      },
    },
    roll: {
      darken: {
        enable: true,
        value: 25,
      },
      enable: true,
      speed: {
        min: 15,
        max: 25,
      },
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
      direction: "random",
    },
    shape: {
      options: {
        polygon: [
          {
            sides: 5,
          },
          {
            sides: 6,
          },
        ],
      },
      type: ["circle", "square"],
    },
    size: {
      value: 5,
    },
    tilt: {
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
      },
      direction: "random",
      enable: true,
    },
    wobble: {
      distance: 30,
      enable: true,
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  emitters: {
    autoPlay: true,
    life: {
      count: 1,
      duration: 0.5,
    },
    rate: {
      quantity: 10,
      delay: 0.1,
    },
    size: {
      mode: "percent",
      height: 0,
      width: 0,
    },
    position: {
      x: 50,
      y: 100,
    },
  },
} as ISourceOptions
