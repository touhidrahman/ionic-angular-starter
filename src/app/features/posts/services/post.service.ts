import { Injectable } from '@angular/core'
import { AppwriteService } from '@core/appwrite/appwrite.service'
import { environment } from '@environment/environment'
import { Models, Query } from 'appwrite'
import * as dayjs from 'dayjs'
import { Post, PostComment } from '../types/post'

@Injectable({
    providedIn: 'root',
})
export class PostService {
    private postsCollectionId = environment.appwrite.collectionIds.posts
    private commentsCollectionId = environment.appwrite.collectionIds.comments

    constructor(private appwrite: AppwriteService) {}

    async getPost(id: string): Promise<Post & { comments: PostComment[] }> {
        const doc = await this.appwrite.sdk?.database.getDocument(this.postsCollectionId, id)
        const queries = []
        if (doc) {
            queries.push(Query.equal('linkedCollectionId', doc.$collection))
            queries.push(Query.equal('linkedDocumentId', doc.$id))
        }
        const commentsList = await this.appwrite.sdk?.database.listDocuments<PostComment>(
            this.commentsCollectionId,
            queries,
            100,
            0,
        )
        const comments = commentsList?.documents ?? []
        return { ...(doc as Post), comments }
    }

    async createComment(comment: string, post: Post): Promise<PostComment | undefined> {
        const user = await this.appwrite.sdk?.account.get()
        if (!user) return

        const data: Partial<PostComment> = {
            linkedCollectionId: post.$collection,
            linkedDocumentId: post.$id,
            text: comment,
            createdAt: Date.now(),
            createdBy: user?.$id,
            createdByName: user?.name,
        }
        return this.appwrite.sdk?.database.createDocument(
            this.commentsCollectionId,
            'unique()',
            data,
        ) as Promise<PostComment>
    }

    async getPosts(queries: string[] = [], limit = 24, offset = 0): Promise<Models.DocumentList<Post> | undefined> {
        return this.appwrite.sdk?.database.listDocuments<Post>(
            this.postsCollectionId,
            queries,
            limit,
            offset,
            undefined,
            undefined,
            ['createdAt'],
            ['DESC'],
        )
    }

    async createPost(post: Post) {
        const user = await this.appwrite.sdk?.account.get()
        const data = {
            ...post,
            createdAt: Date.now(),
            createdBy: user?.$id,
        }
        return this.appwrite.sdk?.database.createDocument(this.postsCollectionId, 'unique()', data, ['role:all'])
    }
}
