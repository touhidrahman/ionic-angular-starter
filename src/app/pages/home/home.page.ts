import { Component, OnInit } from '@angular/core'
import { PostService } from '@features/posts/services/post.service'
import { Post } from '@features/posts/types/post'

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    created: any | null = null

    constructor(private postService: PostService) {}

    async ngOnInit() {
        const posts = await this.postService.getPosts()
        console.log('TCL: ~ posts ', posts?.documents)
    }

    async write() {
        const post: Post = {
            country: 'Germany',
            state: 'Hesse',
            institute: 'Hochschule für Technik und Wirtschaft',
            level: 'Masters',
            program: 'Global Software Engineering',
            year: 2020,
            stem: true,
            course: 'Software Engineering Principles',
            semester: 'Fall',
            type: 'Article',
            title: '<h1>How to pass software engineering principles</h1>',
            text: '<h1>How to pass software engineering principles</h1>',
            tags: ['software engineering', 'principles'],
        }
        const created = await this.postService.createPost(post)
        this.created = created
    }
}
