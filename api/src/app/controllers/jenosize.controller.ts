import { Request, Response } from 'express';
import { AuthenticationService, Game24Service, PlaceService } from '../services';
import { JwtService } from '../../utils';
export class JenosizeController {
  private readonly placeService: PlaceService = new PlaceService();
  private readonly game24Service: Game24Service = new Game24Service();
  private readonly authService: AuthenticationService = new AuthenticationService();

  constructor() {
    this.loginWithProvider = this.loginWithProvider.bind(this);
    this.getPlace = this.getPlace.bind(this);
    this.getPlaceMedia = this.getPlaceMedia.bind(this);
    this.getGame24 = this.getGame24.bind(this);
  }
  async loginWithProvider(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const account = await this.authService.loginWithProvider(req.body);
      const accessToken = JwtService.generateToken({ id: account.id });
      return res.json({ statusCode: 200, message: '', results: { accessToken } });
    } catch (error) {
      return res.status(400).json({ statusCode: 400, message: `${error}` });
    }
  }

  async getPlace(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;
    const places = await this.placeService.getPlaces({ search: search as string });
    return res.status(200).json({ statusCode: 200, message: '', results: places });
  }

  async getPlaceMedia(req: Request, res: Response): Promise<Response> {
    const { refId } = req.query;
    const media = await this.placeService.getPlaceMedia(refId as string);

    if (media) return res.header(media.headers).send(media.data);
    return res.send();
  }

  async getGame24(req: Request, res: Response): Promise<Response> {
    const { nums } = req.body;

    if (nums.every((num: number) => num > 0)) {
      const game24 = await this.game24Service.find24(nums);

      return res.json({ statusCode: 200, message: '', results: game24 ? 'YES' : 'NO' });
    }

    return res.status(400).json({ statusCode: 400, message: 'Array values must be more than 0' });
  }
}
