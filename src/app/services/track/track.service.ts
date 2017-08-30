import {Injectable} from '@angular/core';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {HttpClient} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';

import 'rxjs/add/operator/toPromise';
import {Track} from '../../models/track/track.interface';
import {AppConstants} from '../../app.constants';
import {Playlist} from '../../models/playlist/playlist.interface.model';
import {Tracks} from '../../models/tracks/tracks.interface.model';

@Injectable()
export class TrackService extends RestfulSpotitubeClientService {

  /**
   * Create a new TrackService
   *
   * @param {HttpClient} httpClient
   * @param {LoggingService} loggingService
   */
  constructor(private httpClient: HttpClient,
              loggingService: LoggingService) {

    super(loggingService);
  }

  /**
   * Return a all Tracks for the given playlist.
   *
   * @return {Promise<Track[]>} An array of Tracks.
   */
  public async getTracksForPlaylist(playlist: Playlist): Promise<Tracks> {
    const endpointUrl = this.getTrackEndpoint(playlist);
    const params = this.createtokenParam();

    try {
      const data: Tracks = await this.httpClient.get<Tracks>(endpointUrl, {params: params}).toPromise();
      return data;
    } catch (err) {
      this.handleErrors(err)
      return Promise.reject(err);
    }
  }

  private getTrackEndpoint(playlist: Playlist): string {
    const baseEndpointUrl = this.createEndpointUrl(AppConstants.API_PLAYLISTS);

    const tracksEndpoints = ((baseEndpointUrl.concat('/'))
      .concat(playlist.id.toString()))
      .concat(AppConstants.API_TRACKS);

    return tracksEndpoints;
  }
}