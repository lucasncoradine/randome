import React from "react"
import Particles from "react-tsparticles"
import { ConfettiConfig } from "./config"

export const Confetti: React.FC = () => {
  return <Particles id="confetti_particles" options={ConfettiConfig} />
}
