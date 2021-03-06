import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AppConfig } from '../app.config';

@Injectable()
export class BulletsService {
  private emitterSource: Subject<string> = new Subject();
  emitter = this.emitterSource.asObservable();

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  // ---------------------------------------------------------------------------
  // Creates new bullet
  // Will return either an error message or a success messa
  create(journalID: string, pageID: string, bulletText: string, bulletType: string, bulletStarred: boolean) {
		let data = {content: bulletText, type: bulletType, starred: bulletStarred};
    return this.http.post(this.config.apiURL + '/bullets/add',
			{journalID: journalID, pageID: pageID, data: data}, this.jwt())
        .map((response: Response) => {
            let data = response.json();
            return data;
        });
  }

  // ---------------------------------------------------------------------------
  // Deletes a bullet
  // Returns success message on success, error message on failure
  delete(journalID: string, pageID: string, bulletID: string) {
    return this.http.delete(this.config.apiURL + '/bullets/delete/'+ journalID + "/" + pageID + "/" + bulletID, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }
  //----------------------------------------------------------------------------
  // Updates a bullet object
  // data should be an object where data = {fieldYouWantToUpdate: 'value'}
  // YOU CAN UPDATE MULTIPLE BULLET FIELDS AT ONCE (just add multiple key: value pairs to the data object)
  // Will return either an error message or a success message
  update(journalID: string, pageID: string, bulletID: string, data: any) {
    return this.http.put(this.config.apiURL + '/bullets/' + journalID + "/" + pageID + "/" + bulletID, data, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        return data;
      });
  }

  //----------------------------------------------------------------------------
  // Search through all bullets tied to a userid based off data
  // data should be an object in the format {"name of bullet field": "query value"}
  // any search done on content is a "contains" search. every other search type is an exact match search
  // Will load an array of bullet objects into searchResults local storagae item on success
  search(userid: string, data: any) {
    return this.http.post(this.config.apiURL + '/bullets/search/' + userid, data, this.jwt())
      .map((response: Response) => {
        let data = response.json();
        if (data && data.length > 0) {
          // store array of bullet objects in local storage
          localStorage.setItem('searchResults', JSON.stringify(data));
        } else {
					// clear search results
          localStorage.setItem('searchResults', null);
				}

				// emit update message
				this.emitterSource.next('updateSearchResults');
      });
  }

	//----------------------------------------------------------------------------
  // Creates request header with JWT token - needed so that you can hit protected api routes
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
