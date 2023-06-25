import { Request, Response } from 'express';
import { AuthenticationService, Game24Service, PlaceService } from '../services';
import snackcaseKeys from 'snakecase-keys';
import { JwtService } from '../../utils';
export class JenosizeController {
  private readonly placeService: PlaceService = new PlaceService();
  private readonly game24Service: Game24Service = new Game24Service();
  private readonly authService: AuthenticationService = new AuthenticationService();

  constructor() {
    this.loginWithProvider = this.loginWithProvider.bind(this);
    this.getPlace = this.getPlace.bind(this);
    this.getGame24 = this.getGame24.bind(this);
  }
  async loginWithProvider(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const account = await this.authService.loginWithProvider(req.body);
      const accessToken = JwtService.generateToken({ id: account.id });
      return res.json(
        snackcaseKeys({ statusCode: 200, message: '', results: { accessToken } }, { deep: true }),
      );
    } catch (error) {
      return res
        .status(400)
        .json(snackcaseKeys({ statusCode: 400, message: `${error}` }, { deep: true }));
    }
  }

  async getPlace(req: Request, res: Response): Promise<Response> {
    const { search } = req.query;
    const places = await this.placeService.getPlaces({ search: search as string });
    return res
      .status(200)
      .json(snackcaseKeys({ statusCode: 200, message: '', results: places }, { deep: true }));
  }
  async getGame24(req: Request, res: Response): Promise<Response> {
    const { nums } = req.body;

    if (nums.every((num: number) => num > 0)) {
      const game24 = await this.game24Service.find24(nums);

      return res.json(
        snackcaseKeys(
          { statusCode: 200, message: '', results: game24 ? 'YES' : 'NO' },
          { deep: true },
        ),
      );
    }

    return res
      .status(400)
      .json(
        snackcaseKeys(
          { statusCode: 400, message: 'Array values must be more than 0' },
          { deep: true },
        ),
      );
  }
}
