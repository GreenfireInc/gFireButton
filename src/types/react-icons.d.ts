import { ComponentType, SVGAttributes } from 'react'

declare module 'react-icons/fa' {
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number
    color?: string
    title?: string
  }

  export type IconType = ComponentType<IconBaseProps>

  export const FaGithub: IconType
  export const FaTwitter: IconType
  export const FaEnvelope: IconType
  export const FaBell: IconType
  export const FaMoon: IconType
  export const FaSun: IconType
  export const FaChevronDown: IconType
}

declare module 'react-icons' {
  export interface IconBaseProps extends SVGAttributes<SVGElement> {
    size?: string | number
    color?: string
    title?: string
  }

  export type IconType = ComponentType<IconBaseProps>
} 