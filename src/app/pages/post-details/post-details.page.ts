import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '@features/posts/services/post.service'
import { Post } from '@features/posts/types/post'

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.page.html',
    styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
    post: Post | null = null

    constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id ?? ''

        this.postService.getPost(id).then((post) => {
            console.log(post)
            this.post = post as unknown as Post
        })
    }
}
