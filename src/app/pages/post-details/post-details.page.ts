import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { PostService } from '@features/posts/services/post.service'
import { Post, PostWithComment } from '@features/posts/types/post'
import { ToastController } from '@ionic/angular'

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.page.html',
    styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
    post: PostWithComment | null = null
    userComment: FormControl = new FormControl('')

    constructor(
        private postService: PostService,
        private toast: ToastController,
        private activatedRoute: ActivatedRoute,
    ) {}

    async ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id ?? ''

        const post = await this.postService.getPost(id)
        this.post = post as unknown as PostWithComment
    }

    async submitComment() {
        const comment = this.userComment.value
        if (!comment) {
            return
        }

        const saved = await this.postService.createComment(comment, this.post as Post)
        this.userComment.setValue('')
        this.presentCommentSavedToast()
        if (this.post?.comments && saved) {
            this.post.comments = [saved, ...this.post.comments]
        }
    }

    private async presentCommentSavedToast() {
        const toast = await this.toast.create({
            message: 'Your comment has been saved.',
            duration: 2000,
        })
        toast.present()
    }
}
