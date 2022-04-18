import { SafeHtml } from '@angular/platform-browser'

export interface Post {
    country: string
    state?: string
    institute?: string
    level?: 'Bachelor' | 'Masters' | 'PhD' | 'High School' | string
    program?: string
    year?: number
    stem?: boolean
    course?: string
    semester?: 'Fall' | 'Winter' | 'Summer' | string
    type: 'Article' | 'Question' | 'Poll' | string
    title: string
    text: SafeHtml
    tags?: string[]
}
