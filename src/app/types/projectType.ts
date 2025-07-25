export type ProjectType = {
  name: string
  description: string
  imgUrl?: string
  url?: string
  gitHub?: string
  isFeatured?: boolean
  technologies?: {
    name: string
    img: string
  }[]
  details?: {
    intro?: string
    frontend?: string[]
    backend?: string[]
    images?: string[]
  }
}
