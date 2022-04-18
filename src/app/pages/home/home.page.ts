import { Component, OnInit, ViewChild } from '@angular/core'
import { PostService } from '@features/posts/services/post.service'
import { Post } from '@features/posts/types/post'
import { IonInfiniteScroll } from '@ionic/angular'

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll

    created: any | null = null
    posts: Post[] = []
    i = 2

    constructor(private postService: PostService) {}

    async ngOnInit() {
        const posts = await this.postService.getPosts([], 10)
        this.posts = posts?.documents as unknown as Post[]
    }

    async write() {
        const post: Post = {
            country: 'Germany',
            state: 'Hesse',
            institute: `Hochschule Fulda ${this.i++}`,
            level: 'Masters',
            program: 'Global Software Development',
            year: 2020,
            stem: true,
            course: 'Software Engineering',
            semester: 'Fall',
            type: 'Article',
            title: '<h1>How to pass software engineering principles</h1>',
            text: '<h1>How to pass software engineering principles</h1>',
            tags: ['software engineering', 'principles'],
        }
        const created = await this.postService.createPost(post)
        this.created = created
    }

    async loadPosts(e: any) {
        const posts = await this.postService.getPosts([], 10, this.posts.length)
        this.posts = [...this.posts, ...(posts?.documents as unknown as Post[])]
        e.target.complete()

        if (this.posts.length >= 300) {
            e.target.disabled = true
        }
    }
}
