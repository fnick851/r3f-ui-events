import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Leva, useControls } from "leva"
import React, { useState } from "react"
import { Mesh } from "three"
import "./App.css"

function Box(props: {
  onClickCallback: Function
  onContextMenuCallBack: Function
  onDoubleClickCallback: Function
  onWheelCallback: Function
  onPointerUpCallback: Function
  onPointerDownCallback: Function
  onPointerOverCallback: Function
  onPointerOutCallback: Function
  onPointerEnterCallback: Function
  onPointerLeaveCallback: Function
  onPointerMoveCallback: Function
  onPointerMissedCallback: Function
  onUpdateCallback: Function
}) {
  const meshRef = React.useRef<Mesh>()
  useFrame(({ clock }) => {
    if (meshRef.current) meshRef.current.rotation.x = clock.getElapsedTime()
  })

  return (
    <mesh
      onClick={(e) => props.onClickCallback()}
      onContextMenu={(e) => props.onContextMenuCallBack()}
      onDoubleClick={(e) => props.onDoubleClickCallback()}
      onWheel={(e) => props.onWheelCallback()}
      onPointerUp={(e) => props.onPointerUpCallback()}
      onPointerDown={(e) => props.onPointerDownCallback()}
      onPointerOver={(e) => props.onPointerOverCallback()}
      onPointerOut={(e) => props.onPointerOutCallback()}
      onPointerEnter={(e) => props.onPointerEnterCallback()}
      onPointerLeave={(e) => props.onPointerLeaveCallback()}
      onPointerMove={(e) => props.onPointerMoveCallback()}
      onPointerMissed={() => props.onPointerMissedCallback()}
      onUpdate={(self) => props.onUpdateCallback()}
      ref={meshRef}
    >
      <boxGeometry />
      <meshPhongMaterial color="#31326f" />
    </mesh>
  )
}

function App() {
  const {
    click_event_enabled,
    context_menu_event_enabled,
    double_click_event_enabled,
    wheel_event_enabled,
    pointer_up_event_enabled,
    pointer_down_event_enabled,
    pointer_enter_event_enabled,
    pointer_leave_event_enabled,
    pointer_missed_event_enabled,
    pointer_move_event_enabled,
    pointer_out_event_enabled,
    pointer_over_event_enabled,
    update_event_enabled_see_console,
  } = useControls({
    click_event_enabled: false,
    context_menu_event_enabled: false,
    double_click_event_enabled: false,
    wheel_event_enabled: false,
    pointer_up_event_enabled: false,
    pointer_down_event_enabled: false,
    pointer_over_event_enabled: false,
    pointer_out_event_enabled: false,
    pointer_enter_event_enabled: false,
    pointer_leave_event_enabled: false,
    pointer_move_event_enabled: false,
    pointer_missed_event_enabled: false,
    update_event_enabled_see_console: false,
  })

  const [eventTexts, setEventTexts] = useState<string[]>([])

  return (
    <div className="canvas-container">
      <div className="interaction-display">
        Events triggered:
        <ol>
          {eventTexts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ol>
      </div>
      <Leva oneLineLabels />
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight />
        <Box
          onClickCallback={() => {
            if (click_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "click"])
            }
          }}
          onContextMenuCallBack={() => {
            if (context_menu_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "context menu"])
            }
          }}
          onDoubleClickCallback={() => {
            if (double_click_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "double click"])
            }
          }}
          onWheelCallback={() => {
            if (wheel_event_enabled) {
              console.log("hey")
              setEventTexts((oldArray) => [...oldArray, "wheel"])
            }
          }}
          onPointerUpCallback={() => {
            if (pointer_up_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer up"])
            }
          }}
          onPointerDownCallback={() => {
            if (pointer_down_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer down"])
            }
          }}
          onPointerOverCallback={() => {
            if (pointer_over_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer over"])
            }
          }}
          onPointerOutCallback={() => {
            if (pointer_out_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer out"])
            }
          }}
          onPointerEnterCallback={() => {
            if (pointer_enter_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer enter"])
            }
          }}
          onPointerLeaveCallback={() => {
            if (pointer_leave_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer leave"])
            }
          }}
          onPointerMoveCallback={() => {
            if (pointer_move_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer move"])
            }
          }}
          onPointerMissedCallback={() => {
            if (pointer_missed_event_enabled) {
              setEventTexts((oldArray) => [...oldArray, "pointer missed"])
            }
          }}
          onUpdateCallback={() => {
            if (update_event_enabled_see_console) {
              console.log("prop changed")
            }
          }}
        />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export { App }
