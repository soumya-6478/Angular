import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  errorMsg = null;
  private subscription: Subscription;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
    this.subscription = this.postService.errorSub.subscribe((error) => {
      this.errorMsg = error;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.CreatePost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
    // console.log(this.loadedPosts);
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe((response) => {
      this.loadedPosts = [];
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPost().subscribe(
      (data) => {
        this.isFetching = false;
        this.loadedPosts = data;
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
        this.isFetching = false;
        this.errorMsg = error.message;
      }
    );
  }
  onHandleError() {
    this.errorMsg = null;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
