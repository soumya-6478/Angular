import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient) {}
  errorSub = new Subject();

  CreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        "https://http-b3130-default-rtdb.firebaseio.com/post.json",
        postData,
        { observe: "response" } // default is body
      )
      .subscribe(
        (data) => console.log(data), // but this is a key value pair only if we will not use { observe: "response" }
        (error) => {
          console.log(error); //this is a HttpErrorResponse
          this.errorSub.next(error.message);
        }
      );
    // console.log(postData);
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");
    return this.http
      .get<{ [key: string]: Post }>(
        "https://http-b3130-default-rtdb.firebaseio.com/post.json",
        {
          headers: new HttpHeaders({ "custom-Headers": "Hello" }),
          // params: new HttpParams().set("print", "pretty")
          params: searchParams,
          responseType: "json", // default, other values are 'text', 'blob'
        }
      )
      .pipe(
        map((responseData) => {
          // console.log(responseData);
          const postarray: Post[] = [];
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // it will check whether key is a own property of responseData, it will not search the property of some prototype
              postarray.push({ ...responseData[key], id: key }); // no ["key"]
            }
          }
          return postarray;
        }),
        catchError((errorResponse) => {
          // send to analytic server
          return throwError(errorResponse);
        }) // throwError is a function who takes the errorResponse and returns a observable
      );
  }

  clearPosts() {
    return this.http
      .delete("https://http-b3130-default-rtdb.firebaseio.com/post.json", {
        observe: "events",
        responseType: "text",
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) console.log("request sent"); // we cant access the body here bcoz there is no Response here
          if (event.type === HttpEventType.Response) console.log(event.body);
        })
      );
  }
}
