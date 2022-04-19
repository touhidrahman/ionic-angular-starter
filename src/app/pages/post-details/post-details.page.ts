import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '@features/posts/services/post.service'
import { Post, PostComment, PostWithComment } from '@features/posts/types/post'

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.page.html',
    styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
    post: PostWithComment | null = null

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {}

    async ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id ?? ''

        const post = await this.postService.getPost(id)
        console.log('TCL: | ngOnInit | post', post)
        this.post = post as unknown as PostWithComment
    }
}
