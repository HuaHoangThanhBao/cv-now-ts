import React from 'react'
import Wave from '../stories/assets/wave-bg.png'
import WaveBottom from '../stories/assets/wave-bottom-bg.png'
import Line from '../stories/assets/line-bg.png'
import LineBottom from '../stories/assets/line-bottom-bg.png'
import HexCircuit from '../stories/assets/hex-circuit-bg.png'
import HexCircuitBottom from '../stories/assets/hex-circuit-bottom-bg.png'
import GraphDot from '../stories/assets/graph-dot-bg.png'
import GraphDotBottom from '../stories/assets/graph-dot-bottom-bg.png'
import Graph from '../stories/assets/graph-bg.png'
import Triangle from '../stories/assets/triangle-bg.png'
import TriangleBottom from '../stories/assets/triangle-bottom-bg.png'
import { ThemeType } from 'src/types/Theme'

interface useThemeProps {
  currentTheme: string
}

export const useTheme = ({ currentTheme }: useThemeProps) => {
  const renderTheme = () => {
    let themeTop = ''
    let themeBottom = ''
    switch (currentTheme) {
      case ThemeType.basic_theme:
      default:
        themeTop = ''
        themeBottom = ''
        break
      case ThemeType.triangle_theme:
        themeTop = Triangle
        themeBottom = TriangleBottom
        break
      case ThemeType.line_theme:
        themeTop = Line
        themeBottom = LineBottom
        break
      case ThemeType.hex_circuit_theme:
        themeTop = HexCircuit
        themeBottom = HexCircuitBottom
        break
      case ThemeType.graph_dot_theme:
        themeTop = GraphDot
        themeBottom = GraphDotBottom
        break
      case ThemeType.graph_theme:
        themeTop = Graph
        break
      case ThemeType.wave_theme:
        themeTop = Wave
        themeBottom = WaveBottom
        break
    }
    return (
      <React.Fragment>
        {themeTop && (
          <div className="panel-theme-container">
            <img src={themeTop} className="panel-theme" alt="" />
          </div>
        )}
        {themeBottom && (
          <div className="panel-theme-container">
            <img src={themeBottom} className="panel-theme" alt="" />
          </div>
        )}
      </React.Fragment>
    )
  }

  return { renderTheme }
}
