import { SafeHtml } from '@angular/platform-browser'
import { Models } from 'appwrite'

export type Post = {
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
    createdAt?: number
    createdBy?: string
} & Models.Document

export type PostComment = {
    linkedCollectionId: string
    linkedDocumentId: string
    text: string
    createdBy: string
    createdByName: string
    createdAt: number
} & Models.Document

export type PostWithComment = Post & { comments: PostComment[] }

export type AppUser = {
    $id: string
    name: string
    registration: number
    status: boolean
    passwordUpdate: number
    email: string
    emailVerification: boolean
}
