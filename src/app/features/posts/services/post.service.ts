import { Injectable } from '@angular/core'
import { AppwriteService } from '@core/appwrite/appwrite.service'
import { environment } from '@environment/environment'
import { Models } from 'appwrite'
import { Post } from '../types/post'

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private collectionId = environment.collectionIds.posts

    constructor(private appwrite: AppwriteService) {}

    async getPosts(
        queries: string[] = [],
        limit = 24,
        offset = 0,
    ): Promise<Models.DocumentList<Models.Document> | undefined> {
        return this.appwrite.sdk?.database.listDocuments(this.collectionId, queries, limit, offset)
    }

    async createPost(post: Post) {
        const data = {
            ...post,
            $read: ['role:all'],
        }
        return this.appwrite.sdk?.database.createDocument(this.collectionId, 'unique()', data)
    }
}
