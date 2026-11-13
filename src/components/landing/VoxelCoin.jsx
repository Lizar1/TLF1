import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// Canvas art needs raw channel values, so the coin keeps its own gold ramp (light to dark).
const GOLD_RAMP = [
  [255, 232, 128],
  [252, 206, 76],
  [236, 172, 44],
  [202, 134, 28],
]

const RADIUS = 12
const FIELD_DEPTH = 2
const RAISED_DEPTH = 3
const SCENE_RADIUS = 20
const CAMERA_DISTANCE = 80
const PITCH = -0.2
const ROLL = 0.16
const SWAY_SPEED = 0.7
const SWAY_ANGLE = 0.42
const SCROLL_SPIN = 0.0035
const RESTING_YAW = -0.5
const DIMMED_OPACITY = 0.3

const SYMBOL = [
  "...#...",
  ".#####.",
  "##.#.##",
  "##.#...",
  ".####..",
  "..###..",
  "..####.",
  "...#.##",
  "##.#.##",
  ".#####.",
  "...#...",
]

const FLECKS = [
  [-18, 9, 3],
  [-17, -8, -6],
  [17, 11, -4],
  [18, -7, 5],
  [-15, 15, -8],
  [14, -15, 8],
  [3, 18, 7],
  [-5, -18, -7],
]

const DIRECTIONS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
]

const LIGHT = [-0.38, 0.55, 0.74]

function isSymbolPixel(x, y, mirrored) {
  const column = (mirrored ? -x : x) + 3
  const row = 5 - y
  return SYMBOL[row]?.[column] === "#"
}

function pickTone(x, y, z, kind) {
  const noise = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
  const grain = noise - Math.floor(noise)
  if (kind === "bright") return grain > 0.7 ? 1 : 0
  if (kind === "fleck") return 0
  return grain > 0.82 ? 3 : 2
}

function buildFaces() {
  const voxels = new Map()
  const add = (x, y, z, kind) => voxels.set(`${x},${y},${z}`, { x, y, z, kind })

  for (let x = -RADIUS; x <= RADIUS; x++) {
    for (let y = -RADIUS; y <= RADIUS; y++) {
      const distance = Math.hypot(x, y)
      if (distance > RADIUS + 0.3) continue

      const isRim = distance >= RADIUS - 1.4
      for (let z = -FIELD_DEPTH; z <= FIELD_DEPTH; z++) add(x, y, z, isRim ? "bright" : "field")

      if (isRim || isSymbolPixel(x, y, false)) add(x, y, RAISED_DEPTH, "bright")
      if (isRim || isSymbolPixel(x, y, true)) add(x, y, -RAISED_DEPTH, "bright")
    }
  }

  for (const [fx, fy, fz] of FLECKS) {
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let z = 0; z < 2; z++) add(fx + x, fy + y, fz + z, "fleck")
      }
    }
  }

  const faces = []
  for (const { x, y, z, kind } of voxels.values()) {
    DIRECTIONS.forEach(([nx, ny, nz], direction) => {
      if (voxels.has(`${x + nx},${y + ny},${z + nz}`)) return

      const axisA = nx !== 0 ? [0, 1, 0] : [1, 0, 0]
      const axisB = nz !== 0 ? [0, 1, 0] : [0, 0, 1]
      const center = [x + nx / 2, y + ny / 2, z + nz / 2]
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([a, b]) =>
        center.map((value, axis) => value + (a * axisA[axis]) / 2 + (b * axisB[axis]) / 2)
      )

      faces.push({ center, corners, direction, tone: pickTone(x, y, z, kind) })
    })
  }
  return faces
}

function createRotation(yaw) {
  const [cy, sy] = [Math.cos(yaw), Math.sin(yaw)]
  const [cp, sp] = [Math.cos(PITCH), Math.sin(PITCH)]
  const [cr, sr] = [Math.cos(ROLL), Math.sin(ROLL)]

  return ([x, y, z]) => {
    const x1 = x * cy + z * sy
    const z1 = -x * sy + z * cy
    const y2 = y * cp - z1 * sp
    const z2 = y * sp + z1 * cp
    return [x1 * cr - y2 * sr, x1 * sr + y2 * cr, z2]
  }
}

function createPalette(rotate) {
  return DIRECTIONS.map((normal) => {
    const [nx, ny, nz] = rotate(normal)
    const light = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2])
    const brightness = 0.42 + 0.68 * light

    return GOLD_RAMP.map((tone) => {
      const shade = (factor) =>
        tone.map((channel) => Math.min(255, Math.round(channel * brightness * factor))).join(",")
      return { fill: `rgb(${shade(1)})`, edge: `rgb(${shade(0.82)})` }
    })
  })
}

function startCoin(canvas, { reducedMotion, dimOnScroll }) {
  const context = canvas.getContext("2d")
  const faces = buildFaces()
  let size = 0
  let frame = 0

  const draw = (yaw) => {
    if (!size) return
    const rotate = createRotation(yaw)
    const palette = createPalette(rotate)
    const scale = size / 2 / (SCENE_RADIUS * 1.18)
    const middle = size / 2

    const visible = []
    for (const face of faces) {
      const [cx, cy, cz] = rotate(face.center)
      const [nx, ny, nz] = rotate(DIRECTIONS[face.direction])
      if (nx * cx + ny * cy + nz * (cz - CAMERA_DISTANCE) >= 0) continue
      visible.push({ face, depth: cz })
    }
    visible.sort((a, b) => a.depth - b.depth)

    context.clearRect(0, 0, size, size)
    context.lineWidth = Math.max(0.6, size / 900)
    context.lineJoin = "round"

    for (const { face } of visible) {
      context.beginPath()
      face.corners.forEach((corner, index) => {
        const [x, y, z] = rotate(corner)
        const perspective = CAMERA_DISTANCE / (CAMERA_DISTANCE - z)
        const px = middle + x * scale * perspective
        const py = middle - y * scale * perspective
        if (index === 0) context.moveTo(px, py)
        else context.lineTo(px, py)
      })
      context.closePath()
      const colors = palette[face.direction][face.tone]
      context.fillStyle = colors.fill
      context.strokeStyle = colors.edge
      context.fill()
      context.stroke()
    }
  }

  const currentYaw = (time) =>
    RESTING_YAW + Math.sin(time * 0.001 * SWAY_SPEED) * SWAY_ANGLE + window.scrollY * SCROLL_SPIN

  const applyDim = () => {
    const progress = Math.min(window.scrollY / (window.innerHeight * 0.7), 1)
    canvas.style.opacity = String(1 - progress * (1 - DIMMED_OPACITY))
  }

  const resize = () => {
    const { width } = canvas.getBoundingClientRect()
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    size = width
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(width * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    if (reducedMotion) draw(RESTING_YAW)
  }

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()

  if (dimOnScroll) {
    applyDim()
    window.addEventListener("scroll", applyDim, { passive: true })
  }

  if (!reducedMotion) {
    const loop = (time) => {
      draw(currentYaw(time))
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
  }

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    window.removeEventListener("scroll", applyDim)
  }
}

export default function VoxelCoin({ className, dimOnScroll = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    return startCoin(canvasRef.current, { reducedMotion, dimOnScroll })
  }, [dimOnScroll])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("aspect-square w-full", className)} />
}
