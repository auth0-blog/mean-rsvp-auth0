import { TestBed, inject } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import {HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';

import { ENV } from './env.config';
import { ApiService } from './api.service';
import { AuthService } from './../auth/auth.service';
import { EventModel } from './models/event.model';

describe('TestService', () => {

  let service : ApiService;
  let httpmock :HttpTestingController;

  // setup service
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers: [ApiService,AuthService]
    });

    service = TestBed.get(ApiService);
    httpmock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpmock.verify();
  })

  it('it should get data from Event api',() => {
     const dummyPostData : EventModel[] = [
                              {
                              title:"test1",
                              location:"test1",
                              startDatetime:new Date(),
                              endDatetime:new Date(),
                              userId:"1",
                              username:"user1",
                              viewPublic:true
                              },
                              {
                              title:"test2",
                              location:"test2",
                              startDatetime:new Date(),
                              endDatetime:new Date(),
                              userId:"2",
                              username:"user2",
                              viewPublic:true
                              },
                            ];

      service.getEvents$().subscribe(posts =>{
         expect(posts.length).toBe(2);
         expect(posts).toEqual(dummyPostData);
      })

      const request = httpmock.expectOne(`${ENV.BASE_API}events`);

      expect(request.request.method).toBe('GET');

      request.flush(dummyPostData);
  });


  it('it should get data from userList api',() => {
     const dummyPostData : EventModel[] = [
                              {
                              title:"test1",
                              location:"test1",
                              startDatetime:new Date(),
                              endDatetime:new Date(),
                              userId:"1",
                              username:"user1",
                              viewPublic:true
                              },
                              {
                              title:"test2",
                              location:"test2",
                              startDatetime:new Date(),
                              endDatetime:new Date(),
                              userId:"2",
                              username:"user2",
                              viewPublic:true
                              },
                            ];

      service.getUserList$().subscribe(posts =>{
         expect(posts.length).toBe(2);
         expect(posts).toEqual(dummyPostData);
      })

      const request = httpmock.expectOne(`${ENV.BASE_API}userlist`);

      expect(request.request.method).toBe('GET');

      request.flush(dummyPostData);
  });
  
});
